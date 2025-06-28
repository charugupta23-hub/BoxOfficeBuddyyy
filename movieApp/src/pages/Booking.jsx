import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Booking = ({selectedSeats,setSelectedSeats,totalPrice,setTotalPrice,bookedMovie,setBookedMovie}) => {
  const { movieId } = useParams();
  const storageKey = movieId;
  
  const navigate = useNavigate();
  
  const rows = 6;
  const cols = 12;
  const SeatLetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const [seats, setSeats] = useState(
    Array.from({ length: rows }, () => Array(cols).fill(false))
  );
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    const storedSeats = JSON.parse(localStorage.getItem(storageKey));
    if (storedSeats) {
      setBookedSeats(storedSeats);
    }
  }, [storageKey]);

  const toggleSeat = (row, col) => {
    const isBooked = bookedSeats.some(seat => seat.row === row && seat.col === col);
    if (isBooked) return;

    const updatedSeats = seats.map((r, rIdx) =>
      r.map((seat, cIdx) =>
        rIdx === row && cIdx === col ? !seat : seat
      )
    );
    setSeats(updatedSeats);
  };

  const handleBookingClick = () => {
    const newSelectedSeats = [];

    seats.forEach((row, rowIdx) => {
    row.forEach((isSelected, colIdx) => {
    if (isSelected) {
      newSelectedSeats.push({ row: rowIdx, col: colIdx });
    }
    });  
    });
    console.log(newSelectedSeats)

    setSelectedSeats(newSelectedSeats);
    


    const updatedBookedSeats = [...bookedSeats, ...newSelectedSeats];
    setBookedSeats(updatedBookedSeats);
    localStorage.setItem(storageKey, JSON.stringify(updatedBookedSeats));

    const resetSeats = seats.map(() => Array(cols).fill(false));
    setSeats(resetSeats);
    let total=0;
    newSelectedSeats.map((seat)=>{
      if(seat.row==0){
        total+=500;
      }
      else if(seat.row>0 && seat.row<3){
        total+=250;
      }
      else{
        total+=150;
      }
    })
    setTotalPrice(total)

    alert(`Your tickets have been booked! please pay ${total}`);
    navigate(`/book/${movieId}/confirmation`)
  };

  const getSectionLabel = (rowIndex) => {
    if (rowIndex < 1) return "Rs. 500 Platinum ";
    if (rowIndex < 3) return "Rs. 250 Gold";
    return "Rs. 150 Silver";
  };

  return (
    <div className="min-h-screen w-screen  px-4 py-10 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-8 text-white-400">Select Your Seats</h1>

      <div className="flex flex-col gap-6 bg-gray-950 p-6 rounded-xl shadow-2xl">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-col items-center">
            {/* Section label */}
            {(rowIndex === 0 || rowIndex === 1 || rowIndex === 3) && (
              <p className="text-lg text-gray-400 italic mb-1 flex flex-start ml">{getSectionLabel(rowIndex)} Section</p>
            )}

            <div className="grid grid-cols-12 gap-2">
              {row.map((isSelected, colIndex) => {
                const seatLabel = `${SeatLetter[rowIndex]}${colIndex + 1}`;
                const isBooked = bookedSeats.some(
                  seat => seat.row === rowIndex && seat.col === colIndex
                );

                return (
                  <button
                    key={seatLabel}
                    onClick={() => toggleSeat(rowIndex, colIndex)}
                    disabled={isBooked}
                    className={`w-10 h-10 flex items-center justify-center rounded-md font-semibold text-sm
                      transition-transform duration-200
                      ${
                        isBooked
                          ? 'bg-gray-600 text-white cursor-not-allowed'
                          : isSelected
                          ? 'bg-red-500 text-white'
                          : 'bg-green-600 text-white'
                      }
                      hover:scale-110`}
                    aria-label={`Seat ${seatLabel}`}
                  >
                    {seatLabel}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Seat Legend */}
      <div className="mt-8 flex gap-6 text-sm text-black-300">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-green-600 rounded-sm"></div> Available
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-red-500 rounded-sm"></div> Selected
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-600 rounded-sm"></div> Sold
        </div>
      </div>

      {/* Book Button */}
      <button
        
        onClick={handleBookingClick}
        className="bg-red-600 rounded-lg px-4 py-2 font-semibold text-white m-4 text-white hover:bg-red-700"

      >
        Book Tickets
      </button>
    </div>
  );
};

export default Booking;
