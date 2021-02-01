import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Mousetrap from 'mousetrap'
import { useDispatch, useSelector } from 'react-redux'
import { ShortCutsView } from 'components/shortcuts-view/shortcuts-view'
import { listShortcuts } from './shortcuts.state'
import { readerShortcuts } from './shortcuts.state'
import { closeHelpOverlay } from './shortcuts.state'

export function Shortcuts() {
  const dispatch = useDispatch()
  const router = useRouter()

  const appMode = useSelector((state) => state.app.mode)
  const showShortcuts = useSelector((state) => state.shortcuts.displayLegend)

  const APP_ROOT_SELECTOR = '#__next'
  const cancelShortcutView = () => dispatch(closeHelpOverlay())

  useEffect(() => {
    listShortcuts.forEach(({ keys, action }) => {
      const actionPayload = action({ router, appMode })
      const boundAction = () => dispatch(actionPayload)
      Mousetrap.bind(keys, boundAction)
    })

    // Clean up
    return () => {
      listShortcuts.forEach(({ keys }) => Mousetrap.unbind(keys))
    }
  }, [dispatch, router, appMode])

  return showShortcuts ? (
    <ShortCutsView
      showModal={true}
      appRootSelector={APP_ROOT_SELECTOR}
      cancelShortcutView={cancelShortcutView}
      listShortcuts={listShortcuts}
      readerShortcuts={readerShortcuts}
    />
  ) : null
}
