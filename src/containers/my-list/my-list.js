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
import { VirtualizedList } from 'components/items-layout/virtualized-list'
import { SideNav } from 'components/side-nav/side-nav'
import { CallOutBrand } from 'components/call-out/call-out-brand'
import { TaggingModal } from 'connectors/confirm-tags/confirm-tags'
import { DeleteModal } from 'connectors/confirm-delete/confirm-delete'

export default function Collection(props) {
  const { metaData = {}, subset = 'active', filter } = props

  const dispatch = useDispatch()
  const router = useRouter()

  const section = filter ? subset + filter : subset
  const items = useSelector((state) => state.myList[section])
  const offset = useSelector((state) => state.myList[`${section}Offset`])
  const total = useSelector((state) => state.myList[`${section}Total`])
  const since = useSelector((state) => state.myList[`${section}Since`])
  const routeChange = useHasChanged(router.pathname)
  const isLoggedIn = useSelector((state) => !!state.user.auth)
  const userStatus = useSelector((state) => state.user.user_status)

  // Check for initial items so we don't over request
  const initialItemsPopulated =
    items?.length && (items?.length >= 18 || total < 18)

  /**
   * Set up listeners for focus shifts.  When the window gains focus check if
   * since exists and this effect runs every time since is updated
   * ------------------------------------------------------------------------
   */
  useEffect(() => {
    const handleFocus = () => {
      if (!since) return
      dispatch(updateMyListData(since, subset, filter))
    }

    // Adding new event listeners
    window.addEventListener('focus', handleFocus)
    // Remove event listeners when it is unmounted
    return () => {
      window.removeEventListener('focus', handleFocus)
    }
  }, [since, subset, filter, dispatch])

  /**
   * Get initial list items. This should only fire once per page load
   * despite the exhaustive dependencies
   * ------------------------------------------------------------------------
   */
  useEffect(() => {
    if (initialItemsPopulated || userStatus === 'pending') return
    dispatch(getMylistData(18, 0, subset, filter))
    dispatch(appSetSection(section))
  }, [userStatus, initialItemsPopulated, subset, filter, section, dispatch])

  /**
   * Update list if we are navigating here from another area in the app
   * ------------------------------------------------------------------------
   */
  useEffect(() => {
    if (!routeChange || !initialItemsPopulated || !since) return
    // If items are already in place, we want to know if anything has changed
    // since the last time we fetched the list (operations in other pages or apps)
    dispatch(updateMyListData(since, subset, filter))
  }, [routeChange, initialItemsPopulated, dispatch, since, subset, filter])

  // useEffect(trackPageView, [])

  /**
   * FUNCTIONAL ACTIONS
   * ------------------------------------------------------------------------
   */
  const loadMore = () => dispatch(getMylistData(45, offset, subset, filter))
  const shouldRender = userStatus !== 'pending'

  // TODO: Adjust this to use app state
  const type = 'grid'

  return (
    <Layout title={metaData.title} metaData={metaData}>
      <SideNav subset={subset} isLoggedIn={isLoggedIn} />

      {shouldRender ? (
        <main className="main">
          {isLoggedIn ? (
            <>
              <MyListHeader subset={subset} filter={filter} />
              {items?.length ? (
                <VirtualizedList
                  type={type}
                  items={items}
                  loadMore={loadMore}
                />
              ) : null}
              <DeleteModal />
              <TaggingModal />
            </>
          ) : (
            <CallOutBrand />
          )}
        </main>
      ) : null}
    </Layout>
  )
}
