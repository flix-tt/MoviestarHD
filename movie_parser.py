"""Parse publicly available movie/TV metadata from an authorized website."""

from __future__ import annotations

import json
import logging
import re
from dataclasses import asdict, dataclass
from typing import Any, Iterable, cast
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup

LOGGER = logging.getLogger(__name__)
DEFAULT_SOURCES = (
    "https://new.katmoviehd.top/category/hollywood-eng/",
    "https://new.katmoviehd.top/category/tv-shows/",
    "https://new.katmoviehd.top/category/tv-series-dubbed/korean-drama/",
    "https://new.katmoviehd.top/category/anime-dubbed/",
)


@dataclass
class MovieItem:
    title: str
    url: str
    description: str = ""
    poster: str = ""
    year: str = ""
    source: str = ""


def _text(node: Any) -> str:
    return " ".join(node.get_text(" ", strip=True).split()) if node else ""


def _first_meta(soup: BeautifulSoup, *names: str) -> str:
    for name in names:
        node = soup.find("meta", attrs={"name": name}) or soup.find(
            "meta", attrs={"property": name}
        )
        if node and node.get("content"):
            return str(node["content"]).strip()
    return ""


def _image_url(image: Any, page_url: str) -> str:
    """Read normal and lazy-loaded image attributes from a listing card."""
    if not image:
        return ""
    for attribute in ("src", "data-src", "data-lazy-src", "data-original"):
        value = str(image.get(attribute, "")).strip()
        if value:
            return urljoin(page_url, value)
    srcset = str(image.get("srcset", "")).strip()
    if srcset:
        return urljoin(page_url, srcset.split(",")[-1].strip().split(" ")[0])
    return ""


def _json_ld_items(soup: BeautifulSoup) -> Iterable[dict[str, Any]]:
    for script in soup.select('script[type="application/ld+json"]'):
        try:
            data = json.loads(script.string or script.get_text())
        except (TypeError, json.JSONDecodeError):
            continue
        values: list[Any] = list(cast(list[Any], data)) if isinstance(data, list) else [data]
        for value in values:
            if isinstance(value, dict):
                yield value


def _looks_like_media_page(url: str, title: str) -> bool:
    path = urlparse(url).path.lower()
    if not path or path == "/" or urlparse(url).fragment or url.endswith("#"):
        return False
    haystack = f"{path} {title.lower()}"
    return any(
        word in haystack
        for word in (
            "movie",
            "film",
            "series",
            "season",
            "episode",
            "drama",
            "animation",
            "anime",
        )
    )


def discover_category_sources(home_url: str) -> list[str]:
    """Return same-host category feeds linked from the live home page."""
    try:
        soup = BeautifulSoup(fetch_html(home_url), "html.parser")
    except requests.RequestException as exc:
        LOGGER.warning("Could not discover categories from %s: %s", home_url, exc)
        return []

    home_host = urlparse(home_url).netloc.lower()
    sources: list[str] = []
    seen: set[str] = set()
    for link in soup.select('a[href*="/category/"]'):
        candidate = urljoin(home_url, str(link.get("href", ""))).rstrip("/") + "/"
        if urlparse(candidate).netloc.lower() == home_host and candidate not in seen:
            sources.append(candidate)
            seen.add(candidate)
    return sources


def parse_listing(html: str, source_url: str) -> list[MovieItem]:
    """Extract likely media pages from one listing page using generic HTML signals."""
    soup = BeautifulSoup(html, "html.parser")
    items: list[MovieItem] = []
    seen: set[str] = set()
    source_host = urlparse(source_url).netloc.lower()

    post_links = soup.select("h2 a")
    candidate_links = post_links if post_links else soup.select("a[href]")
    for link in candidate_links:
        title = _text(link)
        href = urljoin(source_url, str(link.get("href", "")))
        if not title or href in seen or urlparse(href).netloc.lower() != source_host:
            continue
        if not _looks_like_media_page(href, title):
            continue

        card = link.find_parent(["article", "li"])
        if not card:
            card = link.find_parent("div")
        image = card.find("img") if card else link.find("img")
        description_node = card.select_one(
            ".entry-summary, .post-excerpt, .excerpt, p"
        ) if card else None
        description = _text(description_node)
        poster = _image_url(image, source_url)
        year_match = re.search(r"\b(19|20)\d{2}\b", f"{title} {description}")
        items.append(
            MovieItem(
                title=title,
                url=href,
                description=description,
                poster=poster,
                year=year_match.group(0) if year_match else "",
                source=source_url,
            )
        )
        seen.add(href)
    return items


def find_next_page(html: str, page_url: str) -> str | None:
    """Find a normal pagination link exposed by the listing page."""
    soup = BeautifulSoup(html, "html.parser")
    link = soup.select_one('link[rel="next"], a[rel="next"]')
    if not link:
        link = next(
            (
                candidate
                for candidate in soup.select("a[href]")
                if re.search(r"\b(next|older posts|more posts)\b", _text(candidate), re.I)
            ),
            None,
        )
    if not link or not link.get("href"):
        return None
    return urljoin(page_url, str(link["href"]))


def parse_detail(html: str, page_url: str) -> MovieItem:
    """Extract metadata from a detail page, preferring Schema.org JSON-LD."""
    soup = BeautifulSoup(html, "html.parser")
    data: dict[str, Any] = next(
        (value for value in _json_ld_items(soup) if value.get("@type") in {"Movie", "TVSeries", "VideoObject"}),
        cast(dict[str, Any], {}),
    )
    image: Any = data.get("image", "")
    image_url = (
        str(cast(list[Any], image)[0])
        if isinstance(image, list) and image
        else image if isinstance(image, str) else ""
    )
    title = str(data.get("name") or _first_meta(soup, "og:title", "twitter:title") or _text(soup.find("h1")))
    description = str(data.get("description") or _first_meta(soup, "description", "og:description"))
    year = str(data.get("dateCreated") or data.get("datePublished") or "")[:4]
    return MovieItem(
        title=title,
        url=page_url,
        description=description,
        poster=urljoin(page_url, image_url or _first_meta(soup, "og:image")),
        year=year,
        source=page_url,
    )


def fetch_html(url: str, session: requests.Session | None = None, timeout: int = 20) -> str:
    """Fetch HTML with a descriptive user agent and normal HTTP error handling."""
    client = session or requests.Session()
    response = client.get(
        url,
        timeout=timeout,
        headers={"User-Agent": "MoviesFlixMetadataBot/1.0 (+authorized use)"},
    )
    response.raise_for_status()
    return response.text


def scrape_source(source_url: str, max_pages: int = 1) -> list[dict[str, Any]]:
    """Scrape a listing and its ordinary next-page links up to ``max_pages``."""
    results: list[dict[str, Any]] = []
    visited: set[str] = set()
    current_url = source_url
    try:
        for _ in range(max(max_pages, 1)):
            if current_url in visited:
                break
            visited.add(current_url)
            html = fetch_html(current_url)
            results.extend(asdict(item) for item in parse_listing(html, current_url))
            next_url = find_next_page(html, current_url)
            if not next_url:
                break
            current_url = next_url
        return results
    except requests.RequestException as exc:
        LOGGER.warning("Could not fetch %s: %s", source_url, exc)
    except Exception:
        LOGGER.exception("Could not parse %s", source_url)
    return []