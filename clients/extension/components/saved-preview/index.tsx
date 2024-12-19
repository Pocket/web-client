import style from './style.module.css'

export function SavedPreview() {
  return (
    <div className={style.preview}>
      <picture></picture>
      <div>Preview of things</div>
    </div>
  )
}
