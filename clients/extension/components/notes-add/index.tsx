import style from './style.module.css'

import type { RefObject } from 'react'

export function NotesAdd({ textRef }: { textRef?: RefObject<HTMLTextAreaElement | null> }) {
  return (
    <div className={style.container}>
      <textarea name="note" id="note" ref={textRef}></textarea>
    </div>
  )
}
