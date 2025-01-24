import style from './style.module.css'

export function ExtensionError({ errorMessage }: { errorMessage?: string }) {
  return <div className={style.error}> {errorMessage} </div>
}
