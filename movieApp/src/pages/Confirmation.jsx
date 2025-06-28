import React from "react";
import { useNavigate } from "react-router-dom";

const ConfirmationPage = ({ totalPrice, selectedSeats, bookedMovie, bookedMoviePoster }) => {
  const navigate = useNavigate();
  const seatLetter = "ABCDEF";

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-red-600 to-white text-white py-20 px-6">
      <div className="max-w-5xl mx-auto bg-white text-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-12 text-center">
          {/* Heading */}
          <h1 className="text-4xl font-semibold text-red-600 mb-4">
            Booking Confirmed!
          </h1>

          {/* Movie Title */}
          {bookedMovie && (
            <p className="text-3xl  font-semibold mb-2">
              {bookedMovie}
            </p>
          )}

          {/* Poster */}
          {bookedMoviePoster && (
            <img
              src={`https://image.tmdb.org/t/p/w500${bookedMoviePoster}`}
              alt={`${bookedMovie} poster`}
              className="w-64 h-auto mx-auto rounded-lg shadow-lg mt-4"
            />
          )}

          {/* Divider */}
          <div className="border-b-2 border-gray-300 my-6"></div>

          {/* Total Price */}
          <p className="text-xl">
            <span className="font-semibold text-red-600">Your total billing amount:</span>{" "}
            <span className="text-2xl text-black font-semibold">Rs. {totalPrice}</span>
          </p>

          {/* Selected Seats */}
          <div className="mt-6">
            <p className="font-semibold text-lg text-black mb-2">Your Booked Seats:</p>
            <div className="flex justify-center flex-wrap gap-4">
              {selectedSeats.map((seat, index) => (
                <div
                  key={index}
                  className="text-red-600 font-bold bg-gray-200 px-4 py-2 rounded-full shadow"
                >
                  {seatLetter.charAt(seat.row)}
                  {seat.col + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Back to Home Button */}
          <div className="flex justify-center mt-10">
            <button
              onClick={handleBackToHome}
              className="px-6 py-3 bg-red-600 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-red-700 transition duration-300"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
