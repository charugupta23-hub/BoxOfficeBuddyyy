import React from "react";

const MovieCard = ({ movie }) => {
  if (!movie) {
    return <div className="text-center text-xl">Loading movie...</div>;
  }

  return (
    <div className="bg-white mb-4 shadow-md rounded-xl overflow-hidden transform hover:scale-105 transition duration-300">
      <img
        src={movie.poster ? movie.poster : "https://via.placeholder.com/300x450?text=No+Image"}
        alt={movie.title}
        className="w-full h-90 object-cover"
      />
      <div className="p-4 flex flex-col justify-center items-center">
        <h3 className="text-2xl font-bold text-gray-600">{movie.title}</h3>
        {/* <p className="text-sm text-gray-600">{movie.Genre}</p>
        <p className="text-sm text-yellow-500">IMDb  {movie.imdbRating}/10</p> */}
      </div>
    </div>
  );
};

export default MovieCard;
