import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const apiKey = "ed873195cfc6a8c79e8829f4afb165dd"; // TMDB API

const MovieDetail = ({ movie, setMovie,setBookedMovie ,setBookedMoviePoster}) => {
  const { id } = useParams(); // This is TMDB movie ID
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // For error handling

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`);
        const data = await res.json();

        // Check for error in response
        if (data.status_code) {
          setError(data.status_message);
        } else {
          setMovie(data); 
          setBookedMovie(data.title)
          setBookedMoviePoster(data.poster_path)

          // Update the parent component's state
          
        }
      } catch (err) {
        console.error("Error fetching movie:", err);
        setError("Failed to fetch movie data.");
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [id, setMovie]); // Add `setMovie` to dependencies to avoid stale closures

  if (loading) return <div className="text-center text-xl p-4">Loading movie details...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!movie) return <div className="text-center p-4 text-red-500">Movie not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/300x450?text=No+Image"}
          alt={movie.title}
          className="w-full md:w-64 rounded"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-500 mb-4">
            {movie.release_date?.split("-")[0]} • {movie.genres.map(g => g.name).join(", ")} • {movie.runtime} min
          </p>
          <p className="mb-4">{movie.overview}</p>
          <p><strong>Tagline:</strong> {movie.tagline || "N/A"}</p>
          <p><strong>Rating:</strong> ⭐ {movie.vote_average}</p>

          <button
            onClick={() => navigate(`/book/${id}`)}
            className="mt-4 px-6 py-2 text-2xl bg-red-700 text-white rounded-lg hover:bg-yellow-700 transition"
          >
            Book Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
