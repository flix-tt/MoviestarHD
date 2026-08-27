import json
import os
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse, parse_qs, urlencode
from urllib.request import Request, urlopen

ROOT = os.path.dirname(os.path.abspath(__file__))
TMDB_API_KEY = os.environ.get('TMDB_API_KEY') or os.environ.get('tmdb_api_key')


def load_env_file(path):
    if not os.path.exists(path):
        return {}
    values = {}
    with open(path, 'r', encoding='utf-8') as handle:
        for line in handle:
            line = line.strip()
            if not line or line.startswith('#') or '=' not in line:
                continue
            key, value = line.split('=', 1)
            values[key.strip()] = value.strip().strip('"').strip("'")
    return values


env_values = load_env_file(os.path.join(ROOT, '.env'))
TMDB_API_KEY = TMDB_API_KEY or env_values.get('TMDB_API_KEY')
PORT = int(os.environ.get('PORT') or env_values.get('PORT') or 8000)


class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path == '/api/health':
            payload = {
                'ok': True,
                'tmdbConfigured': bool(TMDB_API_KEY)
            }
            self.send_json(payload)
            return

        if path == '/api/tmdb-search':
            query = parse_qs(parsed.query).get('query', [''])
            search_term = query[0].strip()

            if not TMDB_API_KEY:
                self.send_json({
                    'error': 'TMDB_API_KEY is missing. Add it to .env.'
                }, status=500)
                return

            if len(search_term) < 2:
                self.send_json({'results': []})
                return

            tmdb_url = (
                'https://api.themoviedb.org/3/search/multi?'
                f'query={__import__("urllib.parse").parse.quote(search_term)}&'
                'include_adult=false&language=en-US&page=1&api_key=' + TMDB_API_KEY
            )

            try:
                request = Request(tmdb_url, headers={'Accept': 'application/json'})
                with urlopen(request, timeout=20) as response:
                    body = response.read().decode('utf-8', 'replace')
                    data = json.loads(body) if body else {}
                self.send_json({'results': data.get('results', [])})
                return
            except Exception as exc:
                self.send_json({
                    'error': 'TMDB proxy request failed',
                    'details': str(exc)
                }, status=502)
                return

        if path == '/api/tmdb-latest':
            if not TMDB_API_KEY:
                self.send_json({
                    'error': 'TMDB_API_KEY is missing. Add it to your .env.'
                }, status=500)
                return

            today = __import__('datetime').date.today().isoformat()
            requests = []
            for media_type, sort_field, date_field in (
                ('movie', 'primary_release_date', 'primary_release_date.lte'),
                ('tv', 'first_air_date', 'first_air_date.lte')
            ):
                params = urlencode({
                    'sort_by': f'{sort_field}.desc',
                    date_field: today,
                    'include_adult': 'false',
                    'include_video': 'false',
                    'language': 'en-US',
                    'page': '1',
                    'api_key': TMDB_API_KEY
                })
                requests.append((media_type, f'https://api.themoviedb.org/3/discover/{media_type}?{params}'))

            try:
                results = []
                for media_type, tmdb_url in requests:
                    request = Request(tmdb_url, headers={'Accept': 'application/json'})
                    with urlopen(request, timeout=20) as response:
                        data = json.loads(response.read().decode('utf-8', 'replace'))
                    for result in data.get('results', []):
                        result['media_type'] = media_type
                        results.append(result)
                results.sort(key=lambda result: result.get('release_date') or result.get('first_air_date') or '', reverse=True)
                self.send_json({'results': results[:20]})
                return
            except Exception as exc:
                self.send_json({
                    'error': 'TMDB latest catalog request failed',
                    'details': str(exc)
                }, status=502)
                return

        if path.startswith('/api/'):
            self.send_json({'error': 'Not found'}, status=404)
            return

        full_path = os.path.join(ROOT, '.' + path) if path.startswith('/') else os.path.join(ROOT, path)
        if path in ('', '/'):
            full_path = os.path.join(ROOT, 'index.html')
        if os.path.isdir(full_path):
            full_path = os.path.join(full_path, 'index.html')
        if os.path.exists(full_path):
            self.path = full_path.replace(ROOT, '')
            return super().do_GET()

        self.send_json({'error': 'File not found'}, status=404)

    def send_json(self, payload, status=200):
        body = json.dumps(payload).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format, *args):
        return


if __name__ == '__main__':
    print(f'Serving Movies Flix on http://localhost:{PORT}')
    httpd = ThreadingHTTPServer(('127.0.0.1', PORT), Handler)
    httpd.serve_forever()
