import { useCallback, useEffect, useState } from 'react'
import { ConfigProvider, Flex, Tabs, Pagination } from 'antd'
import _debounce from 'lodash/debounce'
import './app.css'

import SearchedMoviesPage from '../searced_movies_page/SearchedMoviesPage.jsx'
import RatedMoviesPage from '../rated_movies_page/RatedMoviesPage.jsx'

export default function App({ moviesService }) {
  const [session, setSession] = useState({})
  const [movies, setMovies] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [totalMovies, setTotalMovies] = useState(0)
  const [loading, setLoading] = useState(true)
  const [errorStatus, setErrorStatus] = useState(false)
  const [errorInfo, setErrorInfo] = useState(null)
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [isMobile, setIsMobile] = useState(false)

  const updateMoviesDebounce = useCallback(_debounce(updateMovies, 1000), [])

  useEffect(() => {
    updateMovies(searchQuery, page)
  }, [page])

  useEffect(() => {
    if (window.matchMedia('(max-width: 500px').matches) {
      setIsMobile(true)
    }
  }, [])

  useEffect(() => {
    moviesService.getGuestSession().then((sessionData) => {
      setSession(sessionData)
    })
    console.log(session)
  }, [])

  function onMoviesSearched(movies) {
    setLoading(false)
    setMovies(movies.movies)
    setTotalMovies(movies.totalMovies)
  }

  function onError(err) {
    setLoading(false)
    setErrorStatus(true)
    setErrorInfo(err)
  }

  function onSearch(evt) {
    setSearchQuery(evt.target.value)
    updateMoviesDebounce(evt.target.value)
  }

  function handleChangePage(page) {
    setPage(page)
  }

  async function updateMovies(query = '', currentPage = page) {
    setLoading(true)
    setIsOnline(navigator.onLine)
    try {
      const searchedMovies = await moviesService.searchMovies(query, currentPage)
      await onMoviesSearched(searchedMovies)
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
          movies={movies}
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
      // children: <RatedMoviesPage
      //   movies={movies}
      //   loading={loading}
      //   isOnline={isOnline}
      //   errorStatus={errorStatus}
      //   errorInfo={errorInfo} />,
      children: '',
    },
  ]

  return (
    <ConfigProvider
      theme={{
        token: {
          fontSizeHeading3: 20,
          fontWeightStrong: 400,
        },
        components: {
          Rate: {
            starSize: 17,
          },
          Card: {
            bodyPadding: 0,
          },
          Typography: {
            titleMarginBottom: 0,
          },
        },
      }}
    >
      <Flex vertical className={'page'}>
        <Tabs defaultActiveKey="1" items={tabItems} centered />
        <Pagination align="center" сurrent={page} onChange={handleChangePage} total={totalMovies} />
      </Flex>
    </ConfigProvider>
  )
}
