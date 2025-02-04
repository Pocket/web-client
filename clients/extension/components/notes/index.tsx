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
  noteStatus,
  setNoteStatus,
  setShowNotes,
  setErrorText
}: {
  notes?: NoteEdge[]
  noteStatus?: string | undefined
  setNoteStatus: Dispatch<SetStateAction<string | undefined>>
  setErrorText: Dispatch<SetStateAction<string | undefined>>
  setShowNotes: Dispatch<SetStateAction<boolean>>
}) {
  const textRef = useRef<HTMLTextAreaElement | null>(null)
  const titleRef = useRef<HTMLInputElement | null>(null)

  const handleAddNote = () => {
    // Get the value of our textarea
    if (!textRef.current) return
    const docMarkdown = textRef.current.value.trim()

    // Let's sort out the optional title
    const title = titleRef.current ? titleRef.current.value.trim() : false

    // Let's not add empty notes
    if (!docMarkdown?.length) {
      textRef.current.value = '' // gets rid of space only values
      return setErrorText('Text is require to create a note')
    }

    // Need to reset the input fields
    if (titleRef.current) titleRef.current.value = ''
    textRef.current.value = ''

    // Let's
    setNoteStatus('saving note')
    void sendMessage({
      action: EXT_ACTIONS.ADD_NOTE_REQUEST,
      noteData: { docMarkdown, ...(title && { title }) }
    })
  }

  const handleNoteDelete = (id: string) => {
    setNoteStatus('deleting note')
    void sendMessage({ action: EXT_ACTIONS.DELETE_NOTE_REQUEST, noteId: id })
  }

  return (
    <div>
      <div className={style.container}>
        <NotesList notes={notes} handleNoteDelete={handleNoteDelete} />
        <NotesAdd
          noteStatus={noteStatus}
          textRef={textRef}
          titleRef={titleRef}
          setErrorText={setErrorText}
        />
      </div>
      <NotesFooter
        noteStatus={noteStatus}
        setShowNotes={setShowNotes}
        handleAddNote={handleAddNote}
      />
    </div>
  )
}
