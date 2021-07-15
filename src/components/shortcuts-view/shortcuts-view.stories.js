import { listShortcuts } from 'connectors/shortcuts/shortcuts.state'
import { readerShortcuts } from 'connectors/shortcuts/shortcuts.state'
import { itemActions } from 'connectors/shortcuts/shortcuts.state'
import { ShortCutsView } from './shortcuts-view'

export default {
  title: 'Components/Shortcuts View',
  component: ShortCutsView
}

const APP_ROOT_SELECTOR = '#root'

export const Shortcuts = () => {
  return (
    <ShortCutsView
      listShortcuts={listShortcuts}
      readerShortcuts={readerShortcuts}
      itemActions={itemActions}
      showModal={true}
      appRootSelector={APP_ROOT_SELECTOR}
      cancelShortcutView={() => {}}
    />
  )
}
