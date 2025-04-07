import { MovieService } from '../../movie_service/movie_service.js'

const moviesService = new MovieService()

function updateMoviesIdWithRating(session, countRatedMovies, setMoviesIdWithRating) {
  moviesService
    .getMoviesIdWithRating(session.guest_session_id, Math.ceil(countRatedMovies / 20))
    .then((newRatings) => setMoviesIdWithRating(newRatings))
}

async function updateSearchedMovies(
  query,
  page,
  setSearchedMovies,
  setCountSearchedMovies,
  setErrorStatus,
  setErrorInfo,
  setLoading
) {
  try {
    const searchedMovies = await moviesService.searchMovies(query, page)
    setSearchedMovies(searchedMovies.movies)
    setCountSearchedMovies(searchedMovies.countMovies)
  } catch (err) {
    setErrorStatus(true)
    setErrorInfo(err)
  }
  setLoading(false)
}

async function updateRatedMovies(
  session,
  page,
  setIsOnline,
  setRatedMovies,
  setCountRatedMovies,
  setErrorStatus,
  setErrorInfo
) {
  setIsOnline(navigator.onLine)
  try {
    const ratedMovies = await moviesService.getRatedMovies(session.guest_session_id, page)
    if (!ratedMovies) return
    setRatedMovies(ratedMovies.movies)
    setCountRatedMovies(ratedMovies.countMovies)
  } catch (err) {
    setErrorStatus(true)
    setErrorInfo(err)
  }
}

export { updateMoviesIdWithRating, updateSearchedMovies, updateRatedMovies }
