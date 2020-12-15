// @refresh reset
// Vendor
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useHasChanged } from 'common/utilities/hooks/has-changed'
import Layout from 'layouts/with-sidebar'
import { getMylistData } from './my-list.state'
import { updateMyListData } from './my-list.state'
import { appSetSection } from 'connectors/app/app.state'
import { MyListHeader } from 'components/headers/my-list-header'
import { TagPageHeader } from './tags-page/tag-page-header'
import { VirtualizedList } from 'components/items-layout/virtualized-list'
import { SideNav } from 'connectors/side-nav/side-nav'
import { CallOutBrand } from 'components/call-out/call-out-brand'
import { TaggingModal } from 'connectors/confirm-tags/confirm-tags'
import { DeleteModal } from 'connectors/confirm-delete/confirm-delete'
import { ShareModal } from 'connectors/confirm-share/confirm-share'
import { Toasts } from 'connectors/toasts/toast-list'

export default function Collection(props) {
  const { metaData = {}, subset: sub = 'active', filter: propFilter } = props

  const dispatch = useDispatch()
  const router = useRouter()

  const { tag, filter: queryFilter } = router.query
  const subset = tag ? 'tag' : sub
  const filter = tag ? queryFilter : propFilter
  const selector = tag ? tag : sub

  const section = filter ? selector + filter : selector

  const listState = useSelector((state) => state.myList.listState)
  const items = useSelector((state) => state.myList[section])
  const offset = useSelector((state) => state.myList[`${section}Offset`])
  const total = useSelector((state) => state.myList[`${section}Total`])
  const since = useSelector((state) => state.myList[`${section}Since`])
  const listMode = useSelector((state) => state.app.listMode)
  const sortOrder = useSelector((state) => state.app.sortOrder)
  const routeChange = useHasChanged(router.pathname)

  const isLoggedIn = useSelector((state) => !!state.user.auth)
  const userStatus = useSelector((state) => state.user.user_status)

  // Check for initial items so we don't over request
  const initialItemsPopulated = items?.length >= 30 || total < 30

  /**
   * Set up listeners for focus shifts.  When the window gains focus check if
   * since exists and this effect runs every time since is updated
   * ------------------------------------------------------------------------
   */
  useEffect(() => {
    const handleFocus = () => {
      if (!since) return
      dispatch(updateMyListData(since, subset, filter, tag))
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
    if (!initialItemsPopulated || userStatus === 'pending') return
    dispatch(appSetSection(section))
    dispatch(getMylistData(30, 0, subset, filter, tag))
  }, [
    userStatus,
    initialItemsPopulated,
    subset,
    sortOrder,
    filter,
    section,
    tag,
    dispatch
  ])

  /**
   * Update list if we are navigating here from another area in the app
   * ------------------------------------------------------------------------
   */
  useEffect(() => {
    if (!routeChange) return
    // If items are already in place, we want to know if anything has changed
    // since the last time we fetched the list (operations in other pages or apps)
    dispatch(updateMyListData(since, subset, filter, tag))
  }, [routeChange, initialItemsPopulated, dispatch, since, subset, filter, tag])

  /**
   * When an item is added we get back sub par data from the return
   * In order to keep the list in sync, we will just trigger an update when the
   * list becomes `dirty`
   */
  useEffect(() => {
    if (listState === 'clean') return

    dispatch(updateMyListData(since, subset, filter, tag))
  }, [listState, since, subset, filter, tag, dispatch])

  // useEffect(trackPageView, [])

  /**
   * FUNCTIONAL ACTIONS
   * ------------------------------------------------------------------------
   */
  const loadMore = () => {
    if (offset >= total) return
    dispatch(getMylistData(45, offset, subset, filter, tag))
  }

  const shouldRender = userStatus !== 'pending'

  const type = listMode

  const Header = tag ? TagPageHeader : MyListHeader

  return (
    <Layout title={metaData.title} metaData={metaData}>
      <SideNav subset={subset} isLoggedIn={isLoggedIn} tag={tag} />

      {shouldRender ? (
        <main className="main">
          {isLoggedIn ? (
            <>
              <Header
                subset={subset}
                title={selector}
                filter={filter}
                tag={tag}
              />
              {items?.length ? (
                <VirtualizedList
                  type={type}
                  items={items}
                  loadMore={loadMore}
                />
              ) : null}
              <DeleteModal />
              <TaggingModal />
              <ShareModal />
              <Toasts />
            </>
          ) : (
            <CallOutBrand />
          )}
        </main>
      ) : null}
    </Layout>
  )
}
