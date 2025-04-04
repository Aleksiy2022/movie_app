import { useCallback, useEffect, useState } from 'react'
import { ConfigProvider, Flex, Tabs } from 'antd'
import _debounce from 'lodash/debounce'

import './app.css'

import SearchedMoviesPage from '../searced_movies_page/SearchedMoviesPage.jsx'
import RatedMoviesPage from '../rated_movies_page/RatedMoviesPage.jsx'
import { MovieService } from '../../movie_service/movie_service.js'
import { MovieProvider } from '../movie_context/MovieContext.jsx'

import { updateMoviesIdWithRating, updateSearchedMovies, updateRatedMovies } from './dataUpdaters.js'
import { components, tokens } from './globalAndComponentsTokens.js'
import { handleChangeRating, handleSearch, handleTabClick } from './handlerEvents.js'

export default function App() {
  const moviesService = new MovieService()

  const [session, setSession] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchPage, setSearchPage] = useState(Number(1))
  const [searchedMovies, setSearchedMovies] = useState([])
  const [countSearchedMovies, setCountSearchedMovies] = useState(0)
  const [ratedPage, setRatedPage] = useState(1)
  const [countRatedMovies, setCountRatedMovies] = useState(0)
  const [ratedMovies, setRatedMovies] = useState([])
  const [moviesIdWithRating, setMoviesIdWithRating] = useState([])
  const [loading, setLoading] = useState(false)
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
    if (session) {
      updateRatedMovies(
        session,
        ratedPage,
        setIsOnline,
        setRatedMovies,
        setCountRatedMovies,
        setErrorStatus,
        setErrorInfo
      )
    }
  }, [session, ratedPage])

  useEffect(() => {
    setIsOnline(navigator.onLine)
    setLoading(true)
    updateSearchedMoviesDebounce(
      searchQuery,
      searchPage,
      setSearchedMovies,
      setCountSearchedMovies,
      setErrorStatus,
      setErrorInfo,
      setLoading
    )
  }, [searchQuery, searchPage])

  useEffect(() => {
    if (session) {
      updateMoviesIdWithRating(session, countRatedMovies, setMoviesIdWithRating)
    }
  }, [countRatedMovies])

  const tabItems = [
    {
      key: '1',
      label: 'Search',
      children: (
        <SearchedMoviesPage
          movies={searchedMovies}
          totalMovies={countSearchedMovies}
          searchQuery={searchQuery}
          searchPage={searchPage}
          handleChangePage={(page) => setSearchPage(page)}
          handleChangeRating={(movieId, value) => handleChangeRating(movieId, value, session, setMoviesIdWithRating)}
          loading={loading}
          isOnline={isOnline}
          errorStatus={errorStatus}
          errorInfo={errorInfo}
          onSearch={(evt) => handleSearch(evt, setSearchPage, setSearchQuery)}
          isMobile={isMobile}
          totalSearchedMovies={countSearchedMovies}
          moviesIdWithRating={moviesIdWithRating}
        />
      ),
    },
    {
      key: '2',
      label: 'Rated',
      children: (
        <RatedMoviesPage
          movies={ratedMovies}
          totalMovies={countRatedMovies}
          ratedPage={ratedPage}
          handleRatedPage={(page) => setRatedPage(page)}
          handleChangeRating={(movieId, value) => handleChangeRating(movieId, value, session, setMoviesIdWithRating)}
          loading={loading}
          isOnline={isOnline}
          errorStatus={errorStatus}
          errorInfo={errorInfo}
          isMobile={isMobile}
          moviesIdWithRating={moviesIdWithRating}
        />
      ),
    },
  ]

  return (
    <ConfigProvider theme={{ token: tokens, components: components }}>
      <Flex vertical className={'page'}>
        <MovieProvider>
          <Tabs
            defaultActiveKey="1"
            items={tabItems}
            centered
            destroyInactiveTabPane
            onTabClick={(key) =>
              handleTabClick(
                key,
                session,
                ratedPage,
                setIsOnline,
                setRatedMovies,
                setCountRatedMovies,
                setErrorStatus,
                setErrorInfo
              )
            }
          />
        </MovieProvider>
      </Flex>
    </ConfigProvider>
  )
}
