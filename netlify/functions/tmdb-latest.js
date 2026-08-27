exports.handler = async function () {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'TMDB_API_KEY is missing in Netlify environment variables.'
      })
    };
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
      api_key: apiKey
    });
    return fetch(`https://api.themoviedb.org/3/discover/${mediaType}?${params.toString()}`);
  });

  try {
    const responses = await Promise.all(requests);
    const payloads = await Promise.all(responses.map(response => response.json().catch(() => ({}))));
    const failedResponse = responses.find(response => !response.ok);

    if (failedResponse) {
      return {
        statusCode: failedResponse.status,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: 'TMDB latest catalog request failed',
          details: payloads[responses.indexOf(failedResponse)]
        })
      };
    }

    const results = payloads.flatMap((data, index) => (data.results || []).map(result => ({
      ...result,
      media_type: index === 0 ? 'movie' : 'tv'
    }))).sort((a, b) => {
      const dateA = a.release_date || a.first_air_date || '';
      const dateB = b.release_date || b.first_air_date || '';
      return dateB.localeCompare(dateA);
    }).slice(0, 20);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ results })
    };
  } catch (error) {
    return {
      statusCode: 502,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'TMDB latest catalog request failed',
        details: String(error)
      })
    };
  }
};
