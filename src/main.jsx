import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './components/app/App.jsx'
import { MovieService } from './movie_service/movie_service.js'

const moviesService = new MovieService()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App moviesService={moviesService} />
  </StrictMode>
)
