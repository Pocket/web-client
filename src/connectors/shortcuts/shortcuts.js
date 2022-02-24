import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Mousetrap from 'mousetrap'
import { useDispatch, useSelector } from 'react-redux'
import { ShortCutsView } from 'components/shortcuts-view/shortcuts-view'
import { listShortcuts } from './shortcuts.state'
import { readerShortcuts } from './shortcuts.state'
import { itemActions } from './shortcuts.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

import { closeHelpOverlay } from './shortcuts.state'

export function Shortcuts() {
  const dispatch = useDispatch()
  const router = useRouter()

  const appMode = useSelector((state) => state.app.mode)
  const isPremium = useSelector((state) => parseInt(state?.user?.premium_status, 10) === 1 || false) //prettier-ignore
  const showShortcuts = useSelector((state) => state.shortcuts.displayLegend)

  const APP_ROOT_SELECTOR = '#__next'
  const cancelShortcutView = () => dispatch(closeHelpOverlay())

  useEffect(() => {
    const shortCuts = [...listShortcuts, ...itemActions, ...readerShortcuts]
    Mousetrap.addKeycodes({ 173: '-' }) // For FF hyphen code

    shortCuts.forEach(({ keys, action, omit, prevent, premium, keyCopy, copy }) => {
      if (omit) return // We want in the list but not bound
      if (premium && !isPremium) return // It is a premium feature
      const actionPayload = action({ router, appMode })
      const analyticsData = { label: copy, value: keyCopy }
      const boundAction = (event) => {
        if (prevent) event.preventDefault()
        dispatch(sendSnowplowEvent('shortcut', analyticsData))
        dispatch(actionPayload)
      }
      Mousetrap.bind(keys, boundAction)
    })

    // Clean up
    return () => {
      shortCuts.forEach(({ keys }) => Mousetrap.unbind(keys))
    }
  }, [dispatch, router, appMode, isPremium])

  return showShortcuts ? (
    <ShortCutsView
      isPremium={isPremium}
      showModal={true}
      appRootSelector={APP_ROOT_SELECTOR}
      cancelShortcutView={cancelShortcutView}
      listShortcuts={listShortcuts}
      itemActions={itemActions}
      readerShortcuts={readerShortcuts}
    />
  ) : null
}
