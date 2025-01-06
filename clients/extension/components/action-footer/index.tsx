import style from './style.module.css'

export function ExtensionFooter({ error }: { error?: string }) {
  return <footer className={style.footer}>{error ? <em>{error}</em> : null}</footer>
}
