import style from './style.module.css'

export function ActionLoader() {
  return (
    <div className={style.container}>
      <div className={style.loader}></div>
    </div>
  )
}
