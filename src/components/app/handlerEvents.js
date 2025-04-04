import { MovieService } from '../../movie_service/movie_service.js'

import { updateRatedMovies } from './dataUpdaters.js'

const moviesService = new MovieService()

function handleSearch(evt, setPageFunc, setQueryFunc) {
  setPageFunc(Number(1))
  setQueryFunc(evt.target.value)
}

async function handleChangeRating(movieId, value, session, setMoviesIdWithRating) {
  await moviesService.addMovieRating(movieId, session.guest_session_id, value)
  setMoviesIdWithRating((currentData) =>
    currentData.map((movie) => {
      if (movie.id === movieId) {
        return { ...movie, rating: value }
      }
      return movie
    })
  )
}

async function handleTabClick(
  key,
  session,
  ratedPage,
  setIsOnline,
  setRatedMovies,
  setCountRatedMovies,
  setErrorStatus,
  setErrorInfo
) {
  if (key === '2') {
    await updateRatedMovies(
      session,
      ratedPage,
      setIsOnline,
      setRatedMovies,
      setCountRatedMovies,
      setErrorStatus,
      setErrorInfo
    )
  }
}

export { handleSearch, handleChangeRating, handleTabClick }
