import { useEffect, useState } from 'react'
import { Input, Tabs } from 'antd'

import SpinLoader from '../spin_loader/SpinLoader.jsx'
import FilmCardsList from '../film_cards_list/FilmCardsList.jsx'
import ErrorIndicator from '../error_indicator/ErrorIndicator.jsx'

export default function App({ moviesService }) {
  const [movies, setMovies] = useState([])
  const [searchQuery, setSearchQuery] = useState('Reacher') // eslint-disable-line no-unused-vars
  const [loading, setLoading] = useState(true)
  const [errorStatus, setErrorStatus] = useState(false)
  const [errorInfo, setErrorInfo] = useState(null)
  const [isOnline, setIsOnline] = useState(navigator.onLine)

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
    setIsOnline(navigator.onLine)
    updateMovies()
  }, [])

  const spinner = loading && isOnline ? <SpinLoader /> : null
  const content = !(loading || errorStatus || !isOnline) ? <FilmCardsList movies={movies} /> : null
  const error = errorStatus || !isOnline ? <ErrorIndicator error={errorInfo} isOnline={isOnline} /> : null
  const searchInput = <Input placeholder="Type to search..." onChange={() => {}} />

  const tabItems = [
    {
      key: '1',
      label: 'Search',
      children: searchInput,
    },
    {
      key: '2',
      label: 'Rated',
      children: '',
    },
  ]

  return (
    <main
      style={{
        boxSizing: 'border-box',
        margin: '0 auto',
        padding: '15px 36px',
        maxWidth: '1010px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 34,
      }}
    >
      <Tabs
        defaultActiveKey="1"
        items={tabItems}
        centered
        style={{
          width: '100%',
        }}
      />
      {spinner}
      {content}
      {error}
    </main>
  )
}
