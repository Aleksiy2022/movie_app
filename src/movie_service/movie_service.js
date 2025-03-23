class MovieService {
  token =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkN2RhODRhZjU2MDZlNGRjN2M0ZTJmMzRjYzY2NTE1MyIsIm5iZiI6MTc0MjY2NDU4MS4wMDE5OTk5LCJzdWIiOiI2N2RlZjM4NGI4ZTBmZWE5MzQwN2FiMTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.lyU0KV-d7Gcj5vatYoa5v0m6GZp5qmS5Fxl2ZefUK84'
  typeAuth = 'Bearer'
  baseSearchUrl = 'https://api.themoviedb.org/3'

  async moviesBySearchQuery(query) {
    const url = `${this.baseSearchUrl}/search/movie?query=${query}`
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `${this.typeAuth} ${this.token}`,
      },
    })
    const data = await res.json()
    return data.results
  }
}

export { MovieService }
