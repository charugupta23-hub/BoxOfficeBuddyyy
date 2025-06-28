import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MovieCard from './components/MovieCard'
import MovieDetail from './pages/MovieDetail'
import BookingWrapper from './pages/BookingWrapper'
import WelcomePage from './pages/WelcomePage'
import Confirmation from './pages/Confirmation'

function App() {
  // Lifting state up
  const [bookedMovie,setBookedMovie]=useState(null)
  const [bookedMoviePoster,setBookedMoviePoster]=useState(null)
  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([{}]);
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <>
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/movie/:id' element={<MovieDetail bookedMoviePoster={bookedMoviePoster} setBookedMoviePoster={setBookedMoviePoster} movie={movie} setMovie={setMovie} setBookedMovie={setBookedMovie} />} />
        <Route 
          path="/book/:movieId" 
          element={
            <BookingWrapper 
              totalPrice={totalPrice} 
              setTotalPrice={setTotalPrice} 
              selectedSeats={selectedSeats} 
              setSelectedSeats={setSelectedSeats} 
              bookedMovie={bookedMovie}
              setBookedMovie={setBookedMovie}
            />
          } 
        />
        <Route 
          path="/book/:movieId/confirmation" 
          element={
            <Confirmation 
              bookedMovie={bookedMovie}
              totalPrice={totalPrice} 
              setTotalPrice={setTotalPrice} 
              selectedSeats={selectedSeats} 
              setSelectedSeats={setSelectedSeats} 
              bookedMoviePoster={bookedMoviePoster}
            />
          } 
        />
      </Routes>
    </>
  )
}

export default App
