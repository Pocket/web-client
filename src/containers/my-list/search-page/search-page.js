// Vendor
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useHasChanged } from 'common/utilities/hooks/has-changed'

import Layout from 'layouts/with-sidebar'
import { getMylistSearchData } from 'containers/my-list/my-list.state'
import { appSetSection } from 'connectors/app/app.state'
import { SearchPageHeader } from 'components/headers/search-page-header'

import { VirtualizedList } from 'connectors/virtualized/virtualized-list'
import { SideNav } from 'connectors/side-nav/side-nav'
import { CallOutBrand } from 'components/call-out/call-out-brand'
import { TaggingModal } from 'connectors/confirm-tags/confirm-tags'
import { DeleteModal } from 'connectors/confirm-delete/confirm-delete'
import { ShareModal } from 'connectors/confirm-share/confirm-share'
import { Toasts } from 'connectors/toasts/toast-list'
import { sortOrderSetNew, sortOrderSetOld, sortOrderSetRelevance } from 'connectors/app/app.state'

export default function Collection(props) {
  const { metaData = {}, filter } = props

  const dispatch = useDispatch()
  const router = useRouter()

  const { query } = router.query
  const queryChange = useHasChanged(query)
  const subset = 'search'

  const section = filter ? subset + filter : subset

  const items = useSelector((state) => state.myList[section])
  const offset = useSelector((state) => state.myList[`${section}Offset`])
  const total = useSelector((state) => state.myList[`${section}Total`])
  const prevQuery = useSelector((state) => state.myList.query)
  const listMode = useSelector((state) => state.app.listMode)
  const isLoggedIn = useSelector((state) => !!state.user.auth)
  const userStatus = useSelector((state) => state.user.user_status)
  const sortSubset = useSelector((state) => state.app.section)
  const sortOrder = useSelector((state) => state.app.sortOptions[sortSubset] || 'newest')
  const isPremium = useSelector((state) => state.user.premium_status === '1')

  const handleNewest = () => dispatch(sortOrderSetNew())
  const handleOldest = () => dispatch(sortOrderSetOld())
  const handleRelevance = () => dispatch(sortOrderSetRelevance())

  // Check for initial items so we don't over request
  const initialItemsPopulated = items?.length || total === 0

  /**
   * Get initial list items. This should only fire once per page load
   * despite the exhaustive dependencies
   * ------------------------------------------------------------------------
   */
  useEffect(() => {
    if (userStatus === 'pending' || !query || initialItemsPopulated) return
    dispatch(getMylistSearchData(filter, query))
    dispatch(appSetSection(section))
  }, [userStatus, subset, sortOrder, filter, section, query, initialItemsPopulated, dispatch])

  useEffect(() => {
    if (queryChange || prevQuery !== query) {
      dispatch(getMylistSearchData(filter, query))
    }
  }, [queryChange, prevQuery])

  /**
   * FUNCTIONAL ACTIONS
   * ------------------------------------------------------------------------
   */
  const loadMore = () => {
    if (offset >= total) return
    dispatch(getMylistSearchData(filter, query, offset))
  }

  const shouldRender = userStatus !== 'pending'
  const type = listMode

  return (
    <Layout title={metaData.title} metaData={metaData}>
      <SideNav type="my-list" subset={subset} isLoggedIn={isLoggedIn} search={query} />

      {shouldRender ? (
        <main className="main">
          {isLoggedIn ? (
            <>
              <SearchPageHeader
                subset={subset}
                filter={filter}
                query={query}
                total={total}
                sortOrder={sortOrder}
                isPremium={isPremium}
                handleNewest={handleNewest}
                handleOldest={handleOldest}
                handleRelevance={handleRelevance}
              />
              {items?.length ? (
                <VirtualizedList type={type} section={section} loadMore={loadMore} />
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
