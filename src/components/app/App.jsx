import { useEffect, useState } from 'react'

import FilmCardsList from '../film_cards_list/FilmCardsList.jsx'

export default function App({ moviesService }) {
  const [movies, setMovies] = useState([])
  const [searchQuery, setSearchQuery] = useState('Jack+Reach') // eslint-disable-line no-unused-vars

  async function updateMovies() {
    const updatedMovies = await moviesService.moviesBySearchQuery(searchQuery)
    setMovies(updatedMovies)
  }

  useEffect(() => {
    updateMovies()
  }, [])

  return <FilmCardsList movies={movies} />
}
