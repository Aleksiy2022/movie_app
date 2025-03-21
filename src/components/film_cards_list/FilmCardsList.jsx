import { List } from 'antd'

import FilmCard from '../film_card/FilmCard.jsx'
import { listGridStyle, listStyle, listItemStyle } from '../film_card/filmCardStyle.js'

export default function FilmCardsList({ films }) {
  return (
    <List
      style={listStyle}
      grid={listGridStyle}
      dataSource={films}
      renderItem={(film) => (
        <List.Item style={listItemStyle} key={film.id}>
          <FilmCard film={film} />
        </List.Item>
      )}
    />
  )
}
