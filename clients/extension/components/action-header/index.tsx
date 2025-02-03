import style from './style.module.css'
import { OverflowMenuIcon } from '@ui/icons/OverflowMenuIcon'
import { PocketLogo } from '../icons/Pocket'
// import { SaveFilledIcon } from '../icons/SaveFilledIcon'
// import { SaveIcon } from '../icons/SaveIcon'

export function ExtensionHeader() {
  return (
    <header className={style.header}>
      {/* {loaded ? <SaveFilledIcon className={style.icon} /> : <SaveIcon className={style.icon} />} */}
      <PocketLogo />
      <OverflowMenuIcon />
    </header>
  )
}
