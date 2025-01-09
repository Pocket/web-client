import style from './style.module.css'
import { OverflowMenuIcon } from '../icons/OverflowMenuIcon'
import { SaveIcon } from '../icons/SaveIcon'
import { SavedLoader } from '../saved-loader'

export function ExtensionHeader() {
  return (
    <header className={style.header}>
      <SaveIcon />
      <SavedLoader />
      <OverflowMenuIcon />
    </header>
  )
}
