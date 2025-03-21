import FilmCardsList from '../film_cards_list/FilmCardsList.jsx'

export default function App() {
  const films = [
    {
      id: 1,
      title: 'The Way BAck',
      release: 'March 5, 2022',
      description:
        'A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high ...',
      genres: ['Action', 'Drama'],
      img: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      id: 2,
      title: 'The Way BAck',
      release: 'March 5, 2022',
      description:
        'A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high ...',
      genres: ['Action', 'Drama'],
      img: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      id: 3,
      title: 'The Way BAck',
      release: 'March 5, 2022',
      description:
        'A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high ...',
      genres: ['Action', 'Drama'],
      img: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      id: 4,
      title: 'The Way BAck',
      release: 'March 5, 2022',
      description:
        'A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high ...',
      genres: ['Action', 'Drama'],
      img: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      id: 5,
      title: 'The Way BAck',
      release: 'March 5, 2022',
      description:
        'A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high ...',
      genres: ['Action', 'Drama'],
      img: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      id: 6,
      title: 'The Way BAck',
      release: 'March 5, 2022',
      description:
        'A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high ...',
      genres: ['Action', 'Drama'],
      img: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]

  return <FilmCardsList films={films} />
}
