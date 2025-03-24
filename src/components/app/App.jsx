import { useEffect, useState, Fragment } from 'react'

import SpinLoader from '../spin_loader/SpinLoader.jsx'
import FilmCardsList from '../film_cards_list/FilmCardsList.jsx'

export default function App({ moviesService }) {
  const [movies, setMovies] = useState([])
  const [searchQuery, setSearchQuery] = useState('Reacher') // eslint-disable-line no-unused-vars
  const [loading, setLoading] = useState(true)

  async function updateMovies() {
    const updatedMovies = await moviesService.moviesBySearchQuery(searchQuery)
    setLoading(false)
    setMovies(updatedMovies)
  }

  useEffect(() => {
    setLoading(true)
    updateMovies()
  }, [])

  const spinner = loading ? <SpinLoader /> : null
  const content = !loading ? <FilmCardsList movies={movies} /> : null

  return (
    <Fragment>
      {spinner}
      {content}
    </Fragment>
  )
}
