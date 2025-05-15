const apiKey = 'ed873195cfc6a8c79e8829f4afb165dd'; // TMDB API key
const numMovies = 40;

export async function getNowPlayingMovies() {
  const baseUrl = 'https://api.themoviedb.org/3';
  const movieUrl = `${baseUrl}/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;
  const genreUrl = `${baseUrl}/genre/movie/list?api_key=${apiKey}&language=en-US`;

  try {
    const [movieRes, genreRes] = await Promise.all([fetch(movieUrl), fetch(genreUrl)]);

    if (!movieRes.ok || !genreRes.ok) {
      throw new Error('Failed to fetch movie or genre data.');
    }

    const movieData = await movieRes.json();
    const genreData = await genreRes.json();

    const genreMap = genreData.genres.reduce((map, genre) => {
      map[genre.id] = genre.name;
      return map;
    }, {});

    const movies = movieData.results.slice(0, numMovies).map(movie => ({
      id: movie.id,
      title: movie.title,
      year: movie.release_date?.split('-')[0] || "Unknown",
      poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/300x450?text=No+Image",
      genres: movie.genre_ids.map(id => genreMap[id] || "Unknown")
    }));

    return movies;
  } catch (err) {
    console.error("Error fetching now playing movies:", err.message);
    return [];
  }
}
