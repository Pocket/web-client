import style from './style.module.css'
import { useRef } from 'react'
import { EXT_ACTIONS } from '../../actions'
import { sendMessage } from '../../utilities/send-message'
import { NotesAdd } from '../notes-add'
import { NotesFooter } from '../notes-footer'
import { NotesList } from '../notes-list'

// Types
import type { NoteEdge } from '@common/types/pocket'
import type { Dispatch, SetStateAction } from 'react'

export function Notes({
  notes,
  setShowNotes,
  setErrorText
}: {
  notes?: NoteEdge[]
  setErrorText: Dispatch<SetStateAction<string | undefined>>
  setShowNotes: Dispatch<SetStateAction<boolean>>
}) {
  const textRef = useRef<HTMLTextAreaElement | null>(null)
  const handleAddNote = () => {
    // Get the value of our textarea
    if (!textRef.current) return
    const docMarkdown = textRef.current.value.trim()

    // Let's not add empty notes
    if (!docMarkdown?.length) {
      textRef.current.value = '' // gets rid of space only values
      return setErrorText('Text is require to create a note')
    }

    void sendMessage({ action: EXT_ACTIONS.ADD_NOTE_REQUEST, noteData: { docMarkdown } })
    textRef.current.value = ''
  }

  return (
    <div>
      <div className={style.container}>
        <NotesList notes={notes} />
        <NotesAdd textRef={textRef} setErrorText={setErrorText} />
      </div>
      <NotesFooter setShowNotes={setShowNotes} handleAddNote={handleAddNote} />
    </div>
  )
}
