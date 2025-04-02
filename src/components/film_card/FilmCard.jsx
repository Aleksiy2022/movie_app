import { Card, Flex, Typography, Tag, Rate, Image } from 'antd'
import './film-card.css'

export default function FilmCard({ movie, isMobile }) {
  console.log(isMobile)
  const { realPosterPath, trimmedTitle, formattedReleaseDate, genres, trimmedOverview } = movie

  const rating = '5.0'

  const genreTagList = genres.map((genre, index) => {
    return <Tag key={index}>{genre}</Tag>
  })

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
          <Rate count={10} allowHalf defaultValue={0} style={{ alignSelf: 'flex-end' }} />
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
          <Rate count={10} allowHalf defaultValue={0} style={{ alignSelf: 'flex-end' }} />
        </Flex>
      </Flex>
    </Card>
  )
}

function Rating({ rating }) {
  return (
    <div className="rating">
      <span>{rating}</span>
    </div>
  )
}
