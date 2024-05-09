import { useEffect, useState } from 'react'
import { css, cx } from '@emotion/css'
import { BookmarkFilledIcon } from '@ui/icons/BookmarkFilledIcon'
import { useHasChanged } from 'common/utilities/hooks/has-changed'
import { useInView } from 'react-intersection-observer'

const bookmarkStyles = css`
  @keyframes fadeIn {
    0%,
    100% {
      opacity: 0;
    }
    20%,
    80% {
      opacity: 1;
    }
  }

  margin-top: 0;
  text-align: right;
  flex-grow: 1;
  color: var(--color-actionBrand);
  opacity: 0;

  .icon {
    height: 1.125rem;
  }

  &.visible {
    animation-name: fadeIn;
    animation-delay: 500ms;
    animation-timing-function: ease-in-out;
    animation-duration: 2500ms;
  }
`

export const BookmarkIcon = ({ newSaveCount = 0 }) => {
  const [show, setShow] = useState(false)
  const [hasChanged, setHasChanged] = useState(false)
  const saveCountChange = useHasChanged(newSaveCount.toString()) // 0 evals as false, needs to be string

  // Fire when item is in view
  const [viewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5
  })

  useEffect(() => {
    if (saveCountChange) {
      setHasChanged(true)
      setShow(false)
    }

    if (hasChanged && inView && newSaveCount !== 0) {
      setHasChanged(false)
      setShow(true)
    }
  }, [hasChanged, inView, newSaveCount, saveCountChange])

  const bookmarkClassName = cx(bookmarkStyles, show && 'visible')

  return (
    <span ref={viewRef} className={bookmarkClassName}>
      <BookmarkFilledIcon />
    </span>
  )
}
