MediaHub — Minimal static showcase

Open the site locally by opening `index.html` in your browser.

Or run a local server (recommended) from the project folder:

```powershell
# Python 3
python -m http.server 8000

# or using PowerShell (for a quick static file server)
# requires installed Node.js and http-server package
# npx http-server -p 8000
```

Then open http://localhost:8000/ in your browser.

Notes:
- This site contains sample data only and intentionally includes no owner or personal metadata.
- Tell me if you want categories, search, or a database-backed backend.

## Authorized metadata scraper

The Python scraper is split into `domain_fetcher.py`, `movie_parser.py`, `link_bypass.py`, `database.py`, and `main.py`.
It is intended only for websites and content you are authorized to access. It collects public metadata, follows ordinary HTTP redirects, and reports direct media URLs already present in HTML. It does not bypass CAPTCHA, countdowns, pop-ups, DRM, paywalls, or other access controls.

Install dependencies and run it from this folder:

```powershell
python -m pip install -r requirements.txt
python main.py --url https://katmovieshd.net/ --database movies.sqlite3 --output scraped_movies.json
```

For an authorized archive whose URL pattern is known, use a template:

```powershell
python main.py --head-url https://katmovieshd.net/ --archive-template "{base}/page/{page}/?year={year}" --pages 3
```

`database.py` stores records in SQLite and inserts only new titles/URLs. Existing records are never overwritten or deleted. The generic parser may need site-specific selectors when a website's HTML changes. The domain resolver only accepts hosts explicitly allowed by the caller and does not bypass access controls.