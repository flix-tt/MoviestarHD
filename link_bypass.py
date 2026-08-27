"""Inspect ordinary redirects and explicit links without bypassing protections.

This module does not defeat countdowns, pop-ups, CAPTCHA, paywalls, DRM, or
other access controls. Use it only with pages and links you are authorized to
inspect.
"""

from __future__ import annotations

import logging
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

LOGGER = logging.getLogger(__name__)
MEDIA_EXTENSIONS = (".mp4", ".mkv", ".webm", ".mov", ".avi", ".m3u8")


def resolve_redirects(url: str, timeout: int = 20) -> str:
    """Return the final URL from normal server-side redirects."""
    response = requests.get(
        url,
        allow_redirects=True,
        timeout=timeout,
        stream=True,
        headers={"User-Agent": "MoviesFlixMetadataBot/1.0 (+authorized use)"},
    )
    try:
        response.raise_for_status()
        return response.url
    finally:
        response.close()


def find_explicit_media_links(html: str, page_url: str) -> list[str]:
    """Return media URLs visibly present in the supplied HTML."""
    soup = BeautifulSoup(html, "html.parser")
    links: list[str] = []
    for node in soup.select("a[href], source[src], video[src]"):
        raw_url = node.get("href") or node.get("src")
        if not raw_url:
            continue
        absolute_url = urljoin(page_url, str(raw_url))
        if absolute_url.lower().split("?", 1)[0].endswith(MEDIA_EXTENSIONS):
            links.append(absolute_url)
    return list(dict.fromkeys(links))