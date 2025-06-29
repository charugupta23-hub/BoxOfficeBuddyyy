import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const apiKey = "ed873195cfc6a8c79e8829f4afb165dd";

const MovieDetail = ({ movie, setMovie, setBookedMovie, setBookedMoviePoster }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`);
        const data = await res.json();

        if (data.status_code) {
          setError(data.status_message);
        } else {
          setMovie(data);
          setBookedMovie(data.title);
          setBookedMoviePoster(data.poster_path);
        }
      } catch (err) {
        console.error("Error fetching movie:", err);
        setError("Failed to fetch movie data.");
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [id, setMovie]);

  if (loading) return <div className="text-center text-xl p-8 text-white">Loading movie details...</div>;
  if (error) return <div className="text-center p-8 text-red-400 font-semibold">{error}</div>;
  if (!movie) return <div className="text-center p-8 text-red-400 font-semibold">Movie not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1c1c1c] to-black px-4 py-12 text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        
        {/* Movie Poster */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/300x450?text=No+Image"}
            alt={movie.title}
            className="rounded-3xl shadow-2xl w-full max-w-xs object-cover"
          />
        </div>

        {/* Movie Details */}
        <div className="w-full md:w-2/3 space-y-6 bg-white/5 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-white/10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            {movie.title}
          </h1>
          <p className="text-gray-400 text-sm">
            {movie.release_date?.split("-")[0]} • {movie.genres.map(g => g.name).join(", ")} • {movie.runtime} min
          </p>

          <p className="text-lg leading-relaxed text-gray-200">
            {movie.overview}
          </p>

          {movie.tagline && (
            <p className="italic text-yellow-400 text-sm">“{movie.tagline}”</p>
          )}

          <div className="flex items-center gap-3">
            <span className="text-white font-semibold">Rating:</span>
            <span className="text-yellow-400 font-bold text-xl">⭐ {movie.vote_average}</span>
          </div>

          <button
            onClick={() => navigate(`/book/${id}`)}
            className="mt-6 bg-red-600 hover:bg-yellow-500 text-white font-semibold text-lg px-8 py-3 rounded-2xl transition duration-300 shadow-lg"
          >
            Book Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
