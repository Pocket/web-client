import style from './style.module.css'

import { ChevronLeftIcon } from '@ui/icons/ChevronLeftIcon'
import { ChevronRightIcon } from '@ui/icons/ChevronRightIcon'
import { Children, useEffect, useState } from 'react'

import { useWindowDimensions } from '../use-dimensions'

import type { PropsWithChildren } from 'react'

/**
 * ItemLayouts
 * ---
 * Item Layouts are just a clean way to define grids, strata and whatnot
 */
export function ItemShortLayout({ children }: PropsWithChildren) {
  const { width } = useWindowDimensions()
  const [slidePage, setSlidePage] = useState(0)
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

  useEffect(() => {
    setSlidePage(0)
  }, [totalPages])

  const transformStyle = {
    width: `${totalPages * 100}%`,
    gridTemplateColumns: `repeat(${totalPages * 4}, 1fr)`,
    transform: `translateX(-${transformPercentage}%)`
  }

  return (
    <div className={style.base} data-testid="item-short-layout" data-total-cards={itemCount}>
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
  if (width <= 599) return 1
  if (width <= 719) return 2
  if (width <= 1023) return 3
  return 4 // Everything
}
