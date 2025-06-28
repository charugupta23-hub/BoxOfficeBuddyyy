import React from 'react'

const HomePage = () => {
  return (
    <>
    <div className='w-full min-h-screen bg-red-200'>
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-400 white px-4">
    <h1 className="text-5xl font-extrabold text-red-500 mb-4">🎬 CineBookers</h1>
    <p className="text-2xl mb-80 text-gray-600 text-center max-w-md">
      Book your favorite movie seats instantly. Browse shows, pick your seats, and enjoy the big screen.
    </p>
    <button className="bg-red-600 hover:bg-red-700 transition-colors text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md">
      Book Tickets
    </button>
  </div>
  </div>
  </>
  )
}

export default HomePage
