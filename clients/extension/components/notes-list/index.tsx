import style from './style.module.css'

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
  const node = note?.node
  const contentPreview = node?.contentPreview as string
  return contentPreview ? <div>{contentPreview}</div> : null
}

function NoNotes() {
  return <div className={style.noNotes}>Add your first note to this page</div>
}
