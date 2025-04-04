import { createContext, useEffect, useState } from 'react'

import { MovieService } from '../../movie_service/movie_service.js'

const MovieContext = createContext(null)

function MovieProvider({ children }) {
  const moviesService = new MovieService()
  const [genres, setGenres] = useState([])

  useEffect(() => {
    moviesService.getMovieGenres().then((movieGenres) => {
      setGenres(movieGenres)
    })
  }, [])
  return <MovieContext.Provider value={{ genres }}>{children}</MovieContext.Provider>
}

export { MovieContext, MovieProvider }
