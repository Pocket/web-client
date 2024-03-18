import React, { useEffect, useState } from 'react'
import { css, cx } from '@emotion/css'

const fadeStyle = css`
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  &.fadeIn {
    animation: fadeIn 1s;
  }

  &.fadeOut {
    animation: fadeOut 1s;
  }
`

export const Fade = ({ show, remove, children }) => {
  const [render, setRender] = useState(show)

  useEffect(() => {
    if (show) setRender(true)
  }, [show])

  const onAnimationEnd = () => {
    if (!show) {
      setRender(false)
      remove()
    }
  }

  const fadeClass = cx(fadeStyle, show && 'fadeIn', !show && 'fadeOut')

  return (
    render && (
      <div className={fadeClass} onAnimationEnd={onAnimationEnd}>
        {children}
      </div>
    )
  )
}
