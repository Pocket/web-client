import style from './style.module.css'
import { OverflowMenuIcon } from '../icons/OverflowMenuIcon'
import { SaveFilledIcon } from '../icons/SaveFilledIcon'
import { SaveIcon } from '../icons/SaveIcon'
import { SavedLoader } from '../saved-loader'

export function ExtensionHeader({ saveStatus }: { saveStatus?: string }) {
  const loaded = saveStatus !== 'saving'
  return (
    <header className={style.header}>
      {loaded ? <SaveFilledIcon className={style.icon} /> : <SaveIcon className={style.icon} />}
      {loaded ? <div /> : <SavedLoader />}
      <OverflowMenuIcon />
    </header>
  )
}
