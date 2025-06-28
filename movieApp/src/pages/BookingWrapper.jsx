import { useParams } from "react-router-dom";
import Booking from "./Booking";

const BookingWrapper = ({selectedSeats,setSelectedSeats,totalPrice,setTotalPrice,bookedMovie,setBookedMovie}) => {
  const { movieId } = useParams();
  return <Booking movieId={movieId} totalPrice={totalPrice} setTotalPrice={setTotalPrice} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats}/>;
};

export default BookingWrapper;
