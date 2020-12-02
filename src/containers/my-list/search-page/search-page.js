// @refresh reset
// Vendor
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import Layout from 'layouts/with-sidebar'
import { getMylistSearchData } from './search-page.state'
import { appSetSection } from 'connectors/app/app.state'
import { SearchPageHeader } from 'components/headers/search-page-header'

import { VirtualizedList } from 'components/items-layout/virtualized-list'
import { SideNav } from 'connectors/side-nav/side-nav'
import { CallOutBrand } from 'components/call-out/call-out-brand'
import { TaggingModal } from 'connectors/confirm-tags/confirm-tags'
import { DeleteModal } from 'connectors/confirm-delete/confirm-delete'
import { ShareModal } from 'connectors/confirm-share/confirm-share'

export default function Collection(props) {
  const { metaData = {}, filter } = props

  const dispatch = useDispatch()
  const router = useRouter()

  const { query } = router.query
  const subset = 'search'

  const section = filter ? subset + filter : subset

  const items = useSelector((state) => state.myList[section])
  const offset = useSelector((state) => state.myList[`${section}Offset`])
  const total = useSelector((state) => state.myList[`${section}Total`])
  const listMode = useSelector((state) => state.app.listMode)
  const sortOrder = useSelector((state) => state.app.sortOrder)

  const isLoggedIn = useSelector((state) => !!state.user.auth)
  const userStatus = useSelector((state) => state.user.user_status)

  // Check for initial items so we don't over request
  const initialItemsPopulated =
    items?.length && (items?.length >= 18 || total < 18)

  /**
   * Get initial list items. This should only fire once per page load
   * despite the exhaustive dependencies
   * ------------------------------------------------------------------------
   */
  useEffect(() => {
    if (initialItemsPopulated || userStatus === 'pending') return
    dispatch(getMylistSearchData(18, 0, filter, query))
    dispatch(appSetSection(section))
  }, [
    userStatus,
    initialItemsPopulated,
    subset,
    sortOrder,
    filter,
    section,
    query,
    dispatch
  ])

  // useEffect(trackPageView, [])

  /**
   * FUNCTIONAL ACTIONS
   * ------------------------------------------------------------------------
   */
  const loadMore = () => {
    dispatch(getMylistSearchData(45, offset, filter, query))
  }

  const shouldRender = userStatus !== 'pending'
  const type = listMode

  return (
    <Layout title={metaData.title} metaData={metaData}>
      <SideNav subset={subset} isLoggedIn={isLoggedIn} search={query} />

      {shouldRender ? (
        <main className="main">
          {isLoggedIn ? (
            <>
              <SearchPageHeader filter={filter} query={query} />
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
            </>
          ) : (
            <CallOutBrand />
          )}
        </main>
      ) : null}
    </Layout>
  )
}
