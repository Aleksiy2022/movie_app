import { List } from 'antd'

import FilmCard from '../film_card/FilmCard.jsx'

import './film-card-style.css'

export default function FilmCardsList({ movies, isMobile }) {
  return (
    <List
      grid={{
        gutter: 36,
        xs: 1,
        sm: 1,
        md: 1,
        lg: 2,
        xl: 2,
        xxl: 2,
      }}
      dataSource={movies}
      renderItem={(movie) => (
        <List.Item className="list-item">
          <FilmCard movie={movie} isMobile={isMobile} />
        </List.Item>
      )}
    />
  )
}
