import { Flex, Pagination } from 'antd'

import SpinLoader from '../spin_loader/SpinLoader.jsx'
import FilmCardsList from '../film_cards_list/FilmCardsList.jsx'
import ErrorIndicator from '../error_indicator/ErrorIndicator.jsx'

export default function RatedMoviesPage({
  movies,
  loading,
  isOnline,
  isMobile,
  errorStatus,
  errorInfo,
  totalMovies,
  ratedPage,
  handleRatedPage,
  moviesIdWithRating,
  handleChangeRating,
}) {
  const spinner = loading && isOnline ? <SpinLoader /> : null
  const content = !(loading || errorStatus || !isOnline) ? (
    <FilmCardsList
      movies={movies}
      moviesIdWithRating={moviesIdWithRating}
      handleChangeRating={handleChangeRating}
      isMobile={isMobile}
    />
  ) : null
  const error = errorStatus || !isOnline ? <ErrorIndicator error={errorInfo} isOnline={isOnline} /> : null
  return (
    <>
      <Flex gap={34} vertical>
        {spinner}
        {content}
        {error}
      </Flex>
      <Pagination
        current={ratedPage}
        align="center"
        showSizeChanger={false}
        onChange={handleRatedPage}
        total={totalMovies}
        pageSize={20}
      />
    </>
  )
}
