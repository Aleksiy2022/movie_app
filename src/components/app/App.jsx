import { useCallback, useEffect, useState } from 'react'
import { ConfigProvider, Flex, Tabs } from 'antd'
import _debounce from 'lodash/debounce'

import './app.css'

import SearchedMoviesPage from '../searced_movies_page/SearchedMoviesPage.jsx'
import RatedMoviesPage from '../rated_movies_page/RatedMoviesPage.jsx'

import { components, tokens } from './globalAndComponentsTokens.js'

export default function App({ moviesService }) {
  const [session, setSession] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchPage, setSearchPage] = useState(Number(1))
  const [searchedMovies, setSearchedMovies] = useState([])
  const [totalSearchedMovies, setTotalSearchedMovies] = useState(0)
  const [ratedPage, setRatedPage] = useState(1)
  const [totalRatedMovies, setTotalRatedMovies] = useState(0)
  const [ratedMovies, setRatedMovies] = useState([])
  const [moviesIdWithRating, setMoviesIdWithRating] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorStatus, setErrorStatus] = useState(false)
  const [errorInfo, setErrorInfo] = useState(null)
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [isMobile, setIsMobile] = useState(false)
  const [genres, setGenres] = useState([])

  const updateSearchedMoviesDebounce = useCallback(_debounce(updateSearchedMovies, 1000), [])

  useEffect(() => {
    moviesService.getGuestSession().then((sessionData) => {
      setSession(sessionData)
    })
    if (window.matchMedia('(max-width: 500px').matches) {
      setIsMobile(true)
    }
    moviesService.getMovieGenres().then((movieGenres) => {
      setGenres(movieGenres)
    })
  }, [])

  useEffect(() => {
    if (session) {
      updatesRatedMovies(session.guest_session_id, ratedPage)
    }
  }, [session, ratedPage])

  useEffect(() => {
    updateSearchedMoviesDebounce(searchQuery, searchPage)
    console.log(genres)
  }, [searchQuery, searchPage])

  useEffect(() => {
    if (session) {
      updateMoviesIdWithRating()
    }
  }, [totalRatedMovies])

  function updateMoviesIdWithRating() {
    moviesService
      .getMoviesIdWithRating(session.guest_session_id, Math.ceil(totalRatedMovies / 20))
      .then((newRatings) => setMoviesIdWithRating(newRatings))
  }

  function onSearchedMovies(movies) {
    setLoading(false)
    setSearchedMovies(movies.movies)
    setTotalSearchedMovies(movies.totalMovies)
  }

  function onRatedMovies(movies) {
    setLoading(false)
    setRatedMovies(movies.movies)
    setTotalRatedMovies(movies.totalMovies)
  }

  function onError(err) {
    setLoading(false)
    setErrorStatus(true)
    setErrorInfo(err)
  }

  function onSearch(evt) {
    const pageNumber = Number(1)
    setSearchPage(pageNumber)
    setSearchQuery(evt.target.value)
  }

  function handleChangePage(page) {
    setSearchPage(page)
  }

  function handleRatedPage(page) {
    setRatedPage(page)
  }

  function handleChangeRating(movieId, value) {
    moviesService.addMovieRating(movieId, session.guest_session_id, value)
    setMoviesIdWithRating((currentData) =>
      currentData.map((movie) => {
        if (movie.id === movieId) {
          return { ...movie, rating: value }
        }
        return movie
      })
    )
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

  async function updatesRatedMovies(sessionId, page) {
    setLoading(true)
    setIsOnline(navigator.onLine)
    try {
      const ratedMovies = await moviesService.getRatedMovies(sessionId, page)
      if (!ratedMovies) return
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
          totalMovies={totalSearchedMovies}
          searchQuery={searchQuery}
          searchPage={searchPage}
          handleChangePage={handleChangePage}
          loading={loading}
          isOnline={isOnline}
          errorStatus={errorStatus}
          errorInfo={errorInfo}
          onSearch={onSearch}
          isMobile={isMobile}
          totalSearchedMovies={totalSearchedMovies}
          moviesIdWithRating={moviesIdWithRating}
          handleChangeRating={handleChangeRating}
        />
      ),
    },
    {
      key: '2',
      label: 'Rated',
      children: (
        <RatedMoviesPage
          movies={ratedMovies}
          totalMovies={totalRatedMovies}
          ratedPage={ratedPage}
          handleRatedPage={handleRatedPage}
          loading={loading}
          isOnline={isOnline}
          errorStatus={errorStatus}
          errorInfo={errorInfo}
          moviesIdWithRating={moviesIdWithRating}
          handleChangeRating={handleChangeRating}
        />
      ),
    },
  ]

  return (
    <ConfigProvider theme={{ token: tokens, components: components }}>
      <Flex vertical className={'page'}>
        <Tabs defaultActiveKey="1" items={tabItems} centered destroyInactiveTabPane />
      </Flex>
    </ConfigProvider>
  )
}
