const TMDB_CONFIG = {
  baseUrl: 'https://api.themoviedb.org/3'
};

const TMDB_GENRE_MAP = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  18: 'Drama',
  35: 'Comedy',
  53: 'Thriller',
  27: 'Horror',
  80: 'Crime',
  99: 'Documentary',
  10749: 'Romance',
  14: 'Fantasy',
  36: 'History',
  10751: 'Family',
  10402: 'Music',
  9648: 'Mystery',
  10752: 'War',
  37: 'Western',
  878: 'Sci-Fi',
  10759: 'Action & Adventure',
  10765: 'Sci-Fi & Fantasy',
  10768: 'War & Politics'
};

window.TMDB_CONFIG = TMDB_CONFIG;

function getTmdbHeaders() {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=utf-8'
  };

  return headers;
}

function tmdbUrl(path, params = {}) {
  const query = new URLSearchParams(params);
  return `/api/tmdb-search?${query.toString()}`;
}

const items = [
  {id:1,title:'Spider-Man: Brand New Day',type:'movie',year:2026,poster:'https://i.ibb.co/C5CTwzpM/Spider-Man-Brand-New-Day-2026-Hindi-Dubbed-Dual-Audio.jpg',
    short:'A new era of Spider-Man action and mystery.',
    synopsis:'Peter Parker faces a fresh set of threats as he tries to protect the city while confronting the consequences of a changing world and a bigger villain network.',
    genres:['Action','Adventure','Superhero'],
    cast:['Tom Holland','Zendaya','Jacob Batalon'],
    runtime:'2h 15m',rating:'8.7',trailer:''},

  {id:2,title:'Awarapan 2',type:'drama',year:2026,poster:'https://m.media-amazon.com/images/M/MV5BZDJiYmZhMGYtMDZlYi00YTY1LWI3NDktNzYxMTY4NzhkNTU5XkEyXkFqcGc@._V1_FMjpg_UY711_.jpg',
    short:'A high-stakes return with emotional intensity.',
    synopsis:'A troubled protagonist is pulled back into a dangerous past that reshapes his present, forcing him to choose between redemption and survival.',
    genres:['Drama','Action','Thriller'],
    cast:['Emraan Hashmi','Aditi Rao Hydari','Shivam Nair'],
    runtime:'2h 08m',rating:'7.9',trailer:''},

  {id:3,title:'To the Max',type:'movie',year:2026,poster:'https://image.tmdb.org/t/p/w500/7KtjwHzp2EB5N63bZtxVb2gImjf.jpg',
    short:'A daring, intense journey under pressure.',
    synopsis:'A determined team pushes their limits in a dangerous adventure that blends action, emotion, and impossible decisions across unfamiliar territory.',
    genres:['Action','Adventure','Drama'],
    cast:['Liam Parker','Mila Santos','Noah Reed'],
    runtime:'1h 52m',rating:'7.8',trailer:''},

  {id:4,title:'My Best Friend, His Girlfriend and Me',type:'drama',year:2026,poster:'https://image.tmdb.org/t/p/w500/xk2QaaDjaHG1xKhyB6hpi2OcQmL.jpg',
    short:'A romantic comedy with awkward chemistry and big feelings.',
    synopsis:'A tangled love triangle turns into a coming-of-age story about trust, timing, and the surprising ways life redirects our heart.',
    genres:['Comedy','Drama','Romance'],
    cast:['Ava Brooks','Daniel Kim','Ella Ross'],
    runtime:'1h 44m',rating:'7.6',trailer:''},

  {id:5,title:'Don’t Say Good Luck',type:'movie',year:2026,poster:'https://image.tmdb.org/t/p/w500/w3NNwo7kImaJS7fL6YlBsJx0i6R.jpg',
    short:'A mood-light comedy with sharp twists.',
    synopsis:'When luck changes everything, a group of friends must adapt to a series of unexpected chances and impossible choices in a witty, emotional journey.',
    genres:['Comedy','Drama','Romance'],
    cast:['Sarah Cole','Aiden Hart','Mina Rose'],
    runtime:'1h 39m',rating:'7.5',trailer:''},

  {id:6,title:'The Snake Girl',type:'movie',year:2025,poster:'https://image.tmdb.org/t/p/w500/tXZMbZmdzWNuWPTmUUZYij7tIL4.jpg',
    short:'A tense thriller rooted in myth and danger.',
    synopsis:'A mysterious encounter turns into a life-or-death pursuit as hidden truths emerge and every step forward brings new danger.',
    genres:['Action','Horror','Thriller'],
    cast:['Jin Park','Ari Chen','Kian Wu'],
    runtime:'1h 48m',rating:'7.4',trailer:''},

  {id:7,title:'My Brilliant Career',type:'drama',year:2026,poster:'https://image.tmdb.org/t/p/w500/fhpa8B6USatHybK04XBbPAB6Mlz.jpg',
    short:'A character-driven drama of ambition and identity.',
    synopsis:'A gifted young woman battles expectations, career pressure, and personal sacrifice while chasing a life that reflects her true talents and ambitions.',
    genres:['Drama','Career','Coming of Age'],
    cast:['Emma Shaw','Oliver Miles','Nina Brooks'],
    runtime:'8 Episodes',rating:'8.1',trailer:''},

  {id:8,title:'Tires',type:'drama',year:2026,poster:'https://catimages.org/images/2026/08/13/tirre.jpg',
    short:'A workplace comedy with chaotic energy.',
    synopsis:'A struggling team navigates constant setbacks, personal chaos, and the bizarre culture of a growing business where everything feels one mistake away from disaster.',
    genres:['Comedy','Drama'],
    cast:['Ben Carter','Rhea Cole','Gary Stone'],
    runtime:'8 Episodes',rating:'7.7',trailer:''},

  {id:9,title:'In the Grey',type:'movie',year:2026,poster:'https://image.tmdb.org/t/p/w500/96fcfubkRMjjpjFiaKqssySW53V.jpg',
    short:'A gritty, tense survival thriller.',
    synopsis:'Caught between danger, duty, and survival, a group of people must confront the cost of difficult choices in a bleak and unforgiving environment.',
    genres:['Action','Drama','Thriller'],
    cast:['Marina Lee','Daniel Frost','Zoe Cross'],
    runtime:'1h 58m',rating:'7.9',trailer:''},

  {id:10,title:'Reacher',type:'drama',year:2026,poster:'https://image.tmdb.org/t/p/w500/f1VCQIG2iCyOookdgOzwtUpwWC0.jpg',
    short:'A relentless action series with sharp stakes.',
    synopsis:'As a new case unfolds, an elite investigator is forced to confront a network of danger, deception, and personal consequences that keep growing.',
    genres:['Action','Crime','Drama'],
    cast:['Alan Ritchson','Maria Sten','Serinda Swan'],
    runtime:'8 Episodes',rating:'8.4',trailer:''},

  {id:11,title:'Our Hero, Balthazar',type:'movie',year:2025,poster:'https://m.media-amazon.com/images/M/MV5BZmM2ZTkyNDUtM2YzYS00YjVmLWEyZTQtZGE0MGRkY2M0ZTE3XkEyXkFqcGc@._V1_SX400.jpg',
    short:'A smart, layered story of courage and consequence.',
    synopsis:'A complicated hero learns that survival, moral choices, and personal growth are often shaped by the toughest odds and least expected allies.',
    genres:['Comedy','Drama','Thriller'],
    cast:['Evan Moore','Celine Park','Leo Quinn'],
    runtime:'1h 46m',rating:'7.6',trailer:''},

  {id:12,title:'Gold',type:'movie',year:2022,poster:'https://image.tmdb.org/t/p/w500/hGPOesl7j22rqWoNGpqpzocMjys.jpg',
    short:'A tense survival-adventure under extreme conditions.',
    synopsis:'In a hostile and unforgiving landscape, a desperate team races against time and nature to survive, protect each other, and avoid collapse.',
    genres:['Action','Adventure','Thriller'],
    cast:['Mason Reed','Ariya M','Noah Vale'],
    runtime:'1h 54m',rating:'7.8',trailer:''},

  {id:13,title:'Stand Your Ground',type:'movie',year:2025,poster:'https://image.tmdb.org/t/p/w500/u4GW1qTNjooEFSXDBVDMmYb52qC.jpg',
    short:'An edge-of-seat action thriller.',
    synopsis:'When a routine situation spirals out of control, a group of people must decide how far they are willing to go to survive and protect loved ones.',
    genres:['Action','Crime','Thriller'],
    cast:['Jared Hall','Alina West','Milo James'],
    runtime:'1h 50m',rating:'7.7',trailer:''},

  {id:14,title:'My Bias, My Boss',type:'drama',year:2026,poster:'https://image.tmdb.org/t/p/w500/A4Y4xlDHS4xi2WI9265vRyIYLoo.jpg',
    short:'A romantic K-drama with workplace tension and chemistry.',
    synopsis:'A close-knit office dynamic turns into an emotional and unexpected romance as hidden feelings, loyalty, and ambition collide.',
    genres:['Drama','Romance','Comedy'],
    cast:['Ji-eun Park','Minho Lee','Hana Seo'],
    runtime:'6 Episodes',rating:'8.2',trailer:''},

  {id:15,title:'Iron Man 2',type:'movie',year:2010,poster:'https://image.tmdb.org/t/p/w500/tkeEYsLuQuIhRLyS64oe3deHAZ4.jpg',
    short:'The billionaire genius faces a more dangerous future.',
    synopsis:'Tony Stark confronts new threats while balancing innovation, pressure, and the consequences of his own brilliance in a fast, high-stakes battle.',
    genres:['Action','Sci-Fi','Adventure'],
    cast:['Robert Downey Jr.','Gwyneth Paltrow','Scarlett Johansson'],
    runtime:'2h 04m',rating:'7.9',trailer:''},

  {id:16,title:'Iron Man',type:'movie',year:2008,poster:'https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg',
    short:'A weapons genius builds a new identity.',
    synopsis:'After being captured, a brilliant inventor creates a powered armor suit and becomes the hero no one expected — reshaping his life and the future of the world.',
    genres:['Action','Adventure','Sci-Fi'],
    cast:['Robert Downey Jr.','Terrence Howard','Jeff Bridges'],
    runtime:'2h 06m',rating:'7.9',trailer:''},

  {id:17,title:'Jujutsu Kaisen',type:'animation',year:2021,poster:'https://image.tmdb.org/t/p/w500/oQ2Xu-wQxWR52P9G-a2bPKWe-hD.jpg',
    short:'A dark fantasy anime about curse-hunting warriors.',
    synopsis:'A high schooler swallows a cursed finger and becomes home to a powerful demon. Now he must enroll in a hidden academy to prepare for battles with supernatural curses.',
    genres:['Action','Animation','Supernatural'],
    cast:['Yuji Itadori','Megumi Fushiguro','Nobuhiko Okamoto'],
    runtime:'24 Episodes',rating:'8.8',trailer:''},

  {id:18,title:'Attack on Titan',type:'animation',year:2013,poster:'https://image.tmdb.org/t/p/w500/xfSJJwJVTdH0T5hJ6dL5PJhq1J2.jpg',
    short:'Humanity fights back against colossal monsters.',
    synopsis:'In a world where giant humanoid creatures called titans terrorize humanity, a young man witnesses his home destroyed and vows to exterminate every single titan.',
    genres:['Action','Animation','Drama'],
    cast:['Eren Yeager','Mikasa Ackerman','Armin Arlert'],
    runtime:'93 Episodes',rating:'9.0',trailer:''},

  {id:19,title:'Demon Slayer',type:'animation',year:2019,poster:'https://image.tmdb.org/t/p/w500/qqHQsStaqbNEhUbIQwXutVAv0iB.jpg',
    short:'A young swordsman faces demons to save his sister.',
    synopsis:'When his family is slaughtered by demons, Tanjiro becomes a demon slayer, embarking on an epic journey to find a cure for his sister\'s transformation.',
    genres:['Action','Animation','Adventure'],
    cast:['Tanjiro Kamado','Nezuko Kamado','Zenitsu Agatsuma'],
    runtime:'50+ Episodes',rating:'8.9',trailer:''},

  {id:20,title:'Death Note',type:'animation',year:2006,poster:'https://image.tmdb.org/t/p/w500/mggv9GvXdMbT6KTKyIkdLq4iiB1.jpg',
    short:'A genius teenager finds a notebook that kills with a name.',
    synopsis:'A high school prodigy discovers a mysterious notebook that can kill anyone. As he becomes drunk with power, a brilliant detective hunts him down in this psychological thriller.',
    genres:['Thriller','Animation','Supernatural'],
    cast:['Light Yagami','L','Ryuk'],
    runtime:'37 Episodes',rating:'9.0',trailer:''},

  {id:21,title:'Naruto Shippuden',type:'animation',year:2007,poster:'https://image.tmdb.org/t/p/w500/zKZcqJHWb0rKZZgJn0fV3AcAT7b.jpg',
    short:'A ninja\'s journey to become the strongest warrior.',
    synopsis:'Naruto continues his quest to become Hokage, facing powerful enemies and uncovering ancient secrets that threaten the ninja world.',
    genres:['Action','Animation','Adventure'],
    cast:['Naruto Uzumaki','Sasuke Uchiha','Sakura Haruno'],
    runtime:'500+ Episodes',rating:'8.3',trailer:''},

  {id:22,title:'The End of Oak Street',type:'movie',year:2026,poster:'https://catimages.org/images/2026/08/15/The-End-of-Oak-Street-2026-Hindi-Dubbed.jpg',
    short:'A tense mystery action thriller in Hindi dubbed format.',
    synopsis:'A dark and suspenseful story unfolds on Oak Street, where secrets, danger, and personal choices collide in a thrilling pursuit through unfamiliar territory.',
    genres:['Action','Adventure','Mystery'],
    cast:['Unknown Cast','Featured Ensemble'],
    runtime:'2h 08m',rating:'7.8',trailer:''},

  {id:23,title:'Komodo',type:'movie',year:1999,poster:'https://image.tmdb.org/t/p/w500/nDHnhv6EOjYMTWrWo45euRMMZTI.jpg',
    short:'Adventure thriller on a dangerous island with mythical creatures.',
    synopsis:'A gripping adventure on an island where a prehistoric creature roams. A team must survive against all odds in this thrilling, action-packed survival story.',
    genres:['Adventure','Horror','Sci-Fi','Thriller'],
    cast:['Jill Hennessy','Kevin Zegers','Peter Firth'],
    runtime:'1h 51m',rating:'5.9',trailer:'',
    downloads480p:[
      {name:'HubCloud',url:'https://hubcloud.cx/drive/1kwxkuctz381tun',size:'319MB'},
      {name:'KatDrive',url:'https://katdrive.click/file/1786808266',size:'319MB'},
      {name:'Send.Now',url:'https://send.now/zly0ib33x44n',size:'319MB'}
    ]},

  {id:24,title:'Casino Jack',type:'movie',year:2010,poster:'https://image.tmdb.org/t/p/w500/pYFSAXCDagXH7Pi0FOCKlU1Vz9T.jpg',
    short:'A comedic biography about an audacious political lobbyist.',
    synopsis:'Based on true events, this film follows an ambitious lobbyist who gets caught up in a criminal conspiracy while navigating the dangerous world of Washington politics.',
    genres:['Biography','Comedy','Crime','Drama','Dual Audio'],
    cast:['Kevin Spacey','Barry Pepper','Rachel McAdams'],
    runtime:'1h 48m',rating:'6.7',trailer:''},

  {id:25,title:'Spooky in Love',type:'drama',year:2026,poster:'https://image.tmdb.org/t/p/w500/acVOH8Pr5LEZ7WKZCbzwNuHVr9x.jpg',
    short:'A supernatural K-drama romance with chilling mystery and love.',
    synopsis:'A haunting romance unfolds as a girl encounters supernatural events while discovering unexpected love in this thrilling K-drama series with Hindi dubbed and multi-audio options.',
    genres:['Korean Drama','Romance','Supernatural','Mystery','Multi Audio'],
    cast:['Korean Ensemble Cast'],
    runtime:'9+ Episodes',rating:'7.8',trailer:''}
];

function setMeta(selector, attribute, value) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    const match = selector.match(/\[([^=]+)=['\"]?([^'\"]+)/);
    if (match) element.setAttribute(match[1], match[2]);
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
}

function setCanonical(url) {
  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = url;
}

function setStructuredData(id, data) {
  let schema = document.getElementById(id);
  if (!schema) {
    schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.id = id;
    document.head.appendChild(schema);
  }
  schema.textContent = JSON.stringify(data);
}

function slugify(title) {
  return title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function detailsUrl(item) {
  const params = new URLSearchParams({ title: slugify(item.title) });
  if (item.tmdb && item.id) {
    params.set('tmdb', String(item.id).replace('tmdb-', ''));
  }
  return `details.html?${params.toString()}`;
}

function qualityUrl(item) { return `480p.html?title=${encodeURIComponent(slugify(item.title))}`; }

function rememberTmdbItem(item) {
  if (!item || !item.tmdb || !item.id) return;
  try {
    const key = 'tmdbDetailsCache';
    const raw = sessionStorage.getItem(key);
    const map = raw ? JSON.parse(raw) : {};
    map[String(item.id)] = item;
    sessionStorage.setItem(key, JSON.stringify(map));
  } catch (error) {
    console.warn('TMDB detail cache unavailable:', error);
  }
}

function readTmdbItemFromCache(id) {
  if (!id) return null;
  try {
    const raw = sessionStorage.getItem('tmdbDetailsCache');
    if (!raw) return null;
    const map = JSON.parse(raw);
    return map[String(id)] || null;
  } catch (error) {
    console.warn('TMDB detail cache read failed:', error);
    return null;
  }
}

function itemFromUrl() {
  const params = new URLSearchParams(location.search);
  const title = params.get('title');
  const tmdbId = params.get('tmdb');

  if (tmdbId) {
    const cached = readTmdbItemFromCache(tmdbId);
    if (cached) return cached;
  }

  return title ? items.find(item => slugify(item.title) === title) : items.find(item => item.id === parseInt(params.get('id'), 10));
}

function getTmdbPoster(path) {
  return path ? `https://image.tmdb.org/t/p/w500${path}` : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80';
}

function tmdbResultToItem(result) {
  if (!result || !['movie', 'tv'].includes(result.media_type)) return null;

  const title = result.title || result.name || 'Unknown title';
  const year = new Date(result.release_date || result.first_air_date || '0000-01-01').getFullYear();
  const genreIds = Array.isArray(result.genre_ids) ? result.genre_ids : [];
  const isAnimation = genreIds.includes(16) || (result.media_type === 'tv' && /anime|cartoon|animation/i.test(title));
  const type = result.media_type === 'movie' ? (isAnimation ? 'animation' : 'movie') : (isAnimation ? 'animation' : 'drama');
  const genres = genreIds
    .map(id => TMDB_GENRE_MAP[id])
    .filter(Boolean)
    .slice(0, 3);
  const poster = getTmdbPoster(result.poster_path);

  return {
    id: `tmdb-${result.id}`,
    title,
    type,
    year: Number.isNaN(year) ? new Date().getFullYear() : year,
    poster,
    short: result.overview || 'Discover more from TMDB.',
    synopsis: result.overview || 'Discover more from TMDB.',
    genres: genres.length ? genres : ['Featured'],
    cast: [],
    runtime: result.media_type === 'tv' ? 'TV Series' : 'Movie',
    rating: String(result.vote_average ?? 'N/A'),
    trailer: '',
    tmdb: true,
    tmdbUrl: `https://www.themoviedb.org/${result.media_type}/${result.id}`
  };
}

async function searchTmdbCatalog(term, filter='all') {
  return [];
}

async function loadLatestTmdbCatalog() {
  return [];
}

async function loadScrapedCatalog() {
  try {
    const response = await fetch('/scraped_movies.json', { cache: 'no-store' });
    if (!response.ok) return;

    const records = await response.json();
    if (!Array.isArray(records)) return;

    items.length = 0;
    const existingTitles = new Set(items.map(item => item.title.toLowerCase()));
    records.forEach(record => {
      const title = String(record.title || '').trim();
      if (!title || existingTitles.has(title.toLowerCase())) return;

      const searchable = `${title} ${record.url || ''}`.toLowerCase();
      const type = /anime|animation/.test(searchable)
        ? 'animation'
        : /drama|series|season|episode|tv-show/.test(searchable)
          ? 'drama'
          : 'movie';

      items.push({
        id: `scraped-${items.length + 1}`,
        title,
        type,
        year: Number(record.year) || new Date().getFullYear(),
        poster: record.poster || getTmdbPoster(''),
        short: record.description || 'Freshly fetched catalog entry.',
        synopsis: record.description || 'Freshly fetched catalog entry.',
        genres: [type === 'animation' ? 'Animation' : type === 'drama' ? 'Drama' : 'Movie'],
        cast: [],
        runtime: type === 'drama' ? 'Series' : 'Movie',
        rating: 'N/A',
        trailer: '',
        sourceUrl: record.url || ''
      });
      existingTitles.add(title.toLowerCase());
    });
  } catch (error) {
    console.warn('Scraped catalog unavailable:', error);
  }
}

function setCatalogSeo() {
  const homeUrl = new URL('index.html', location.href).href;
  setCanonical(homeUrl);
  setMeta('meta[property="og:url"]', 'content', homeUrl);
  setStructuredData('catalog-schema', {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Hindi Movies, Dramas and Animation',
    description: 'MovieStarHD catalog of Hindi movies, Hindi dubbed dramas, series and animation.',
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: new URL(detailsUrl(item), location.href).href,
      name: `${item.title} (${item.year}) Hindi`
    }))
  });
}

function setItemSeo(item) {
  const itemUrl = new URL(detailsUrl(item), location.href).href;
  const title = `${item.title} (${item.year}) Hindi ${item.type === 'drama' ? 'Drama / Series' : 'Movie'} | MovieStarHD`;
  const description = `${item.title} (${item.year}) Hindi ${item.type === 'drama' ? 'drama / series' : 'movie'}: ${item.short || item.synopsis}`;
  const schemaType = /Episodes/i.test(item.runtime) ? 'TVSeries' : 'Movie';

  document.title = title;
  setMeta('meta[name="description"]', 'content', description);
  setMeta('meta[property="og:title"]', 'content', title);
  setMeta('meta[property="og:description"]', 'content', description);
  setMeta('meta[property="og:image"]', 'content', item.poster);
  setMeta('meta[property="og:url"]', 'content', itemUrl);
  setMeta('meta[name="twitter:title"]', 'content', title);
  setMeta('meta[name="twitter:description"]', 'content', description);
  setMeta('meta[name="twitter:image"]', 'content', item.poster);
  setCanonical(itemUrl);
  setStructuredData('item-schema', {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: item.title,
    description: item.synopsis,
    image: item.poster,
    url: itemUrl,
    datePublished: String(item.year),
    genre: item.genres,
    inLanguage: 'hi',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: item.rating,
      bestRating: '10'
    },
    actor: item.cast.map(name => ({ '@type': 'Person', name }))
  });
}

function itemCardHref(item){
  if (item.tmdb) {
    rememberTmdbItem(item);
    return detailsUrl(item);
  }
  return detailsUrl(item);
}

function createCard(item){
  const el = document.createElement('article');
  el.className = 'card';
  el.innerHTML = `
    <a class="card-link" href="${itemCardHref(item)}">
      <div class="card-poster">
        <img src="${item.poster}" alt="${item.title} poster" loading="lazy">
        <div class="card-poster-shade"></div>
        <span class="card-type">${item.type === 'animation' ? 'Animation' : item.type === 'drama' ? 'Drama' : 'Movie'}</span>
        <span class="card-rating">★ ${item.rating}</span>
      </div>
      <div class="meta">
        <div class="title">${item.title}</div>
        <small>${item.type.toUpperCase()} • ${item.year}</small>
        <p>${item.short || item.synopsis || ''}</p>
      </div>
      <span class="hover-overlay" aria-hidden="true"></span>
      <span class="play-ico" aria-hidden="true">▶</span>
    </a>`;
  return el;
}

async function render(filter='all', searchTerm=''){
  const container = document.getElementById('gallery');
  const hero = document.querySelector('.hero');
  const isHome = filter === 'all';

  if(hero){
    hero.style.display = isHome ? 'flex' : 'none';
  }

  const sections = document.querySelectorAll('.section-block');
  sections.forEach((section, index) => {
    const isGallerySection = index === sections.length - 1;
    if (isHome) {
      section.style.display = '';
    } else {
      section.style.display = isGallerySection ? '' : 'none';
    }
  });

  if(!container) return;
  container.innerHTML = '';

  const trimmed = searchTerm.trim();
  let list = filter === 'all' ? items.slice() : items.filter(i=>i.type===filter);

  if(trimmed){
    const s = trimmed.toLowerCase();
    const localMatches = list.filter(i=> {
      const txt = (i.title || '') + ' ' + (i.short || '') + ' ' + (i.synopsis || '');
      return txt.toLowerCase().includes(s);
    });

    if (localMatches.length) {
      list = localMatches;
    } else {
      list = [];
    }
  }

  if (!list.length) {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-search';
    emptyState.innerHTML = `
      <div class="empty-search-card">
        <h3>No results found</h3>
        <p>Try another movie, drama, or animation title.</p>
      </div>`;
    container.appendChild(emptyState);
    renderLatestRow(items.slice(-4).reverse());
    renderCategoryRows(items);
    return;
  }

  list.forEach(i=>container.appendChild(createCard(i)));
  renderLatestRow(list);
  renderCategoryRows(list);
}


function renderLatestRow(source = items){
  const row = document.getElementById('latest-row');
  if(!row) return;
  row.innerHTML = '';
  const latestItems = source.slice(-4).reverse();
  latestItems.forEach(item => {
    const card = document.createElement('article');
    card.className = 'mini-card small-mini';
    card.innerHTML = `
      <a class="mini-link" href="${detailsUrl(item)}">
        <img src="${item.poster}" alt="${item.title}">
        <div class="mini-overlay compact">
          <div class="mini-meta">
            <strong>${item.title}</strong>
            <small>${item.year}</small>
          </div>
          <span class="mini-badge">HD</span>
        </div>
      </a>`;
    row.appendChild(card);
  });
}

function renderCategoryRows(source = items){
  const groups = [
    {id: 'dubbed-row', list: source.slice(0,4)},
    {id: 'action-row', list: source.filter(item => item.genres.some(g => /(Action|Adventure|Sci|Superhero|Thriller)/i.test(g))).slice(0,4)}
  ];

  groups.forEach(group => {
    const row = document.getElementById(group.id);
    if(!row) return;
    row.innerHTML = '';
    const selected = group.list.length ? group.list : source.slice(0,4);
    selected.slice(0,4).forEach(item => {
      const card = document.createElement('article');
      card.className = 'mini-card small-mini';
      card.innerHTML = `
        <a class="mini-link" href="${detailsUrl(item)}">
          <img src="${item.poster}" alt="${item.title}">
          <div class="mini-overlay compact">
            <div class="mini-meta">
              <strong>${item.title}</strong>
              <small>${item.year}</small>
            </div>
            <span class="mini-badge">HD</span>
          </div>
        </a>`;
      row.appendChild(card);
    });
  });
}

// nav
document.querySelectorAll('.nav-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.getAttribute('data-filter');
    const searchInput = document.getElementById('nav-search');
    void render(f, searchInput ? searchInput.value : '');
    // close mobile nav after selection
    const siteNav = document.getElementById('site-nav');
    const toggle = document.getElementById('nav-toggle');
    if(siteNav && siteNav.classList.contains('open')){
      siteNav.classList.remove('open');
      if(toggle) toggle.setAttribute('aria-expanded','false');
    }
  });
});

// mobile toggle
const navToggle = document.getElementById('nav-toggle');
const siteNav = document.getElementById('site-nav');
if(navToggle && siteNav){
  navToggle.addEventListener('click', ()=>{
    const open = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Brand (Movies Flix) click to go home or refresh
const brand = document.querySelector('.brand');
if(brand){
  brand.style.cursor = 'pointer';
  brand.addEventListener('click', ()=>{
    if(window.location.pathname.endsWith('index.html') || window.location.pathname === '/'){
      location.reload();
    } else {
      location.href = 'index.html';
    }
  });
}

// search
const searchInput = document.getElementById('nav-search');
if(searchInput){
  searchInput.addEventListener('input', ()=>{
    const active = document.querySelector('.nav-btn.active');
    const filter = active ? active.getAttribute('data-filter') : 'all';
    void render(filter, searchInput.value);
  });
}

// initial
if (document.getElementById('gallery')) {
  loadScrapedCatalog()
    .finally(() => {
      refreshFeaturedFromCatalog();
      setCatalogSeo();
      void render();
    });
}

// Keep the hero focused: show only the five newest featured catalog titles.
const featuredMovies = items.slice(0, 5);
let featuredIndex = 0;
let activeFeaturedMovie = featuredMovies[0] || items[0];
let featuredTimer;

function updateHero(movie = activeFeaturedMovie){
  const hero = document.querySelector('.hero');
  const title = document.querySelector('.hero-title');
  const meta = document.querySelector('.hero-meta');
  const desc = document.querySelector('.hero-desc');
  const kicker = document.querySelector('.hero .kicker');

  if(hero){
    hero.style.cursor = 'pointer';
  }

  if(!movie) return;
  activeFeaturedMovie = movie;

  const currentImage = document.querySelector('.hero-image-current');
  const nextImage = document.querySelector('.hero-image-next');
  const heroContent = document.querySelector('.hero-content');
  if(currentImage && nextImage && currentImage.dataset.poster !== movie.poster){
    nextImage.src = movie.poster;
    nextImage.classList.add('is-visible');
    window.setTimeout(() => {
      currentImage.src = movie.poster;
      currentImage.dataset.poster = movie.poster;
      nextImage.classList.remove('is-visible');
    }, 820);
  }
  if(heroContent){
    heroContent.classList.remove('is-changing');
    void heroContent.offsetWidth;
    heroContent.classList.add('is-changing');
  }
  if(title) title.textContent = movie.title;
  if(meta) meta.textContent = `${movie.year} • ${movie.genres.slice(0,2).join(' • ')} • ${movie.runtime}`;
  if(desc) desc.textContent = movie.short || movie.synopsis;
  if(kicker) kicker.textContent = `New ${movie.type === 'animation' ? 'Animation' : movie.type === 'drama' ? 'Drama' : 'Movie'}`;
  document.querySelectorAll('.hero-dot').forEach((dot, index) => dot.setAttribute('aria-selected', String(index === featuredIndex)));
}

function refreshFeaturedFromCatalog(){
  featuredMovies.splice(0, featuredMovies.length, ...items.slice(0, 5));
  activeFeaturedMovie = featuredMovies[0] || items[0];
  const dots = document.querySelector('.hero-dots');
  if(dots){
    dots.innerHTML = featuredMovies.map((movie, index) => `<button class="hero-dot" type="button" role="tab" aria-label="Show ${movie.title}" aria-selected="${index === 0}"></button>`).join('');
  }
  updateHero(activeFeaturedMovie);
}

if(featuredMovies.length){
  const dots = document.querySelector('.hero-dots');
  const changeFeatured = (direction = 1) => {
    featuredIndex = (featuredIndex + direction + featuredMovies.length) % featuredMovies.length;
    updateHero(featuredMovies[featuredIndex]);
  };
  const restartFeaturedTimer = () => {
    clearInterval(featuredTimer);
    featuredTimer = setInterval(changeFeatured, 3000);
  };
  if(dots){
    dots.innerHTML = featuredMovies.map((movie, index) => `<button class="hero-dot" type="button" role="tab" aria-label="Show ${movie.title}" aria-selected="${index === 0}"></button>`).join('');
    dots.addEventListener('click', event => {
      const dot = event.target.closest('.hero-dot');
      if(!dot) return;
      featuredIndex = [...dots.children].indexOf(dot);
      updateHero(featuredMovies[featuredIndex]);
      restartFeaturedTimer();
    });
  }
  updateHero(featuredMovies[0]);
  document.querySelector('.hero-next')?.addEventListener('click', () => { changeFeatured(); restartFeaturedTimer(); });
  document.querySelector('.hero-prev')?.addEventListener('click', () => { changeFeatured(-1); restartFeaturedTimer(); });
  document.querySelector('.hero')?.addEventListener('mouseenter', () => clearInterval(featuredTimer));
  document.querySelector('.hero')?.addEventListener('mouseleave', restartFeaturedTimer);
  document.querySelector('.hero')?.addEventListener('click', (event) => {
    if (event.target.closest('button')) return;
    if (activeFeaturedMovie) {
      location.href = detailsUrl(activeFeaturedMovie);
    }
  });
  restartFeaturedTimer();
}

// Hero CTAs
const heroPlay = document.getElementById('hero-play');
if(heroPlay){
  heroPlay.addEventListener('click', ()=>{
    if(activeFeaturedMovie){
      location.href = detailsUrl(activeFeaturedMovie);
      return;
    }
    const gallery = document.getElementById('gallery');
    if(gallery) gallery.scrollIntoView({behavior:'smooth'});
  });
}

const heroList = document.getElementById('hero-list');
if(heroList){
  heroList.addEventListener('click', ()=>{
    heroList.textContent = heroList.classList.toggle('saved') ? '✓ Saved' : '+ My List';
  });
}

// Mobile bar interactions
const mobileHome = document.getElementById('mobile-home');
if(mobileHome){
  mobileHome.addEventListener('click', ()=>{ location.href = 'index.html'; });
}
const mobileSearch = document.getElementById('mobile-search');
if(mobileSearch){
  mobileSearch.addEventListener('click', ()=>{
    const s = document.getElementById('nav-search');
    const nav = document.getElementById('site-nav');
    const toggle = document.getElementById('nav-toggle');
    if(s && nav){
      nav.classList.add('open');
      if(toggle) toggle.setAttribute('aria-expanded','true');
      s.scrollIntoView({behavior:'smooth', block:'center'});
      window.setTimeout(()=>s.focus(), 180);
    }
    else location.href = 'index.html';
  });
}
const mobileList = document.getElementById('mobile-list');
if(mobileList){
  mobileList.addEventListener('click', ()=>{
    const gallery = document.getElementById('gallery');
    if(gallery) gallery.scrollIntoView({behavior:'smooth'});
    else location.href = 'index.html';
  });
}

// Unique card click effect: ripple + brief scale animation then navigate
const galleryEl = document.getElementById('gallery');
if(galleryEl){
  galleryEl.addEventListener('click', (e)=>{
    const link = e.target.closest('.card-link');
    if(!link) return;
    // create ripple
    const card = link.closest('.card');
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const size = Math.max(rect.width, rect.height) * 0.6;
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (x - size/2) + 'px';
    ripple.style.top = (y - size/2) + 'px';
    card.appendChild(ripple);

    // add animation class
    card.classList.add('card-click-anim');

    // navigate after animation
    const href = link.getAttribute('href');
    setTimeout(()=>{
      // cleanup
      try{ card.classList.remove('card-click-anim'); }catch(e){}
      if(href){ location.href = href; }
    }, 380);

    // remove ripple after animation
    setTimeout(()=>{ if(ripple && ripple.parentNode) ripple.parentNode.removeChild(ripple); }, 700);

    // prevent default link immediate navigation
    e.preventDefault();
  });
}

// Details page rendering (if on details.html)
function renderDetails(){
  const root = document.getElementById('details-root');
  if(!root) return;
  const item = itemFromUrl();
  if(!item){
    root.innerHTML = `<div class="details"><p>Item not found. <a href="index.html">Back to home</a></p></div>`;
    return;
  }
  setItemSeo(item);
  const largePoster = item.poster.replace(/\/(\d+)\/(\d+)$/,'/1200/720');
  // build genres badges
  const genreHtml = item.genres && item.genres.length ? item.genres.map(g=>`<span class="badge">${g}</span>`).join(' ') : '';
  // build cast list
  const castHtml = item.cast && item.cast.length ? item.cast.map(c=>`<li>${c}</li>`).join('') : '';

  root.innerHTML = `
    <div class="details">
      <div class="details-visual" style="background-image:url('${largePoster}')">
        <a class="back-link" href="index.html">← Back</a>
        <div class="details-actions">
          <button id="detail-play" class="btn btn-play">Play</button>
          <button id="detail-trailer" class="btn btn-muted">Trailer</button>
          <button id="detail-download" class="btn btn-muted">Download</button>
          <button id="detail-list" class="btn btn-list">+ My List</button>
        </div>
      </div>
      <div class="details-body">
        <div class="details-panel">
        <div class="details-eyebrow"><span>${item.type === 'animation' ? 'Animation' : item.type === 'drama' ? 'Drama / Series' : 'Featured Movie'}</span><span class="details-dot">•</span><span>Hindi</span></div>
        <h1>${item.title} <small class="muted">(${item.year})</small></h1>
        <div class="details-stats"><span>★ ${item.rating}/10</span><span>${item.runtime}</span><span>${item.year}</span></div>
        <div class="details-row">
          <div class="details-left">
            <div class="rating">⭐ ${item.rating} • ${item.runtime}</div>
            <div class="genres">${genreHtml}</div>
            <p class="details-desc">${item.synopsis}</p>
          </div>
          <aside class="details-side">
            <h4>Cast</h4>
            <ul class="cast-list">${castHtml}</ul>
          </aside>
        </div>
        </div>

        <section class="related">
          <h3>More like this</h3>
          <div class="related-row" id="related-row"></div>
        </section>
      </div>
    </div>`;

  // populate related items
  const relatedRow = document.getElementById('related-row');
  if(relatedRow){
    const related = items.filter(x=>x.type===item.type && x.id!==item.id).slice(0,6);
    related.forEach(r=>{
      const div = document.createElement('div');
      div.className = 'small-card';
      div.innerHTML = `
        <a href="${detailsUrl(r)}" class="small-link">
          <img src="${r.poster}" alt="${r.title}">
          <div class="small-title">${r.title}</div>
        </a>`;
      relatedRow.appendChild(div);
    });
  }

  const play = document.getElementById('detail-play');
  if(play) play.addEventListener('click', ()=>{ alert('Play — demo'); });
  const downloadBtn = document.getElementById('detail-download');
  if(downloadBtn) downloadBtn.addEventListener('click', ()=>{ 
    location.href = qualityUrl(item); 
  });
  const listBtn = document.getElementById('detail-list');
  if(listBtn) listBtn.addEventListener('click', ()=>{ listBtn.textContent = listBtn.classList.toggle('saved') ? '✓ Saved' : '+ My List'; });
}

function renderMirrorLinks(item){
  const mirrorLinks = [
    { name: 'CLOUDHUB', url: 'https://hubcloud.cx/drive/8xgmxsqbd4bke81' },
    { name: 'GDFLIX', url: 'https://new3.gdflix.io/file/GAqrPqZMe1IAAJ3' },
    { name: 'KATDRIVE', url: 'https://katdrive.click/file/1785566155' },
    { name: 'SEND', url: 'https://send.cm/u9eji9u1hh0s' }
  ];

  return mirrorLinks.map(link => `
    <li>
      <a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.name}</a>
    </li>
  `).join('');
}

function renderDownloadPage(){
  const root = document.getElementById('download-root');
  if(!root) return;
  const item = itemFromUrl() || items[0];
  if(!item){
    root.innerHTML = `<div class="download-page"><div class="download-card"><h1>Movie not found</h1><a href="index.html" class="download-back">Back to home</a></div></div>`;
    return;
  }

  root.innerHTML = `
    <div class="download-page">
      <div class="download-card">
        <a class="download-back" href="${detailsUrl(item)}">← Back to details</a>
        <div class="download-hero" style="background-image:linear-gradient(135deg, rgba(2,6,23,0.85), rgba(2,6,23,0.35)), url('${item.poster}')">
          <div>
            <div class="download-kicker">Ready for download</div>
            <h1>${item.title}</h1>
            <p>${item.year} • ${item.runtime} • ${item.genres.join(' • ')}</p>
          </div>
        </div>

        <div class="download-panel">
          <div class="mirror-box">
            <h3>480p x264 Links [590MB]</h3>
            <ul class="mirror-list">${renderMirrorLinks(item)}</ul>
          </div>
        </div>
      </div>
    </div>`;
}

// Movie-specific download links mapping
const movieLinks = {
  1: { // Spider-Man: Brand New Day
    '480p': {
      id: '480p',
      label: '480p x264',
      size: '590MB',
      accent: 'crimson',
      links: [
        { name: 'CLOUDHUB', url: 'https://hubcloud.cx/drive/qc0ssq0uvz1ot0r' },
        { name: 'GDFLIX', url: 'https://new3.gdflix.io/file/ZFhs3nVDiXioPOd' },
        { name: 'SENDCM', url: 'https://send.now/kjg3n0rfrr72' },
        { name: 'KATDRIVE', url: 'https://katdrive.click/file/1785566217' }
      ]
    },
    '720p-x264': {
      id: '720p-x264',
      label: '720p x264',
      size: '1.47GB',
      accent: 'amber',
      links: [
        { name: 'CLOUDHUB', url: 'https://hubcloud.cx/drive/qc0ssq0uvz1ot0r' },
        { name: 'GDFLIX', url: 'https://new3.gdflix.io/file/ZFhs3nVDiXioPOd' },
        { name: 'SENDCM', url: 'https://send.now/kjg3n0rfrr72' },
        { name: 'KATDRIVE', url: 'https://katdrive.click/file/1785566217' }
      ]
    },
    '720p-hevc': {
      id: '720p-hevc',
      label: '720p HEVC',
      size: '938MB',
      accent: 'cyan',
      links: [
        { name: 'CLOUDHUB', url: 'https://hubcloud.cx/drive/yrzmd6ukiybtztm' },
        { name: 'GDFLIX', url: 'https://new3.gdflix.io/file/m7FbPj1F4G3RrND' },
        { name: 'SENDCM', url: 'https://send.now/0p3g00raenz1' },
        { name: 'KATDRIVE', url: 'https://katdrive.click/file/1785566166' }
      ]
    },
    '1080p': {
      id: '1080p',
      label: '1080p x264',
      size: '2.9GB',
      accent: 'violet',
      links: [
        { name: 'CLOUDHUB', url: 'https://hubcloud.cx/drive/rztsvltfmmtl5yp' },
        { name: 'GDFLIX', url: 'https://new3.gdflix.io/file/PwlViPqG5LK65Je' },
        { name: 'SENDCM', url: 'https://send.now/zji2vb3iqs9r' },
        { name: 'KATDRIVE', url: 'https://katdrive.click/file/1785566319' }
      ]
    },
    '1080p-10bit': {
      id: '1080p-10bit',
      label: '1080p 10bit',
      size: '1.9GB',
      accent: 'pink',
      links: [
        { name: 'CLOUDHUB', url: 'https://hubcloud.cx/drive/j1mzmsxxzhh6xcz' },
        { name: 'GDFLIX', url: 'https://new3.gdflix.io/file/thbdJsqKdPZzBWx' },
        { name: 'SENDCM', url: 'https://send.now/brc8gm1knt0k' },
        { name: 'KATDRIVE', url: 'https://katdrive.click/file/1785566194' }
      ]
    }
  },
  2: { // Awarapan 2
    '480p': {
      id: '480p',
      label: '480p DL',
      size: 'Full HD',
      accent: 'crimson',
      links: [
        { name: 'BBUpload', url: 'https://download.bbupload.to/download?v=ZCT91SVB' },
        { name: 'GoFILE', url: 'https://gofile.io/d/4o7RkV11' }
      ]
    },
    '720p': {
      id: '720p',
      label: '720p DL',
      size: 'HD',
      accent: 'amber',
      links: [
        { name: 'BBUpload', url: 'https://download.bbupload.to/download?v=FEZ2J5VI' },
        { name: 'GoFILE', url: 'https://gofile.io/d/m1jKZbM3' }
      ]
    },
    '1080p': {
      id: '1080p',
      label: '1080p DL',
      size: 'Full HD',
      accent: 'violet',
      links: [
        { name: 'BBUpload', url: 'https://download.bbupload.to/download?v=M19B7QFX' },
        { name: 'GoFILE', url: 'https://gofile.io/d/d3V4XzH3' }
      ]
    }
  },
  3: { // To the Max
    '480p': {
      id: '480p',
      label: '480p Links',
      size: '525MB',
      accent: 'crimson',
      links: [
        { name: 'CLOUDHUB', url: 'https://hubcloud.cx/drive/9fnx9wmcicsc5k0' },
        { name: 'GDFLIX', url: 'https://new3.gdflix.io/file/c4tugCchQcBssmP' },
        { name: 'KATDRIVE', url: 'https://katdrive.click/file/1786695389' },
        { name: 'SENDCM', url: 'https://send.now/8q8zlc4i2th2' }
      ]
    },
    '720p': {
      id: '720p',
      label: '720p Links',
      size: '1.3GB',
      accent: 'amber',
      links: [
        { name: 'HubCloud', url: 'https://hubcloud.cx/drive/t8ftfg4ytm7mdlk' },
        { name: 'KatDrive', url: 'https://katdrive.click/file/1786696759' },
        { name: 'Send.Now', url: 'https://send.now/3mfo63nuy95b' },
        { name: 'GDFlix', url: 'https://new3.gdflix.io/file/NBnQCYC3PTFgtpH' }
      ]
    },
    '1080p-10bit': {
      id: '1080p-10bit',
      label: '1080p 10bit 5.1',
      size: '2.1GB',
      accent: 'pink',
      links: [
        { name: 'HubCloud', url: 'https://hubcloud.cx/drive/mwf6ftt3a2rvf2t' },
        { name: 'GDFlix', url: 'https://new3.gdflix.io/file/JDtEFlN8kzhRdKy' },
        { name: 'KatDrive', url: 'https://katdrive.click/file/1786695470' },
        { name: 'Send.Now', url: 'https://send.now/dj319st0sthw' }
      ]
    }
  },
  4: { // My Best Friend, His Girlfriend and Me
    '2160p': {
      id: '2160p',
      label: '2160p HDR/DV DD5.1',
      size: '8.7GB',
      accent: 'cyan',
      links: [
        { name: 'GDFlix', url: 'https://new3.gdflix.io/file/9uO3ZyDn43yWq3q' }
      ]
    },
    '2160p-sdr': {
      id: '2160p-sdr',
      label: '2160p SDR DD5.1',
      size: '12GB',
      accent: 'violet',
      links: [
        { name: 'GDFlix', url: 'https://gdflix.dev/file/541JMPzMg5QDMLi' }
      ]
    },
    '1080p': {
      id: '1080p',
      label: '1080p x264 DD5.1',
      size: '4.7GB',
      accent: 'pink',
      links: [
        { name: 'GDFlix', url: 'https://gdflix.dev/file/BqyU3zRIesckbwE' }
      ]
    },
    '480p': {
      id: '480p',
      label: '480p Links',
      size: '400MB',
      accent: 'crimson',
      links: [
        { name: 'HubCloud', url: 'https://hubcloud.cx/drive/x1i1xbe9fxvxkxr' },
        { name: 'GDFlix', url: 'https://new3.gdflix.io/file/HOJQ7BSahHBSnKU' },
        { name: 'KatDrive', url: 'https://katdrive.click/file/1786694473' },
        { name: 'Send.Now', url: 'https://send.now/a4xwqexx2lki' }
      ]
    },
    '720p': {
      id: '720p',
      label: '720p Links',
      size: '970MB',
      accent: 'amber',
      links: [
        { name: 'HubCloud', url: 'https://hubcloud.cx/drive/10ydz97wdwnswu7' },
        { name: 'GDFlix', url: 'https://new3.gdflix.io/file/xdkUt0xRXLlybQD' },
        { name: 'KatDrive', url: 'https://katdrive.click/file/1786695985' },
        { name: 'Send.Now', url: 'https://send.now/064sdne0z6gq' }
      ]
    },
    '1080p-10bit': {
      id: '1080p-10bit',
      label: '1080p 10bit 5.1',
      size: '1.55GB',
      accent: 'cyan',
      links: [
        { name: 'HubCloud', url: 'https://hubcloud.cx/drive/ocaodndqozeoeon' },
        { name: 'GDFlix', url: 'https://new3.gdflix.io/file/JBdjQ8bwJ7YmIS1' },
        { name: 'KatDrive', url: 'https://katdrive.click/file/1786694528' },
        { name: 'Send.Now', url: 'https://send.now/vpo9wrq12kf2' }
      ]
    }
  },
  5: { // Don't Say Good Luck
    '480p': {
      id: '480p',
      label: '480p Links',
      size: '300MB',
      accent: 'crimson',
      links: [
        { name: 'HubCloud', url: 'https://hubcloud.cx/drive/veevogea98vtgut' },
        { name: 'GDFlix', url: 'https://new3.gdflix.io/file/jh9xxJRrGM4G8A1' },
        { name: 'KatDrive', url: 'https://katdrive.click/file/1786693686' },
        { name: 'Send.Now', url: 'https://send.now/wy8sbw611644' }
      ]
    },
    '720p': {
      id: '720p',
      label: '720p Links',
      size: '960MB',
      accent: 'amber',
      links: [
        { name: 'Send.cm', url: 'https://send.cm/3bm3uzq3ih4j' },
        { name: 'HubCloud', url: 'https://hubcloud.cx/drive/lofu9lrusxrng9e' },
        { name: 'GDFlix', url: 'https://new3.gdflix.io/file/GgB6oy18jsFBbA2' },
        { name: 'KatDrive', url: 'https://katdrive.click/file/3573392640' }
      ]
    },
    '1080p-10bit': {
      id: '1080p-10bit',
      label: '1080p 10bit 5.1',
      size: '1.46GB',
      accent: 'cyan',
      links: [
        { name: 'Send.Now', url: 'https://send.now/6jcdvl9m463t' },
        { name: 'HubCloud', url: 'https://hubcloud.cx/drive/ijkibm4940w9r7n' },
        { name: 'GDFlix', url: 'https://new3.gdflix.io/file/ldfnno7IyTvCDtm' },
        { name: 'KatDrive', url: 'https://katdrive.click/file/1786693733' }
      ]
    },
    '1080p': {
      id: '1080p',
      label: '1080p x264 DD5.1',
      size: '5.5GB',
      accent: 'pink',
      links: [
        { name: 'GDFlix', url: 'https://gdflix.dev/file/NOlCo2J3uX59JWb' }
      ]
    },
    '2160p-sdr': {
      id: '2160p-sdr',
      label: '2160p SDR DD5.1',
      size: '11GB',
      accent: 'violet',
      links: [
        { name: 'GDFlix', url: 'https://gdflix.dev/file/9Irq4TvVwJ8Tb23' }
      ]
    },
    '2160p': {
      id: '2160p',
      label: '2160p HDR/DV DD5.1',
      size: '13GB',
      accent: 'cyan',
      links: [
        { name: 'GDFlix', url: 'https://gdflix.dev/file/3zlkohjCHx9Ray8' }
      ]
    }
  },
  6: { // The Snake Girl
    '720p-hevc': {
      id: '720p-hevc',
      label: '720p HEVC',
      size: '530MB',
      accent: 'cyan',
      links: [
        { name: 'HubCloud', url: 'https://hubcloud.cx/drive/mxzhwuqlezdjhh3' },
        { name: 'GDFlix', url: 'https://new3.gdflix.io/file/OshUiVXTbFzO9Vr' },
        { name: 'KatDrive', url: 'https://katdrive.click/file/1786622868' },
        { name: 'Send.Now', url: 'https://send.now/y1uiwlavu9d4' }
      ]
    },
    '1080p-hevc': {
      id: '1080p-hevc',
      label: '1080p HEVC',
      size: '1.7GB',
      accent: 'violet',
      links: [
        { name: 'HubCloud', url: 'https://hubcloud.cx/drive/lerlnneblxqeqhd' },
        { name: 'GDFlix', url: 'https://new3.gdflix.io/file/y7495crr6GoHag3' },
        { name: 'KatDrive', url: 'https://katdrive.click/file/1786622898' },
        { name: 'Send.Now', url: 'https://send.now/4c7veq4ivi1l' }
      ]
    }
  },
  22: { // The End of Oak Street
    '1080p': {
      id: '1080p',
      label: '1080p DL',
      size: 'Full HD',
      accent: 'violet',
      links: [
        { name: 'BBUpload', url: 'https://download.bbupload.to/download?v=RZ5LW416' },
        { name: 'GoFILE', url: 'https://gofile.io/d/ZGmbG3Q8' }
      ]
    },
    '720p': {
      id: '720p',
      label: '720p DL',
      size: 'HD',
      accent: 'amber',
      links: [
        { name: 'BBUpload', url: 'https://download.bbupload.to/download?v=1QC6ZE4W' },
        { name: 'GoFILE', url: 'https://gofile.io/d/tQXt8qmG' }
      ]
    },
    '480p': {
      id: '480p',
      label: '480p DL',
      size: 'SD',
      accent: 'crimson',
      links: [
        { name: 'BBUpload', url: 'https://download.bbupload.to/download?v=S7LKURTW' },
        { name: 'GoFILE', url: 'https://gofile.io/d/573KzHvh' }
      ]
    }
  },
  23: { // Komodo (1999)
    '480p': {
      id: '480p',
      label: '480p x264',
      size: '319MB',
      accent: 'crimson',
      links: [
        { name: 'HubCloud', url: 'https://hubcloud.cx/drive/1kwxkuctz381tun' },
        { name: 'KatDrive', url: 'https://katdrive.click/file/1786808266' },
        { name: 'Send.Now', url: 'https://send.now/zly0ib33x44n' }
      ]
    },
    '720p': {
      id: '720p',
      label: '720p x264',
      size: '763MB',
      accent: 'amber',
      links: [
        { name: 'HubCloud', url: 'https://hubcloud.cx/drive/4ie4ilbefeiedxj' },
        { name: 'KatDrive', url: 'https://katdrive.click/file/1786814370' },
        { name: 'Send.Now', url: 'https://send.now/xlkjgnlfhlhx' }
      ]
    },
    '1080p': {
      id: '1080p',
      label: '1080p x264',
      size: '1.57GB',
      accent: 'violet',
      links: [
        { name: 'HubCloud', url: 'https://hubcloud.cx/drive/7kw4d0qcwz5x4zd' },
        { name: 'KatDrive', url: 'https://katdrive.click/file/1786860275' },
        { name: 'Send.Now', url: 'https://send.now/jv4627fwwoq2' },
        { name: 'GDFlix', url: 'https://new3.gdflix.io/file/fVVC7u74jb5YHsc' }
      ]
    },
    '1080p-bluray': {
      id: '1080p-bluray',
      label: '1080p BluRay',
      size: '8.8GB',
      accent: 'pink',
      links: [
        { name: 'GDFlix', url: 'https://new3.gdflix.io/file/lDMpnl5eoVtTE6R' }
      ]
    }
  },
  24: { // Casino Jack (2010)
    '480p': {
      id: '480p',
      label: '480p Links',
      size: '387MB',
      accent: 'crimson',
      links: [
        { name: 'HubCloud', url: 'https://hubcloud.cx/drive/appi7eaa1ngp7pr' },
        { name: 'GDFlix', url: 'https://new3.gdflix.io/file/0izkjQ5NSMTh8ai' },
        { name: 'KatDrive', url: 'https://katdrive.click/file/1786807158' },
        { name: 'Send.Now', url: 'https://send.now/ilyjgvvd9c5z' }
      ]
    },
    '720p': {
      id: '720p',
      label: '720p Links',
      size: '885MB',
      accent: 'amber',
      links: [
        { name: 'Send.Now', url: 'https://send.now/ivg4681h0c2f' },
        { name: 'HubCloud', url: 'https://hubcloud.cx/drive/poulauiol8g1ykp' },
        { name: 'GDFlix', url: 'https://new3.gdflix.io/file/VOW43h3mjx9q3uj' },
        { name: 'KatDrive', url: 'https://katdrive.click/file/1786807170' }
      ]
    },
    '1080p': {
      id: '1080p',
      label: '1080p Links',
      size: '1.82GB',
      accent: 'violet',
      links: [
        { name: 'Send.cm', url: 'https://send.cm/2931kmuexzfd' },
        { name: 'HubCloud', url: 'https://hubcloud.cx/drive/zaqnqiqdq1zp6yq' },
        { name: 'GDFlix', url: 'https://new3.gdflix.io/file/UBqx45zHj8KZznc' },
        { name: 'KatDrive', url: 'https://katdrive.click/file/1786807186' }
      ]
    }
  },
  25: { // Spooky in Love (2026)
  }
};

function render480pPage(){
  const root = document.getElementById('download-root');
  if(!root) return;
  const item = itemFromUrl() || items[0];
  const id = item.id;
  if(!item){
    root.innerHTML = `<div class="download-page"><div class="download-card"><h1>Movie not found</h1><a href="index.html" class="download-back">Back to home</a></div></div>`;
    return;
  }

  // Check if movie has download links available
  if (!movieLinks[id]) {
    root.innerHTML = `
      <div class="download-page">
        <div class="download-card premium-card">
          <a class="download-back" href="${detailsUrl(item)}">← Back to details</a>
          <div class="download-hero" style="background-image:linear-gradient(135deg, rgba(2,6,23,0.85), rgba(2,6,23,0.35)), url('${item.poster}')">
            <div>
              <div class="download-kicker">Download Center</div>
              <h1>${item.title}</h1>
              <p>${item.year} • ${item.runtime} • ${item.genres.join(' • ')}</p>
            </div>
          </div>
          <div class="download-panel" style="text-align:center; padding:40px 20px; color:#9fb0c9;">
            <p style="font-size:16px;">📥 Downloads coming soon for this title</p>
          </div>
        </div>
      </div>`;
    return;
  }

  const qualitySections = Object.values(movieLinks[id]);
  
  // Group sections by episode
  const episodeGroups = {};
  qualitySections.forEach(section => {
    const match = section.id.match(/^(E\d+)/);
    const episodeId = match ? match[1] : 'default';
    if (!episodeGroups[episodeId]) {
      episodeGroups[episodeId] = [];
    }
    episodeGroups[episodeId].push(section);
  });

  // Create HTML organized by episode
  let tabsHtml = '';
  let panelHtml = '';
  let tabIndex = 0;
  
  Object.keys(episodeGroups).sort().forEach(episodeId => {
    const sections = episodeGroups[episodeId];
    
    // Add section heading for episode
    if (episodeId !== 'default') {
      panelHtml += `<div style="margin-top: 30px; padding-top: 30px; border-top: 2px solid rgba(159, 176, 201, 0.2);"><h2 style="margin: 20px 0; color: #e0d9ff; font-size: 20px;">${episodeId.toUpperCase()}</h2>`;
    }
    
    sections.forEach((section, index) => {
      const isActive = tabIndex === 0;
      tabsHtml += `<button class="quality-tab quality-${section.accent} ${isActive ? 'active' : ''}" data-quality="${section.id}">
        ${section.label.split(' - ')[1]} <span>${section.size}</span>
      </button>`;
      
      panelHtml += `<div class="mirror-box quality-${section.accent} ${isActive ? 'active' : ''}" data-box="${section.id}">
        <div class="mirror-box-header">
          <h3>${section.label} Links [${section.size}]</h3>
          <button class="copy-section-btn" data-copy-section="${section.id}">Copy all</button>
        </div>
        <ul class="mirror-list">${section.links.map(link => `
          <li class="mirror-item">
            <a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.name}</a>
            <button class="copy-link-btn" data-copy-link="${link.url}" aria-label="Copy ${link.name} link">Copy</button>
          </li>
        `).join('')}</ul>
      </div>`;
      
      tabIndex++;
    });
    
    if (episodeId !== 'default') {
      panelHtml += `</div>`;
    }
  });

  root.innerHTML = `
    <div class="download-page">
      <div class="download-card premium-card">
        <a class="download-back" href="${detailsUrl(item)}">← Back to details</a>
        <div class="download-hero" style="background-image:linear-gradient(135deg, rgba(2,6,23,0.85), rgba(2,6,23,0.35)), url('${item.poster}')">
          <div>
            <div class="download-kicker">Download Center</div>
            <h1>${item.title}</h1>
            <p>${item.year} • ${item.runtime} • ${item.genres.join(' • ')}</p>
          </div>
        </div>

        <div class="download-panel">
          <div class="download-quality-switcher">${tabsHtml}</div>
          ${panelHtml}
        </div>
      </div>
    </div>`;

  document.querySelectorAll('.quality-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.quality;
      document.querySelectorAll('.quality-tab').forEach(btn => btn.classList.toggle('active', btn === tab));
      document.querySelectorAll('.mirror-box').forEach(box => {
        box.classList.toggle('active', box.dataset.box === target);
      });
    });
  });

  const copyLinkButtons = document.querySelectorAll('.copy-link-btn');
  copyLinkButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const link = button.dataset.copyLink;
      try {
        await navigator.clipboard.writeText(link);
        const original = button.textContent;
        button.textContent = 'Copied';
        setTimeout(() => { button.textContent = original; }, 1200);
      } catch (error) {
        button.textContent = 'Failed';
        setTimeout(() => { button.textContent = 'Copy'; }, 1200);
      }
    });
  });

  const copySectionButtons = document.querySelectorAll('.copy-section-btn');
  copySectionButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const quality = button.dataset.copySection;
      const box = document.querySelector(`.mirror-box[data-box="${quality}"]`);
      const urls = Array.from(box.querySelectorAll('.copy-link-btn')).map(btn => btn.dataset.copyLink).join('\n');
      try {
        await navigator.clipboard.writeText(urls);
        const original = button.textContent;
        button.textContent = 'Copied';
        setTimeout(() => { button.textContent = original; }, 1200);
      } catch (error) {
        button.textContent = 'Failed';
        setTimeout(() => { button.textContent = 'Copy all'; }, 1200);
      }
    });
  });
}

document.addEventListener('contextmenu', (event) => {
  if (event.target && (event.target.closest('a') || event.target.closest('button'))) {
    event.preventDefault();
  }
});

document.addEventListener('copy', (event) => {
  event.preventDefault();
});

document.addEventListener('cut', (event) => {
  event.preventDefault();
});

document.addEventListener('keydown', (event) => {
  const isCopyCombo = (event.ctrlKey || event.metaKey) && (event.key.toLowerCase() === 'c' || event.key.toLowerCase() === 'x');
  if (isCopyCombo) {
    event.preventDefault();
  }
});

document.addEventListener('dragstart', (event) => {
  if (event.target && (event.target.closest('a') || event.target.closest('button'))) {
    event.preventDefault();
  }
});

// run details renderer if present
if(document.getElementById('details-root')) renderDetails();
if(document.getElementById('download-root')){
  const params = new URLSearchParams(location.search);
  if (window.location.pathname.endsWith('480p.html')) {
    render480pPage();
  } else {
    renderDownloadPage();
  }
}
