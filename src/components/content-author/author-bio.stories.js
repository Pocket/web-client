import { AuthorBio } from './author-bio'
export default {
  title: 'Article/AuthorBio',
  component: AuthorBio
}

const mockAuthors = [
  {
    name: 'Aric Jenkins ',
    bio: '[Aric Jenkins](https://twitter.com/aricwithan_a) is a staff writer at Fortune magazine, where he has covered transportation and infrastructure and edits the [raceAhead newsletter](https://fortune.com/newsletter/raceahead) on culture and diversity in corporate America. In late 2019, his [magazine feature](https://fortune.com/longform/airbnb-deaths-fraud-safety-experiences-ipo-2020/) examined Airbnb and its struggles expanding into cities and new businesses. [His writing](https://aricjenkins.com/) has appeared in the *New York Times*, *Time*, *Newsweek*, and more. Aric lives in Brooklyn, New York.',
    imageUrl:
      'https://s3.amazonaws.com/pocket-collectionapi-prod-images/1807a4ff-7b45-42a1-9e7c-5b2b08339c9c.jpeg'
  },
  {
    name: 'Simran Jeet Singh',
    bio: "Simran Jeet Singh loves sports and signed up for his first marathon after being inspired by Fauja Singh—and like Fauja, he hasn't stopped running since. Simran is an activist, writer, and scholar who believes deeply in the divine goodness of all people. He was born and raised in San Antonio, Texas, and now lives in New York City with his wife and two daughters. ",
    imageUrl:
      'https://s3.amazonaws.com/pocket-collectionapi-prod-images/a8a9a5be-5c7e-4c65-9752-533e90b605b3.jpeg'
  },
  {
    name: 'Pocket Editors',
    bio: '',
    imageUrl: ''
  },
  {
    name: 'Alex Dalenberg',
    bio: '',
    imageUrl: ''
  }
]

export const singleAuthor = () => {
  return mockAuthors.slice(0, 1).map((author) => <AuthorBio {...author} />)
}

export const multipleAuthor = () => {
  return mockAuthors.map((author) => <AuthorBio {...author} />)
}

export const incompleteAuthor = () => {
  return mockAuthors.slice(-1, 1).map((author) => <AuthorBio {...author} />)
}
