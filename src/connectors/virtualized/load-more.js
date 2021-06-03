import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
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

export function LoadMore({ count, total, loadMore, isLoading } ) {
  const { ref, inView } = useInView()

  useEffect(() => {
    if (!inView) return

    // There are more items to load! Let's do it
    if (count < total) {
      loadMore()
    }
  }, [inView, count, total, loadMore])

  return count < total ? (
    <div key="load-more" className={loadMoreStyle} ref={ref}>
      Loading more items <Loader />
    </div>
  ) : null
}
