import style from './style.module.css'

import { ActionLoader } from '../action-loader'
import type { RefObject } from 'react'
import type { Dispatch, SetStateAction } from 'react'

export function NotesAdd({
  textRef,
  titleRef,
  noteStatus,
  setErrorText
}: {
  titleRef?: RefObject<HTMLInputElement | null>
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
        <>
          <input
            type="text"
            ref={titleRef}
            name="noteTitle"
            id="noteTitle"
            placeholder="Title (optional)"
          />
          <textarea onFocus={resetError} name="note" id="note" ref={textRef}></textarea>
        </>
      )}
    </div>
  )
}
