"""SQLite persistence for scraped media metadata."""

from __future__ import annotations

import sqlite3
from collections.abc import Iterable, Mapping


SCHEMA = """
CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    url TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL DEFAULT '',
    poster TEXT NOT NULL DEFAULT '',
    year TEXT NOT NULL DEFAULT '',
    source TEXT NOT NULL DEFAULT '',
    download_url TEXT NOT NULL DEFAULT '',
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
)
"""


def connect(path: str = "movies.sqlite3") -> sqlite3.Connection:
    connection = sqlite3.connect(path)
    connection.row_factory = sqlite3.Row
    connection.execute(SCHEMA)
    connection.commit()
    return connection


def movie_exists(connection: sqlite3.Connection, movie: Mapping[str, str]) -> bool:
    """Return whether a movie with the same URL or title is already stored."""
    row = connection.execute(
        "SELECT 1 FROM movies WHERE url = ? OR title = ? LIMIT 1",
        (movie.get("url", ""), movie.get("title", "")),
    ).fetchone()
    return row is not None


def save_movie(connection: sqlite3.Connection, movie: Mapping[str, str]) -> bool:
    """Insert a new movie, preserving any existing record unchanged."""
    if movie_exists(connection, movie):
        return False

    connection.execute(
        """
        INSERT OR IGNORE INTO movies (title, url, description, poster, year, source, download_url)
        VALUES (:title, :url, :description, :poster, :year, :source, :download_url)
        """,
        {
            "title": movie.get("title", ""),
            "url": movie.get("url", ""),
            "description": movie.get("description", ""),
            "poster": movie.get("poster", ""),
            "year": movie.get("year", ""),
            "source": movie.get("source", ""),
            "download_url": movie.get("download_url", ""),
        },
    )
    return connection.total_changes > 0


def save_movies(connection: sqlite3.Connection, movies: Iterable[Mapping[str, str]]) -> int:
    count = 0
    for movie in movies:
        if not movie.get("title") or not movie.get("url"):
            continue
        if save_movie(connection, movie):
            count += 1
    connection.commit()
    return count