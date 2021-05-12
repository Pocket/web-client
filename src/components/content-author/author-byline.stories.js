import React from 'react'
import { AuthorByline } from './author-byline'

import { article, publisher } from 'mock/article'
const authorNames = article.photosAndCaptions.authorNames
const { url, name, showAuthors } = publisher.theVerge

export default {
  title: 'Article/AuthorByline',
  component: AuthorByline
}

export const singleAuthor = () => {
  return (
    <AuthorByline
      url={url}
      name={name}
      showAuthors={showAuthors}
      authorNames={[authorNames[0]]}
    />
  )
}

export const twoAuthors = () => {
  return (
    <AuthorByline
      url={url}
      name={name}
      showAuthors={showAuthors}
      authorNames={[authorNames[0], authorNames[1]]}
    />
  )
}

export const multipleAuthors = () => {
  return (
    <AuthorByline
      url={url}
      name={name}
      showAuthors={showAuthors}
      authorNames={authorNames}
    />
  )
}

export const noAuthors = () => {
  return (
    <AuthorByline
      url={url}
      name={name}
      showAuthors={false}
      authorNames={authorNames}
    />
  )
}
