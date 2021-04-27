import { useEffect, useState } from 'react'
import { css, cx } from 'linaria'
import { BookmarkFilledIcon } from '@pocket/web-ui'
import { useInView } from 'react-intersection-observer'
import { useHasChanged } from 'common/utilities/hooks/has-changed'
import { usePrevious } from 'common/utilities/hooks/has-changed'

const bookmarkStyles = css`
  @keyframes fadeIn {
    0%, 100% {
      opacity: 0;
    }
    20%, 80% {
      opacity: 1;
    }
  }

  margin-top: 0;
  text-align: right;
  flex-grow: 1;
  color: var(--color-actionBrand);
  opacity: 0;

  &.visible {
    animation: 2s ease-in-out 500ms fadeIn;
  }
`

export const BookmarkIcon = ({ newSaveCount = 0 }) => {
  const [show, setShow] = useState(false)
  const [hasChanged, setHasChanged] = useState(false)
  const saveCountChange = useHasChanged(newSaveCount.toString()) // 0 evals as false, needs to be string

  const [ref, inView] = useInView({ threshold: 0.5 })

  useEffect(() => {
    if (saveCountChange) {
      setHasChanged(true)
      setShow(false)
    }

    if (hasChanged && inView) {
      setHasChanged(false)
      setShow(true)
    }
  }, [inView, saveCountChange])

  const bookmarkClassName = cx(
    bookmarkStyles,
    show && 'visible'
  )

  return (
    <span ref={ref} className={bookmarkClassName}>
      <BookmarkFilledIcon />
    </span>
  )
}
