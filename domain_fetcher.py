"""Discover an active, authorized domain from a head website."""

from __future__ import annotations

from urllib.parse import urljoin, urlparse

from bs4 import BeautifulSoup

from movie_parser import fetch_html


def discover_active_domain(head_url: str, allowed_hosts: set[str] | None = None) -> str:
    """Return a canonical or linked HTTPS domain, falling back to ``head_url``.

    ``allowed_hosts`` is deliberately supported so callers can prevent a head
    page from sending the scraper to an unrelated host.
    """
    fallback = head_url.rstrip("/") + "/"
    try:
        soup = BeautifulSoup(fetch_html(head_url), "html.parser")
    except Exception:
        return fallback

    candidates: list[str] = []
    canonical = soup.find("link", rel="canonical")
    if canonical and canonical.get("href"):
        candidates.append(urljoin(head_url, str(canonical["href"])))
    for link in soup.select("a[href]"):
        candidates.append(urljoin(head_url, str(link.get("href", ""))))

    for candidate in candidates:
        parsed = urlparse(candidate)
        host = parsed.netloc.lower().split(":", 1)[0]
        if parsed.scheme in {"http", "https"} and (not allowed_hosts or host in allowed_hosts):
            return f"{parsed.scheme}://{parsed.netloc}/"
    return fallback