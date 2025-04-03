import { Card, Flex, Typography, Tag, Rate, Image } from 'antd'
import './film-card.css'
import { useState } from 'react'

import { MovieService } from '../../movie_service/movie_service.js'

export default function FilmCard({ movie, isMobile }) {
  const movieService = new MovieService()
  const [value, setValue] = useState(0)
  const { movie_id, realPosterPath, trimmedTitle, formattedReleaseDate, genres, trimmedOverview, rating } = movie

  const genreTagList = genres.map((genre, index) => {
    return <Tag key={index}>{genre}</Tag>
  })

  function handleChange(value) {
    const session = localStorage.getItem('TMDBGuestSession')
    const sessionId = JSON.parse(session).guest_session_id

    movieService.addMovieRating(movie_id, sessionId, value)
    setValue(value)
  }

  if (isMobile) {
    return (
      <Card hoverable className="card-body">
        <Flex justify={'flex-start'} className="card-content-wrapper">
          <Rating rating={rating} isMobile={isMobile} />
          <Image src={realPosterPath} alt="Movie poster" style={{ display: 'block', height: 90, width: 60 }} />
          <Flex vertical className="card-content">
            <Typography.Title level={3} className="card-title">
              {trimmedTitle}
            </Typography.Title>
            <Typography.Text type={'secondary'}>{formattedReleaseDate}</Typography.Text>
            <Flex justify={'flex-start'}>{genreTagList}</Flex>
          </Flex>
        </Flex>
        <Flex vertical>
          <Typography.Paragraph className="card-description">{trimmedOverview}</Typography.Paragraph>
          <Rate count={10} allowHalf keyboard value={value} onChange={handleChange} style={{ alignSelf: 'flex-end' }} />
        </Flex>
      </Card>
    )
  }

  return (
    <Card hoverable className="card-body">
      <Flex justify={'space-between'}>
        <Rating rating={rating} isMobile={isMobile} />
        <Image src={realPosterPath} alt="Movie poster" style={{ display: 'block', height: 281, width: 183 }} />
        <Flex vertical className="card-content">
          <Typography.Title level={3} className="card-title">
            {trimmedTitle}
          </Typography.Title>
          <Typography.Text type={'secondary'}>{formattedReleaseDate}</Typography.Text>
          <Flex justify={'space-between'}>{genreTagList}</Flex>
          <Typography.Paragraph className="card-description">{trimmedOverview}</Typography.Paragraph>
          <Rate count={10} allowHalf keyboard value={value} onChange={handleChange} style={{ alignSelf: 'flex-end' }} />
        </Flex>
      </Flex>
    </Card>
  )
}

function Rating({ rating }) {
  let color = '#000000'
  if (rating <= 3) {
    color = '#E90000'
  } else if (rating <= 5) {
    color = '#E97E00'
  } else if (rating <= 7) {
    color = '#E9D100'
  } else if (rating <= 10) {
    color = '#66E900'
  }
  return (
    <div className="rating" style={{ borderColor: color }}>
      <span>{rating}</span>
    </div>
  )
}
