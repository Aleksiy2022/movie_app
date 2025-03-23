import { Card, Flex, Typography, Tag } from 'antd'
import { format } from 'date-fns'

import { card, imgStyle, cardContentWrapper, cardContent, cardTitle, cardParagraph } from './filmCardStyle.js'
import { trimText } from './utils.js'

export default function FilmCard({ movie }) {
  const { poster_path, title, release_date, overview } = movie

  const realPosterPath = `https://image.tmdb.org/t/p/w500/${poster_path}`

  const maxTitleLength = 19
  const trimmedTitle = trimText(title, maxTitleLength)

  const formattedReleaseDate = format(release_date, 'MMM d, yyyy')

  const maxOverviewLength = 200
  const trimmedOverview = trimText(overview, maxOverviewLength)

  const genres = ['Drama', 'Action']

  const genreTagList = genres.map((genre, index) => {
    return <Tag key={index}>{genre}</Tag>
  })

  return (
    <Card hoverable styles={card}>
      <Flex style={cardContentWrapper}>
        <img src={realPosterPath} alt="Movie poster" style={imgStyle} />
        <Flex style={cardContent}>
          <Typography.Title style={cardTitle} level={3}>
            {trimmedTitle}
          </Typography.Title>
          <Typography.Text type={'secondary'}>{formattedReleaseDate}</Typography.Text>
          <Flex justify={'space-between'}>{genreTagList}</Flex>
          <Typography.Paragraph style={cardParagraph}>{trimmedOverview}</Typography.Paragraph>
        </Flex>
      </Flex>
    </Card>
  )
}
