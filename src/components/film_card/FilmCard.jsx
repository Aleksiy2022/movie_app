import { Card, Flex, Typography, Tag, Rate, Image } from 'antd'
import './film-card.css'
import { useState, useContext } from 'react'

import { MovieContext } from '../movie_context/MovieContext.jsx'

import { getGenreNames, getRating } from './utils.js'

export default function FilmCard({ movie, isMobile, moviesIdWithRating, handleChangeRating }) {
  const [rateValue, setRateValue] = useState(0)
  const [newRating, setNewRating] = useState(null)
  const { genres } = useContext(MovieContext)
  const { movieId, realPosterPath, trimmedTitle, formattedReleaseDate, genreIds, trimmedOverview, rating } = movie

  const genreTagList = getGenreNames(genreIds, genres).map((name, index) => {
    return <Tag key={index}>{name}</Tag>
  })

  const myRating = getRating(moviesIdWithRating, movieId)

  function onChange(value) {
    setNewRating(value)
    setRateValue(value)
    handleChangeRating(movieId, value)
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
          <Rate
            count={10}
            allowHalf
            keyboard
            value={newRating ? newRating : myRating ? myRating.rating : rateValue}
            onChange={onChange}
            style={{ alignSelf: 'flex-end' }}
          />
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
          <Rate
            count={10}
            allowHalf
            keyboard
            value={newRating ? newRating : myRating ? myRating.rating : rateValue}
            onChange={onChange}
            style={{ alignSelf: 'flex-end' }}
          />
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
