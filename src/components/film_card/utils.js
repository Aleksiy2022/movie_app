function getGenreNames(genreIds, genres) {
  return genreIds
    .map((id) => {
      const genre = genres.find((genre) => genre.id === id)
      return genre ? genre.name : null
    })
    .filter((name) => name)
    .slice(0, 3)
}

function getRating(moviesIdWithRating, movieId) {
  return moviesIdWithRating.find((movie) => {
    if (movie.id === movieId) {
      return movie
    }
  })
}

export { getGenreNames, getRating }
