import style from './style.module.css'

export function SavedTags({ tags }: { tags?: string[] }) {
  return (
    <div className={style.tags}>
      <label htmlFor="tags">Add Tags</label>
      <input type="text" />
      {tags ? tags.map((tag) => <div key={tag}>{tag}</div>) : null}
    </div>
  )
}
