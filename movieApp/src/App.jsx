import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './pages/HomePage'
import { Route,Routes } from 'react-router-dom'
import MovieDetails from './pages/MovieDetails'
import BookingPage from './pages/BookingPage'
import Confirmation from './pages/Confirmation'

function App() {
  

  return (
    <>
     <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/movies' element={<MovieDetails/>}/>
      <Route path='/booking' element={<BookingPage/>}/>
      <Route path='/confirmation' element={<Confirmation/>}/>
     </Routes>
    </>
  )
}

export default App
