import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSelector } from 'react-redux'
import { Loader } from 'components/loader/loader'
import { css } from 'linaria'

const loadMoreStyle = css`
  grid-column: 1/-1;
  height: 135px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-popoverCanvas);
  border: 1px solid var(--color-popoverBorder);
  border-radius: var(--borderRadius);
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
  const { ref, inView } = useInView()

  const hasNextPage = useSelector((state) => state.pageSavedInfo.hasNextPage)
  const loading = useSelector((state) => state.pageSavedInfo.loading)
  const error = useSelector((state) => state.pageSavedInfo.error)
  const pageSavedIds = useSelector((state) => state.pageSavedIds)

  const shouldLoadMore = hasNextPage && !loading

  const loadMoreMessage = pageSavedIds.length ? 'Loading more items' : ''
  useEffect(() => {
    if (!inView) return

    // There are more items to load! Let's do it
    if (shouldLoadMore) loadMore()
  }, [inView, loadMore, shouldLoadMore])

  return loading || error ? (
    <div key="load-more" className={loadMoreStyle}>
      {error ? (
        <>Something went wrong while retrieving your items</>
      ) : (
        <>
          {loadMoreMessage} <Loader />
        </>
      )}
    </div>
  ) : (
    <div ref={ref} className={loadMoreRefStyle} />
  )
}
