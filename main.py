"""Command-line entry point for the authorized metadata scraper."""

from __future__ import annotations

import argparse
import json
import logging
from contextlib import closing
from typing import Any
from urllib.parse import urlparse

from database import connect, save_movies
from domain_fetcher import discover_active_domain
from movie_parser import DEFAULT_SOURCES, scrape_source


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Collect publicly available media metadata.")
    parser.add_argument("--head-url", default="", help="Authorized head URL used to discover the active domain.")
    parser.add_argument("--url", action="append", dest="urls", help="Authorized listing URL; repeat for multiple URLs.")
    parser.add_argument("--archive-template", help="Listing template containing {year} and {page} placeholders.")
    parser.add_argument("--year-start", type=int, default=2001)
    parser.add_argument("--year-end", type=int, default=2026)
    parser.add_argument("--pages", type=int, default=3, help="Maximum listing pages per category/source.")
    parser.add_argument("--database", default="movies.sqlite3", help="SQLite database path.")
    parser.add_argument("--output", default="scraped_movies.json", help="JSON output path.")
    return parser


def main() -> int:
    args = build_parser().parse_args()
    logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
    sources = args.urls or list(DEFAULT_SOURCES)
    if args.head_url:
        allowed_hosts = {urlparse(url).netloc.lower().split(":", 1)[0] for url in sources}
        sources = [discover_active_domain(args.head_url, allowed_hosts or None)]

    source_urls = sources
    if args.archive_template:
        source_urls = [
            args.archive_template.format(year=year, page=page, base=sources[0].rstrip("/"))
            for year in range(args.year_start, args.year_end + 1)
            for page in range(1, max(args.pages, 1) + 1)
        ]

    results: list[dict[str, Any]] = []
    for url in source_urls:
        results.extend(scrape_source(url, max_pages=args.pages))
    results = list({item["url"]: item for item in results if item.get("url")}.values())

    with closing(connect(args.database)) as connection:
        saved = save_movies(connection, results)
    with open(args.output, "w", encoding="utf-8") as handle:
        json.dump(results, handle, ensure_ascii=True, indent=2)
    logging.info("Saved %d items to %s and %d rows to %s", len(results), args.output, saved, args.database)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())