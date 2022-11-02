// @refresh reset
// Vendor
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useHasChanged, usePrevious } from 'common/utilities/hooks/has-changed'

import { getSavesData } from './saves.state'
import { updateSavesData } from './saves.state'
import { appSetSection } from 'connectors/app/app.state'
import { SavesHeader } from 'components/headers/saves-header'
import { TagPageHeader } from './tags-page/tag-page-header'
import { VirtualizedList } from 'connectors/virtualized/virtualized-list'

import { CallOutBrand } from 'components/call-out/call-out-brand'
import { selectShortcutItem } from 'connectors/shortcuts/shortcuts.state'

import { sortOrderSetNew, sortOrderSetOld } from 'connectors/app/app.state'
import { SuccessFXA } from 'connectors/fxa-migration-success/success-fxa'

export default function Saves(props) {
  const { subset: sub = 'active', filter: propFilter } = props

  const dispatch = useDispatch()
  const router = useRouter()

  const { tag, filter: queryFilter } = router.query
  const subset = tag ? 'tag' : sub
  const filter = tag ? queryFilter : propFilter
  const selector = tag ? tag : sub

  const section = filter ? selector + filter : selector

  const listState = useSelector((state) => state.saves.listState)
  const items = useSelector((state) => state.saves[section])
  const offset = useSelector((state) => state.saves[`${section}Offset`])
  const total = useSelector((state) => state.saves[`${section}Total`])
  const since = useSelector((state) => state.saves[`${section}Since`])
  const listMode = useSelector((state) => state.app.listMode)
  const sortSubset = useSelector((state) => state.app.section)
  const sortOrder = useSelector((state) => state.app.sortOptions[sortSubset] || 'newest')
  const routeChange = useHasChanged(router.pathname)
  const oldRoute = usePrevious(router.pathname)

  const userStatus = useSelector((state) => state.user.user_status)

  // Check for initial items so we don't over request
  const initialItemsPopulated = items?.length || total === 0

  /**
   * Set up listeners for focus shifts.  When the window gains focus check if
   * since exists and this effect runs every time since is updated
   * ------------------------------------------------------------------------
   */
  useEffect(() => {
    const handleFocus = () => {
      if (!since) return
      dispatch(updateSavesData(since, subset, filter, tag))
    }

    // Adding new event listeners
    window.addEventListener('focus', handleFocus)
    // Remove event listeners when it is unmounted
    return () => {
      window.removeEventListener('focus', handleFocus)
    }
  }, [since, subset, filter, tag, dispatch])

  /**
   * Get initial list items. This should only fire once per page load
   * despite the exhaustive dependencies
   * ------------------------------------------------------------------------
   */
  useEffect(() => {
    if (initialItemsPopulated || userStatus === 'pending') return
    dispatch(appSetSection(section))
    dispatch(getSavesData(30, 0, subset, filter, tag))
  }, [userStatus, initialItemsPopulated, subset, sortOrder, filter, section, tag, dispatch])

  /**
   * Update list if we are navigating here from another saves type page:
   * (archive/favorites/search/etc)
   * ------------------------------------------------------------------------
   */
  useEffect(() => {
    if (!routeChange) return
    // If items are already in place, we want to know if anything has changed
    // since the last time we fetched the list (operations in other pages or apps)
    dispatch(appSetSection(section))
    dispatch(updateSavesData(since, subset, filter, tag))
  }, [routeChange, initialItemsPopulated, dispatch, section, since, subset, filter, tag])

  /**
   * Update list if we are navigating here from another page in the app
   * (home/discover/collections/etc)
   * ------------------------------------------------------------------------
   */
  useEffect(() => {
    if (!oldRoute) dispatch(updateSavesData(since, subset, filter, tag))
  }, [oldRoute])

  /**
   * When an item is added we get back sub par data from the return
   * In order to keep the list in sync, we will just trigger an update when the
   * list becomes `dirty`
   */
  useEffect(() => {
    if (listState === 'clean') return

    dispatch(updateSavesData(since, subset, filter, tag))
  }, [listState, since, subset, filter, tag, dispatch])

  // Remove current item when we return to saves
  // This should be leveraged more effectively in future, but for now
  // it is simply a reset
  useEffect(() => {
    dispatch(selectShortcutItem(false))
  }, [dispatch])

  /**
   * FUNCTIONAL ACTIONS
   * ------------------------------------------------------------------------
   */
  const loadMore = () => {
    if (offset >= total) return
    dispatch(getSavesData(45, offset, subset, filter, tag))
  }

  const type = listMode

  return items?.length ? (
    <VirtualizedList type={type} section={section} loadMore={loadMore} />
  ) : null
}
