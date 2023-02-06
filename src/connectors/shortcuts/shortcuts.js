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

/**

t('shortcuts:go-to-saves', 'Go to Saves')
t('shortcuts:go-to-archive', 'Go to Archive')
t('shortcuts:go-to-favorites', 'Go to Favorites')
t('shortcuts:go-to-articles', 'Go to Articles')
t('shortcuts:go-to-highlights', 'Go to Highlights')
t('shortcuts:go-to-videos', 'Go to Videos')
t('shortcuts:go-to-all-tags', 'Go to All Tags')
t('shortcuts:go-to-search', 'Go to Search')
t('shortcuts:bulk-edit', 'Bulk Edit')
t('shortcuts:save-a-url', 'Save a URL')
t('shortcuts:sort-by-newest', 'Sort by Newest')
t('shortcuts:sort-by-oldest', 'Sort by Oldest')
t('shortcuts:list-view', 'List View')
t('shortcuts:grid-view', 'Grid View')
t('shortcuts:detail-view', 'Detail View')
t('shortcuts:change-to-light-theme', 'Change to Light Theme')
t('shortcuts:change-to-dark-theme', 'Change to Dark Theme')
t('shortcuts:change-to-sepia-theme', 'Change to Sepia Theme')
t('shortcuts:open-help-overlay', 'Open Help Overlay')
t('shortcuts:open-original-in-new-tab', 'Open Original in New Tab')
t('shortcuts:archive-selected-item', 'Archive Selected Item')
t('shortcuts:favorite-selected-item', 'Favorite Selected Item')
t('shortcuts:tag-selected-item', 'Tag Selected Item')
t('shortcuts:delete-selected-item', 'Delete Selected Item')
t('shortcuts:select-item-in-bulk-edit', 'Select Item in Bulk Edit')
t('shortcuts:select-next-item', 'Select Next Item')
t('shortcuts:select-previous-item', 'Select Previous Item')
t('shortcuts:back-to-saves', 'Back to Saves')
t('shortcuts:increase-article-font-size', 'Increase Article Font Size')
t('shortcuts:decrease-article-font-size', 'Decrease Article Font Size')
t('shortcuts:increase-column-width', 'Increase Column Width')
t('shortcuts:decrease-column-width', 'Decrease Column Width')

*/
