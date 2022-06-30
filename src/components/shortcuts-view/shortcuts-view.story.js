import { listShortcuts } from 'connectors/shortcuts/shortcuts.state'
import { readerShortcuts } from 'connectors/shortcuts/shortcuts.state'
import { itemActions } from 'connectors/shortcuts/shortcuts.state'
import { ShortCutsView as Component } from './shortcuts-view'

export default {
  title: 'Components/ShortCutsView',
  component: Component
}

const APP_ROOT_SELECTOR = '#root'

export const ShortCutsView = () => {
  return (
    <Component
      listShortcuts={listShortcuts}
      readerShortcuts={readerShortcuts}
      itemActions={itemActions}
      showModal={true}
      appRootSelector={APP_ROOT_SELECTOR}
      cancelShortcutView={() => {}}
    />
  )
}
