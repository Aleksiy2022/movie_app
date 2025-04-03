import { Flex, Input, Pagination } from 'antd'

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
  isMobile,
  searchPage,
  handleChangePage,
  totalSearchedMovies,
  moviesIdWithRating,
  handleChangeRating,
}) {
  const searchInput = <Input value={searchQuery} placeholder="Type to search..." onChange={onSearch} />
  const spinner = loading && isOnline ? <SpinLoader /> : null
  const content = !(loading || errorStatus || !isOnline) ? (
    <FilmCardsList
      movies={movies}
      isMobile={isMobile}
      moviesIdWithRating={moviesIdWithRating}
      handleChangeRating={handleChangeRating}
    />
  ) : null
  const error = errorStatus || !isOnline ? <ErrorIndicator error={errorInfo} isOnline={isOnline} /> : null

  return (
    <>
      <Flex gap={34} vertical>
        {searchInput}
        {spinner}
        {content}
        {error}
      </Flex>
      <Pagination
        current={searchPage}
        align="center"
        showSizeChanger={false}
        onChange={handleChangePage}
        total={totalSearchedMovies}
        pageSize={20}
      />
    </>
  )
}
