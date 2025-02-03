import style from './style.module.css'

import { ActionLoader } from '../action-loader'
import type { RefObject } from 'react'
import type { Dispatch, SetStateAction } from 'react'

export function NotesAdd({
  textRef,
  noteStatus,
  setErrorText
}: {
  textRef?: RefObject<HTMLTextAreaElement | null>
  noteStatus?: string
  setErrorText: Dispatch<SetStateAction<string | undefined>>
}) {
  const resetError = () => setErrorText(undefined)

  return (
    <div className={style.container}>
      {noteStatus ? (
        <ActionLoader />
      ) : (
        <textarea onFocus={resetError} name="note" id="note" ref={textRef}></textarea>
      )}
    </div>
  )
}
