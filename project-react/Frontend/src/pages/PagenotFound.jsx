import React from 'react'

const PagenotFound = () => {
  return (
    <div>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-blue-400 mt-[-60%]">
      <div className="text-center p-10 bg-white rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300">
          Go to Home
        </Link>
      </div>
      </div>
      
    </div>
  )
}

export default PagenotFound
