import style from './style.module.css'

import { ChevronLeftIcon } from '@ui/icons/ChevronLeftIcon'
import { ChevronRightIcon } from '@ui/icons/ChevronRightIcon'
import { Children, useEffect, useRef, useState } from 'react'

import { useRefDimensions } from '../use-dimensions'

import type { PropsWithChildren } from 'react'

/**
 * ItemLayouts
 * ---
 * Item Layouts are just a clean way to define grids, strata and whatnot
 */
export function ItemVideoLayout({ children }: PropsWithChildren) {
  const [slidePage, setSlidePage] = useState(0)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { width } = useRefDimensions(containerRef)

  const itemCount = Children.toArray(children).length
  const itemsOnScreen = getItemsOnSceen(width)

  const totalPages = Math.ceil(itemCount / itemsOnScreen)

  const transformPercentage = (slidePage / totalPages) * 100

  const hideSlide = itemCount <= itemsOnScreen
  const slideEnd = slidePage === totalPages - 1
  const slideStart = slidePage === 0

  const slideIn = () => {
    setSlidePage(Math.min(totalPages - 1, slidePage + 1))
  }
  const slideOut = () => {
    setSlidePage(Math.max(0, slidePage - 1))
  }

  const expandCell = () => {}

  useEffect(() => {
    setSlidePage(0)
  }, [totalPages])

  const transformStyle = {
    width: `${totalPages * 100}%`,
    gridTemplateColumns: `repeat(${totalPages * 2}, 1fr)`,
    transform: `translateX(-${transformPercentage}%)`
  }

  return (
    <div
      ref={containerRef}
      className={style.base}
      data-testid="item-video-layout"
      data-total-cards={itemCount}>
      <div className={`${style.controls} ${hideSlide && style.noSlide}`}>
        <button
          className="text"
          data-testid="carousel-back"
          disabled={slideStart}
          type="button"
          onClick={slideOut}>
          <ChevronLeftIcon />
        </button>
        <button
          className="text"
          data-testid="carousel-forward"
          disabled={slideEnd}
          type="button"
          onClick={slideIn}>
          <ChevronRightIcon />
        </button>
      </div>
      <div className={style.outer}>
        <div className={style.inner} style={transformStyle}>
          {children}
        </div>
      </div>
    </div>
  )
}

/**
 *
 */
function getItemsOnSceen(width: number) {
  if (width <= 1) return 2
  return 2 // Everything
}
