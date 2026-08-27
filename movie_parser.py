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
    "https://new.katmoviehd.top/movie-hindi-dubbed/",
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


def parse_listing(html: str, source_url: str) -> list[MovieItem]:
    """Extract likely media pages from one listing page using generic HTML signals."""
    soup = BeautifulSoup(html, "html.parser")
    items: list[MovieItem] = []
    seen: set[str] = set()
    source_host = urlparse(source_url).netloc.lower()

    for link in soup.select("a[href]"):
        title = _text(link)
        href = urljoin(source_url, str(link.get("href", "")))
        if not title or href in seen or urlparse(href).netloc.lower() != source_host:
            continue
        if not _looks_like_media_page(href, title):
            continue

        card = link.find_parent(["article", "li", "div"])
        image = card.find("img") if card else link.find("img")
        description = _text(card.find("p")) if card else ""
        poster = urljoin(source_url, str(image.get("src", ""))) if image else ""
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


def scrape_source(source_url: str) -> list[dict[str, Any]]:
    try:
        html = fetch_html(source_url)
        return [asdict(item) for item in parse_listing(html, source_url)]
    except requests.RequestException as exc:
        LOGGER.warning("Could not fetch %s: %s", source_url, exc)
    except Exception:
        LOGGER.exception("Could not parse %s", source_url)
    return []