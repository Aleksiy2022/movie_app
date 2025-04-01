import { Flex, Input } from 'antd'

import SpinLoader from '../spin_loader/SpinLoader.jsx'
import FilmCardsList from '../film_cards_list/FilmCardsList.jsx'
import ErrorIndicator from '../error_indicator/ErrorIndicator.jsx'

export default function SearchedMoviesPage({
  movies,
  searchQuery,
  loading,
  isOnline,
  errorStatus,
  errorInfo,
  onSearch,
}) {
  const spinner = loading && isOnline ? <SpinLoader /> : null
  const content = !(loading || errorStatus || !isOnline) ? <FilmCardsList movies={movies} /> : null
  const error = errorStatus || !isOnline ? <ErrorIndicator error={errorInfo} isOnline={isOnline} /> : null
  const searchInput = <Input value={searchQuery} placeholder="Type to search..." onChange={onSearch} />

  return (
    <Flex gap={34} vertical>
      {searchInput}
      {spinner}
      {content}
      {error}
    </Flex>
  )
}
