// Vendor
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import Layout from 'layouts/with-sidebar'
import { getMylistSearchData } from './search-page.state'
import { appSetSection } from 'connectors/app/app.state'
import { SearchPageHeader } from 'components/headers/search-page-header'

import { VirtualizedList } from 'connectors/virtualized/virtualized-list'
import { SideNav } from 'connectors/side-nav/side-nav'
import { CallOutBrand } from 'components/call-out/call-out-brand'
import { TaggingModal } from 'connectors/confirm-tags/confirm-tags'
import { DeleteModal } from 'connectors/confirm-delete/confirm-delete'
import { ShareModal } from 'connectors/confirm-share/confirm-share'
import { Toasts } from 'connectors/toasts/toast-list'

export default function Collection(props) {
  const { metaData = {}, filter } = props

  const dispatch = useDispatch()
  const router = useRouter()

  const { query } = router.query
  const subset = 'search'

  const section = filter ? subset + filter : subset

  const items = useSelector((state) => state.myListSearch[section])
  const offset = useSelector((state) => state.myListSearch[`${section}Offset`])
  const total = useSelector((state) => state.myListSearch[`${section}Total`])
  const listMode = useSelector((state) => state.app.listMode)
  const sortOrder = useSelector((state) => state.myListSearch.sortOrder)
  const isLoggedIn = useSelector((state) => !!state.user.auth)
  const userStatus = useSelector((state) => state.user.user_status)

  const [hasLoaded, setHasLoaded] = useState(false)

  // Check for initial items so we don't over request
  const initialItemsPopulated = items?.length >= 18 || (total && total < 18)

  /**
   * Get initial list items. This should only fire once per page load
   * despite the exhaustive dependencies
   * ------------------------------------------------------------------------
   */
  useEffect(() => {
    if (userStatus === 'pending' || !query || initialItemsPopulated) return
    dispatch(getMylistSearchData(filter, query))
    dispatch(appSetSection(section))
  }, [
    userStatus,
    subset,
    sortOrder,
    filter,
    section,
    query,
    initialItemsPopulated,
    dispatch
  ])

  // useEffect(trackPageView, [])

  /**
   * FUNCTIONAL ACTIONS
   * ------------------------------------------------------------------------
   */
  const loadMore = () => {
    if (hasLoaded) return
    setHasLoaded(true)
    dispatch(getMylistSearchData(filter, query))
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
              <SearchPageHeader filter={filter} query={query} total={total} />
              {items?.length ? (
                <VirtualizedList
                  type={type}
                  section={section}
                  passedItems={items}
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
