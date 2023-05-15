import React, { useRef, useEffect } from 'react'
import { css, cx } from '@emotion/css'
import { usePrevious } from 'common/utilities/hooks/has-changed'

const itemWrapper = css`
  font-family: 'Graphik Web';
  position: relative;
  cursor: pointer;
  display: block;
  border: none;
  height: auto;
  text-align: left;
  border-top: none;
  line-height: 1em;
  color: var(--color-textSecondary);
  font-size: 1rem;
  text-transform: none;
  font-weight: 400;
  box-shadow: none;
  box-sizing: border-box;
  padding: 0.3rem 1.1rem;
  white-space: normal;
  word-wrap: normal;
  &:hover,
  &.isActive {
    background: var(--color-actionPrimarySubdued);
  }
`

export const TypeAheadItem = ({ item, index, action, isActive }) => {
  const ref = useRef()
  const prevActive = usePrevious(isActive)

  useEffect(() => {
    if (prevActive) return () => {} 
    if (isActive) ref.current.scrollIntoView({ block: 'center' })
  }, [isActive, prevActive])

  const clickAction = () => action(index)

  return (
    <div className={cx(itemWrapper, isActive && 'isActive')} onClick={clickAction}>
      <span ref={ref}>{item}</span>
    </div>
  )
}
