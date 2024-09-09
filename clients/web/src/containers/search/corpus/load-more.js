import { useInView } from 'react-intersection-observer'

import { useSelector } from 'react-redux'
import { Loader } from 'components/loader/loader'
import { css } from '@emotion/css'

const loadMoreStyle = css`
  grid-column: 1/-1;
  height: 135px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-popoverCanvas);
  border: 1px solid var(--color-popoverBorder);
  border-radius: 16px;
  margin-top: 2rem;
  font-family: var(--fontSansSerif);
  & > div {
    margin-left: 0.5rem;
  }
`
const loadMoreRefStyle = css`
  transform: translateY(-200%);
  height: 350px;
  width: 100%;
  display: block;
  pointer-events: none;
  z-index: -1;
`

export function LoadMore({ loadMore }) {
  const loading = useSelector((state) => state.pageSearchCorpusInfo.loading)
  const error = useSelector((state) => state.pageSearchCorpusInfo.error)
  const startCursor = useSelector((state) => state.pageSearchCorpusInfo.startCursor)
  const endOfList = useSelector((state) => state.pageSearchCorpusInfo.endOfList)

  const shouldLoadMore = !loading && !endOfList

  const loadMoreMessage = startCursor ? 'Loading more items' : ''

  if (error) return null

  return loading ? (
    <div key="load-more" className={loadMoreStyle}>
      {loadMoreMessage} <Loader />
    </div>
  ) : (
    <LoadMoreTrigger loadMore={loadMore} shouldLoadMore={shouldLoadMore} />
  )
}

function LoadMoreTrigger({ loadMore, shouldLoadMore }) {
  // Fire when item is in view
  const [viewRef, inView] = useInView({ threshold: 0.5 })
  if (inView && shouldLoadMore) loadMore()

  return <div ref={viewRef} className={loadMoreRefStyle} />
}
