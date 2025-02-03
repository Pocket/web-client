import style from './style.module.css'
import { CrossIcon } from '@ui/icons/CrossIcon'
import { useState, useRef } from 'react'
import ReactMarkdown from 'react-markdown'

// Types
import type { Note, NoteEdge } from '@common/types/pocket'

export function NotesList({ notes }: { notes?: NoteEdge[] }) {
  return (
    <div className={style.notes}>
      {Array.isArray(notes) && notes.length ? (
        notes.map((note) => <Note key={note?.cursor} note={note} />)
      ) : (
        <NoNotes />
      )}
    </div>
  )
}

function Note({ note }: { note?: NoteEdge }) {
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false)
  const noteRef = useRef<HTMLDivElement>(null)

  const node = note?.node
  const title = node?.title
  const contentPreview = node?.contentPreview as string

  const handleDeleteClick = () => {
    if (noteRef.current) noteRef.current.scrollIntoView({ behavior: 'smooth' })
    setConfirmDelete(true)
  }
  const handleCancelClick = () => setConfirmDelete(false)

  return contentPreview ? (
    <div className={`${style.container} ${confirmDelete && style.active}`} ref={noteRef}>
      <div className={style.note}>
        {title ? <h3>{title}</h3> : null}
        <ReactMarkdown allowedElements={['div']} unwrapDisallowed={true}>
          {contentPreview}
        </ReactMarkdown>
      </div>
      <div className={style.actions}>
        {!confirmDelete ? (
          <button onClick={handleDeleteClick}>
            <CrossIcon />
          </button>
        ) : null}
      </div>
      {confirmDelete ? <NoteDeleteConfirm handleCancelClick={handleCancelClick} /> : null}
    </div>
  ) : null
}

function NoteDeleteConfirm({ handleCancelClick }: { handleCancelClick: () => void }) {
  return (
    <div className={style.confirm}>
      <button>Delete this note</button>
      <button onClick={handleCancelClick}>Cancel</button>
    </div>
  )
}
function NoNotes() {
  return <div className={style.noNotes}>Add your first note to this page</div>
}
