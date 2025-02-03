import style from './style.module.css'
import { AndroidOverflowMenuIcon } from '@ui/icons/AndroidOverflowMenuIcon'
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
  const node = note?.node
  const title = node?.title
  const contentPreview = node?.contentPreview as string
  return contentPreview ? (
    <div className={style.container}>
      <div className={style.note}>
        {title ? <h3>{title}</h3> : null}
        <ReactMarkdown allowedElements={['div']} unwrapDisallowed={true}>
          {contentPreview}
        </ReactMarkdown>
      </div>
      <div className={style.actions}>
        <button>
          <AndroidOverflowMenuIcon />
        </button>
      </div>
    </div>
  ) : null
}

function NoNotes() {
  return <div className={style.noNotes}>Add your first note to this page</div>
}
