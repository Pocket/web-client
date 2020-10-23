import Read from './read'
import ARTICLE from 'mock/parsed-article.json'
import VIDEO from 'mock/parsed-video.json'

export default {
  title: 'Container/Read'
}

const ARTICLE_ITEM = {
  ...ARTICLE,
  tags: Object.keys(ARTICLE.tags)
}

export const article = () => (
  <div style={{ margin: '-1em' }}>
    <Read item={ARTICLE_ITEM} />
  </div>
)

export const video = () => <Read item={VIDEO} />
