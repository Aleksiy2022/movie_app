import { Flex } from 'antd'

import SpinLoader from '../spin_loader/SpinLoader.jsx'
import FilmCardsList from '../film_cards_list/FilmCardsList.jsx'
import ErrorIndicator from '../error_indicator/ErrorIndicator.jsx'

export default function RatedMoviesPage({ movies, loading, isOnline, errorStatus, errorInfo }) {
  const spinner = loading && isOnline ? <SpinLoader /> : null
  const content = !(loading || errorStatus || !isOnline) ? <FilmCardsList movies={movies} /> : null
  const error = errorStatus || !isOnline ? <ErrorIndicator error={errorInfo} isOnline={isOnline} /> : null

  return (
    <Flex gap={34} vertical>
      {spinner}
      {content}
      {error}
    </Flex>
  )
}
