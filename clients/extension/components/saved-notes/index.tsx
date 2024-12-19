import style from './style.module.css'

export function SavedNotes() {
  return (
    <div className={style.notes}>
      <label htmlFor="note">Add note</label>
      <textarea name="note" id="note"></textarea>
    </div>
  )
}
