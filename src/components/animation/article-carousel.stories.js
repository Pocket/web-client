import ArticleCarousel from './article-carousel'

import articleImage001 from 'static/images/article-carousel/article-image-001.png'
import articleImage002 from 'static/images/article-carousel/article-image-002.png'
import articleImage003 from 'static/images/article-carousel/article-image-003.png'
import articleImage004 from 'static/images/article-carousel/article-image-004.png'

export default {
  title: 'Components/Animation/ArticleCarousel',
  component: ArticleCarousel
}

export const normal = () => (
  <ArticleCarousel
    images={[articleImage001, articleImage002, articleImage003, articleImage004]} // prettier-ignore
  />
)

export const slowAnimation = () => (
  <ArticleCarousel
    images={[articleImage001, articleImage002, articleImage003, articleImage004]} // prettier-ignore
    duration={3}
  />
)

export const longPause = () => (
  <ArticleCarousel
    images={[articleImage001, articleImage002, articleImage003, articleImage004]} // prettier-ignore
    delay={4}
  />
)

export const disableIntro = () => (
  <ArticleCarousel
    images={[articleImage001, articleImage002, articleImage003, articleImage004]} // prettier-ignore
    useIntro={false}
  />
)

export const constantMovement = () => (
  <ArticleCarousel
    images={[articleImage001, articleImage002, articleImage003, articleImage004]} // prettier-ignore
    delay={0}
    duration={3}
  />
)

export const notEnoughImages = () => (
  <ArticleCarousel
    images={[articleImage001, articleImage002, articleImage003]}
  />
)
