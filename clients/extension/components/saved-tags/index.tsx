import style from './style.module.css'

export function SavedTags() {
  return (
    <div className={style.tags}>
      <label htmlFor="tags">Add Tags</label>
      <input type="text" />
    </div>
  )
}
