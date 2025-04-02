import { format } from 'date-fns'

import { trimText } from './utils.js'

class MovieService {
  token =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkN2RhODRhZjU2MDZlNGRjN2M0ZTJmMzRjYzY2NTE1MyIsIm5iZiI6MTc0MjY2NDU4MS4wMDE5OTk5LCJzdWIiOiI2N2RlZjM4NGI4ZTBmZWE5MzQwN2FiMTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.lyU0KV-d7Gcj5vatYoa5v0m6GZp5qmS5Fxl2ZefUK84'
  typeAuth = 'Bearer'
  baseUrl = 'https://api.themoviedb.org/3/'
  baseImageUrl = 'https://image.tmdb.org/t/p/w500/'
  maxTitleLength = 22
  maxOverviewLength = 180

  async getGuestSession() {
    const session = JSON.parse(localStorage.getItem('TMDBGuestSession'))
    if (!session || new Date(session.expires_at) < new Date()) {
      return await this.createGuestSession()
    }
    return session
  }

  async createGuestSession() {
    try {
      const response = await fetch(`${this.baseUrl}authentication/guest_session/new`, {
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
        totalMovies: data.total_results,
        movies: data.results.map(this._transformSearchMovies.bind(this)),
      }
    } catch (err) {
      throw new Error(`Could not fetch movies. Error ${err.name}, message: ${err.message}`)
    }
  }

  _transformSearchMovies(movie) {
    const { poster_path, title, release_date, overview } = movie
    const trimmedTitle = trimText(title, this.maxTitleLength)
    const formattedReleaseDate = release_date ? format(release_date, 'MMM d, yyyy') : 'unknown'
    const trimmedOverview = trimText(overview, this.maxOverviewLength)

    return {
      realPosterPath: `${this.baseImageUrl}${poster_path}`,
      trimmedTitle: trimmedTitle,
      genres: ['Drama', 'Action'],
      formattedReleaseDate: formattedReleaseDate,
      trimmedOverview: trimmedOverview,
    }
  }
}

export { MovieService }
