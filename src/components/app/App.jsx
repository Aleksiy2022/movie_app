import { useEffect, useState, Fragment } from 'react'

import SpinLoader from '../spin_loader/SpinLoader.jsx'
import FilmCardsList from '../film_cards_list/FilmCardsList.jsx'
import ErrorIndicator from '../error_indicator/ErrorIndicator.jsx'

export default function App({ moviesService }) {
  const [movies, setMovies] = useState([])
  const [searchQuery, setSearchQuery] = useState('Titanic') // eslint-disable-line no-unused-vars
  const [loading, setLoading] = useState(true)
  const [errorStatus, setErrorStatus] = useState(false)
  const [errorInfo, setErrorInfo] = useState(null)

  async function onMoviesSearched(movies) {
    setLoading(false)
    setMovies(movies)
  }

  async function onError(err) {
    setLoading(false)
    setErrorStatus(true)
    setErrorInfo(err)
  }

  async function updateMovies() {
    moviesService
      .moviesBySearchQuery(searchQuery)
      .then(onMoviesSearched)
      .catch((err) => onError(err))
  }

  useEffect(() => {
    setLoading(true)
    updateMovies()
  }, [])

  const spinner = loading ? <SpinLoader /> : null
  const content = !(loading || errorStatus) ? <FilmCardsList movies={movies} /> : null
  const error = errorStatus ? <ErrorIndicator error={errorInfo} /> : null

  return (
    <Fragment>
      {spinner}
      {content}
      {error}
    </Fragment>
  )
}
