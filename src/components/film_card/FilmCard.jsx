import { Card, Flex, Typography, Tag, Rate } from 'antd'

import { card, imgStyle, cardContentWrapper, cardContent, cardTitle, cardParagraph } from './filmCardStyle.js'

export default function FilmCard({ movie }) {
  const { realPosterPath, trimmedTitle, formattedReleaseDate, genres, trimmedOverview } = movie

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
          <Rate count={10} allowHalf defaultValue={0} style={{ alignSelf: 'center' }} />
        </Flex>
      </Flex>
    </Card>
  )
}
