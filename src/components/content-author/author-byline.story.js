import { AuthorByline as Component } from './author-byline'

import { article, publisher } from 'mocks/_data/article'
const authorNames = article.photosAndCaptions.authorNames
const { url, name, showAuthors } = publisher.theVerge

export default {
  title: 'Article/AuthorByline',
  component: Component
}

export const singleAuthor = () => {
  return (
    <Component url={url} name={name} showAuthors={showAuthors} authorNames={[authorNames[0]]} />
  )
}

export const twoAuthors = () => {
  return (
    <Component
      url={url}
      name={name}
      showAuthors={showAuthors}
      authorNames={[authorNames[0], authorNames[1]]}
    />
  )
}

export const multipleAuthors = () => {
  return <Component url={url} name={name} showAuthors={showAuthors} authorNames={authorNames} />
}

export const noAuthors = () => {
  return <Component url={url} name={name} showAuthors={false} authorNames={authorNames} />
}
