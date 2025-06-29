import React, { useEffect, useState } from "react";
import { getNowPlayingMovies } from "../api/omdb";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      const data = await getNowPlayingMovies();
      setMovies(data);
      setLoading(false);
    }
    fetchMovies();
  }, []);

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2a2a2a] via-[#121212] to-[#1e1e1e] text-[#e0e0e0] px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-[#e0e0e0]">
          {loading ? "Loading Movies..." : "Now Showing in Cinemas"}
        </h1>

       
        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleMovieClick(movie.id)}
              className="bg-[#2c2c2c] rounded-lg overflow-hidden shadow-md hover:shadow-xl cursor-pointer transition duration-200"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold truncate">{movie.title}</h2>
                <p className="text-sm text-gray-400">{movie.year}</p>
               
                <p className="text-xs text-gray-500 mt-1">
                  {Array.isArray(movie.genres) ? movie.genres.join(", ") : movie.genres}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;