import style from './style.module.css'

import type { RefObject } from 'react'
import type { Dispatch, SetStateAction } from 'react'

export function NotesAdd({
  textRef,
  setErrorText
}: {
  textRef?: RefObject<HTMLTextAreaElement | null>
  setErrorText: Dispatch<SetStateAction<string | undefined>>
}) {
  const resetError = () => setErrorText(undefined)
  return (
    <div className={style.container}>
      <textarea onFocus={resetError} name="note" id="note" ref={textRef}></textarea>
    </div>
  )
}
