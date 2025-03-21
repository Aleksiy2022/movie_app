import { Card, Flex, Typography } from 'antd'

export default function FilmCard({ film }) {
  const imgStyle = {
    display: 'block',
    height: '100%',
    maxWidth: 181,
  }

  const { title, release, description, genres, img } = film
  const { Title, Text } = Typography
  return (
    <Card
      hoverable
      styles={{
        body: {
          padding: 0,
        },
      }}
    >
      <Flex justify="space-between">
        <img src={img} alt="Movie poster" style={imgStyle} />
        <Flex vertical justify="space-between" align={'flex-start'} gap={7}>
          <Title level={3}>{title}</Title>
          <Text>{release}</Text>
          <Flex justify={'space-between'} gap={8}>
            <Text keyboard>{genres[0]}</Text>
            <Text keyboard>{genres[1]}</Text>
          </Flex>
          <Text>{description}</Text>
        </Flex>
      </Flex>
    </Card>
  )
}
