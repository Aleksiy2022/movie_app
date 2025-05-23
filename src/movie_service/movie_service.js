import { format } from 'date-fns'

import { trimText } from './utils.js'

class MovieService {
  token =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkN2RhODRhZjU2MDZlNGRjN2M0ZTJmMzRjYzY2NTE1MyIsIm5iZiI6MTc0MjY2NDU4MS4wMDE5OTk5LCJzdWIiOiI2N2RlZjM4NGI4ZTBmZWE5MzQwN2FiMTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.lyU0KV-d7Gcj5vatYoa5v0m6GZp5qmS5Fxl2ZefUK84'
  typeAuth = 'Bearer'
  baseUrl = 'https://api.themoviedb.org/3'
  baseImageUrl = 'https://image.tmdb.org/t/p/w500'
  maxTitleLength = 20
  maxOverviewLength = 180

  async getGuestSession() {
    const session = JSON.parse(localStorage.getItem('TMDBGuestSession'))
    if (!session || new Date(session.expires_at) < new Date()) {
      return await this.createGuestSession()
    }
    return session
  }

  async getMovieGenres() {
    const url = `${this.baseUrl}/genre/movie/list`
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `${this.typeAuth} ${this.token}`,
          Accept: 'application/json',
        },
      })
      const data = await res.json()
      return data.genres
    } catch (err) {
      throw new Error(`Could not get genres. Error ${err.name}, message: ${err.message}`)
    }
  }

  async createGuestSession() {
    try {
      const response = await fetch(`${this.baseUrl}/authentication/guest_session/new`, {
        method: 'POST',
        headers: {
          Authorization: `${this.typeAuth} ${this.token}`,
          Accept: 'application/json',
        },
      })
      const data = await response.json()
      if (data.success) {
        localStorage.setItem(
          'TMDBGuestSession',
          JSON.stringify({
            guest_session_id: data.guest_session_id,
            expires_at: data.expires_at,
          })
        )
        return { guest_session_id: data.guest_session_id, expires_at: data.expires_at }
      }
    } catch (err) {
      throw new Error(`Could not get session data. Error ${err.name}, message: ${err.message}`)
    }
  }

  async searchMovies(query, page) {
    const url = `${this.baseUrl}/search/movie?query=${query}&page=${page}&language=ru-RU`
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `${this.typeAuth} ${this.token}`,
        },
      })
      const data = await res.json()
      return {
        countMovies: data.total_results,
        movies: data.results.map(this._transformSearchMovies.bind(this)),
      }
    } catch (err) {
      throw new Error(`Could not fetch movies. Error ${err.name}, message: ${err.message}`)
    }
  }

  async addMovieRating(movie_id = '129', guest_session_id = '168c7da7c6915241b8ca5ca77fcf0845', rating = 1) {
    const url = `${this.baseUrl}/movie/${movie_id}/rating?guest_session_id=${guest_session_id}`
    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `${this.typeAuth} ${this.token}`,
          'Content-Type': 'application/json;charset=utf-8',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          value: rating,
        }),
      })
    } catch (err) {
      throw new Error(`Could add rating to movie. Error ${err.name}, message: ${err.message}`)
    }
  }

  async getRatedMovies(guest_session_id, page, getRatings = false) {
    const url = `${this.baseUrl}/guest_session/${guest_session_id}/rated/movies?page=${page}`
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `${this.typeAuth} ${this.token}`,
          Accept: 'application/json',
        },
      })
      const data = await res.json()
      if (!res.ok) {
        return
      }
      if (getRatings) {
        return data
      }
      return {
        countMovies: data.total_results,
        movies: data.results.map(this._transformSearchMovies.bind(this)),
      }
    } catch (err) {
      throw new Error(`Could not fetch rated movies. Error ${err.name}, message: ${err.message}`)
    }
  }

  async getMoviesIdWithRating(guest_session_id, totalPage) {
    let movies = []
    for (let page = 1; page < totalPage + 1; page++) {
      const res = await this.getRatedMovies(guest_session_id, page, true)
      const moviesData = res.results.map((movie) => {
        return {
          id: movie.id,
          rating: movie.rating,
        }
      })
      movies = [...movies, ...moviesData]
    }
    return movies
  }

  _transformSearchMovies(movie) {
    const { id, poster_path, title, release_date, overview, vote_average, rating = null, genre_ids } = movie
    const trimmedTitle = trimText(title, this.maxTitleLength)
    const formattedReleaseDate = release_date ? format(release_date, 'MMM d, yyyy') : 'unknown'
    const trimmedOverview = trimText(overview, this.maxOverviewLength)

    return {
      movieId: id,
      realPosterPath: `${this.baseImageUrl}${poster_path}`,
      trimmedTitle: trimmedTitle,
      genreIds: genre_ids,
      formattedReleaseDate: formattedReleaseDate,
      trimmedOverview: trimmedOverview,
      rating: vote_average ? vote_average.toFixed(1) : '0.0',
      myRating: rating,
    }
  }
}

export { MovieService }
