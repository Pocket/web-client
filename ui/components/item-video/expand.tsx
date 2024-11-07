import style from './style.module.css'

import { useRef } from 'react'

export const Expand = () => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const handleExpand = () => {
    if (!buttonRef.current) return

    const parent = buttonRef.current.parentElement
    const className = style.expanded!
    if (parent) {
      if (parent.classList.contains(className)) parent.classList.remove(className)
      else parent.classList.add(className)
    }
  }

  return (
    <button ref={buttonRef} type="button" onClick={handleExpand}>
      {`Expand`}
    </button>
  )
}
