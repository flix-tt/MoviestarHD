const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = Number(process.env.PORT || 8000);
const TMDB_API_KEY = process.env.TMDB_API_KEY;

app.get('/api/health', (_, res) => {
  res.json({
    ok: true,
    tmdbConfigured: Boolean(TMDB_API_KEY)
  });
});

app.get('/api/tmdb-search', async (req, res) => {
  const query = String(req.query.query || '').trim();

  if (!TMDB_API_KEY) {
    return res.status(500).json({
      error: 'TMDB_API_KEY is missing. Add it to your .env file.'
    });
  }

  if (!query || query.length < 2) {
    return res.json({ results: [] });
  }

  const params = new URLSearchParams({
    query,
    include_adult: 'false',
    language: 'en-US',
    page: '1',
    api_key: TMDB_API_KEY
  });

  const url = `https://api.themoviedb.org/3/search/multi?${params.toString()}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'TMDB request failed',
        details: data
      });
    }

    return res.json({
      results: Array.isArray(data.results) ? data.results : []
    });
  } catch (error) {
    return res.status(502).json({
      error: 'TMDB proxy request failed',
      details: String(error)
    });
  }
});

app.get('/api/tmdb-latest', async (_, res) => {
  if (!TMDB_API_KEY) {
    return res.status(500).json({
      error: 'TMDB_API_KEY is missing. Add it to your .env file.'
    });
  }

  const today = new Date().toISOString().slice(0, 10);
  const requests = [
    ['movie', 'primary_release_date', 'primary_release_date.lte'],
    ['tv', 'first_air_date', 'first_air_date.lte']
  ].map(([mediaType, sortField, dateField]) => {
    const params = new URLSearchParams({
      sort_by: `${sortField}.desc`,
      [dateField]: today,
      include_adult: 'false',
      include_video: 'false',
      language: 'en-US',
      page: '1',
      api_key: TMDB_API_KEY
    });
    return fetch(`https://api.themoviedb.org/3/discover/${mediaType}?${params.toString()}`);
  });

  try {
    const responses = await Promise.all(requests);
    const payloads = await Promise.all(responses.map(response => response.json().catch(() => ({}))));
    const failedResponse = responses.find(response => !response.ok);

    if (failedResponse) {
      return res.status(failedResponse.status).json({
        error: 'TMDB latest catalog request failed',
        details: payloads[responses.indexOf(failedResponse)]
      });
    }

    const results = payloads.flatMap((data, index) => (data.results || []).map(result => ({
      ...result,
      media_type: index === 0 ? 'movie' : 'tv'
    }))).sort((a, b) => {
      const dateA = a.release_date || a.first_air_date || '';
      const dateB = b.release_date || b.first_air_date || '';
      return dateB.localeCompare(dateA);
    }).slice(0, 20);

    return res.json({ results });
  } catch (error) {
    return res.status(502).json({
      error: 'TMDB latest catalog request failed',
      details: String(error)
    });
  }
});

app.use(express.static(path.join(__dirname), { index: 'index.html' }));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return next();
  }

  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Movies Flix running on http://localhost:${PORT}`);
});
