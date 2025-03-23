import { List } from 'antd'

import FilmCard from '../film_card/FilmCard.jsx'

import { listGridStyle, listStyle, listItemStyle } from './filmCardListStyle.js'
export default function FilmCardsList({ movies }) {
  return (
    <List
      style={listStyle}
      grid={listGridStyle}
      dataSource={movies}
      renderItem={(movie) => (
        <List.Item style={listItemStyle}>
          <FilmCard movie={movie} />
        </List.Item>
      )}
    />
  )
}
