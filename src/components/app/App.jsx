import { useCallback, useEffect, useState } from 'react'
import { ConfigProvider, Flex, Tabs, Pagination } from 'antd'
import _debounce from 'lodash/debounce'

import './app.css'

import SearchedMoviesPage from '../searced_movies_page/SearchedMoviesPage.jsx'
import RatedMoviesPage from '../rated_movies_page/RatedMoviesPage.jsx'

import { tokens, components } from './globalAndComponentsTokens.js'

export default function App({ moviesService }) {
  const [session, setSession] = useState(null)
  const [searchedMovies, setSearchedMovies] = useState([])
  const [ratedMovies, setRatedMovies] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchPage, setSearchPage] = useState(1)
  // const [ratedPage, setRatedPage] = useState(1)
  const [totalMovies, setTotalMovies] = useState(0)
  const [loading, setLoading] = useState(true)
  const [errorStatus, setErrorStatus] = useState(false)
  const [errorInfo, setErrorInfo] = useState(null)
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [isMobile, setIsMobile] = useState(false)

  const updateSearchedMoviesDebounce = useCallback(_debounce(updateSearchedMovies, 1000), [])

  useEffect(() => {
    moviesService.getGuestSession().then((sessionData) => {
      setSession(sessionData)
    })
    if (window.matchMedia('(max-width: 500px').matches) {
      setIsMobile(true)
    }
  }, [])

  useEffect(() => {
    updateSearchedMoviesDebounce(searchQuery, searchPage)
  }, [searchPage])

  useEffect(() => {
    if (session) {
      moviesService.addMovieRating()
      updatesRatedMovies(session.guest_session_id)
    }
  }, [session])

  function onSearchedMovies(movies) {
    setLoading(false)
    setSearchedMovies(movies.movies)
    setTotalMovies(movies.totalMovies)
  }

  function onRatedMovies(movies) {
    setLoading(false)
    setRatedMovies(movies.movies)
  }

  function onError(err) {
    setLoading(false)
    setErrorStatus(true)
    setErrorInfo(err)
  }

  function onSearch(evt) {
    setSearchQuery(evt.target.value)
    updateSearchedMoviesDebounce(evt.target.value)
  }

  function handleChangePage(page) {
    setSearchPage(page)
  }

  async function updateSearchedMovies(query = '', currentPage = searchPage) {
    setLoading(true)
    setIsOnline(navigator.onLine)
    try {
      const searchedMovies = await moviesService.searchMovies(query, currentPage)
      await onSearchedMovies(searchedMovies)
    } catch (err) {
      await onError(err)
    }
  }

  async function updatesRatedMovies(sessionId) {
    setLoading(true)
    setIsOnline(navigator.onLine)
    try {
      const ratedMovies = await moviesService.getRatedMovies(sessionId)
      await onRatedMovies(ratedMovies)
    } catch (err) {
      await onError(err)
    }
  }

  const tabItems = [
    {
      key: '1',
      label: 'Search',
      children: (
        <SearchedMoviesPage
          movies={searchedMovies}
          searchQuery={searchQuery}
          loading={loading}
          isOnline={isOnline}
          errorStatus={errorStatus}
          errorInfo={errorInfo}
          onSearch={onSearch}
          isMobile={isMobile}
        />
      ),
    },
    {
      key: '2',
      label: 'Rated',
      children: (
        <RatedMoviesPage
          movies={ratedMovies}
          loading={loading}
          isOnline={isOnline}
          errorStatus={errorStatus}
          errorInfo={errorInfo}
        />
      ),
    },
  ]

  return (
    <ConfigProvider theme={{ token: tokens, components: components }}>
      <Flex vertical className={'page'}>
        <Tabs defaultActiveKey="1" items={tabItems} centered />
        <Pagination align="center" сurrent={searchPage} onChange={handleChangePage} total={totalMovies} />
      </Flex>
    </ConfigProvider>
  )
}
