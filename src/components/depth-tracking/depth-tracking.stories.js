import { useState } from 'react'
import { DepthTracking } from './depth-tracking'
import { css } from 'linaria'
import { ParsedContent } from 'components/content-parsed/content-parsed'
import { articleContent } from 'mock/article'

export default {
  title: 'Article/DepthTracking',
  component: DepthTracking
}

const displayCase = css`
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 1rem;
  z-index: 1;
  font-size: 2em;
  background-color: white;
  border: 1px solid black;
`

export const Normal = () => {
  const [depth, setDepth] = useState(0)

  return (
    <DepthTracking onScrollDepth={setDepth}>
      <div className={displayCase}>Latest depth reading... {depth}</div>
      <ParsedContent content={articleContent.quotes} />
    </DepthTracking>
  )
}
