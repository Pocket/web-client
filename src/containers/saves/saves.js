import Layout from 'layouts/with-sidebar'
import { useSelector, useDispatch } from 'react-redux'
import { SideNav } from 'connectors/side-nav/side-nav'
import { useRouter } from 'next/router'
import { SavedItems } from 'containers/saves/saved-items/saved-items'

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { Toasts } from 'connectors/toasts/toast-list'
import { savedItemsSetSortOrder } from 'containers/saves/saved-items/saved-items.state'
import { savedItemsSetSortBy } from 'containers/saves/saved-items/saved-items.state'
import { SuccessFXA } from 'components/snackbar/success-fxa'

import { TagPageHeader } from 'containers/saves/tagged/tagged-header'
import { SavesHeader } from 'components/headers/saves-header'
import { SearchPageHeader } from 'components/headers/search-page-header'

import { ConfirmTagging } from 'connectors/confirm/tagging'
import { ConfirmFavorite } from 'connectors/confirm/favorite'
import { ConfirmDelete } from 'connectors/confirm/delete'
import { ConfirmArchive } from 'connectors/confirm/archive'
import { ConfirmShare } from 'connectors/confirm/share'
import { ConfirmTagEdit } from 'connectors/confirm/tag-edit'
import { ConfirmTagDelete } from 'connectors/confirm/tag-delete'
import { ConfirmAddToList } from 'connectors/confirm/add-to-list'
import { CreateListModal } from 'connectors/confirm/create-list'

import { mutateListCreate } from 'connectors/lists/mutation-create.state'

const headerSelector = (searchTerm, tag, subset) => {
  if (searchTerm) return SearchPageHeader
  if (tag) return TagPageHeader
  if (subset === 'filter') return SearchPageHeader
  return SavesHeader
}

export const Saves = (props) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { metaData = {}, subset: sub = 'active', filter: propFilter } = props
  const { tag, filter: queryFilter, query: searchTerm } = router.query
  const subset = tag ? 'tag' : searchTerm ? 'search' : sub
  const selectedNavLink = subset === 'unread' ? 'saves' : subset
  const filter = tag ? queryFilter : propFilter
  const selector = tag ? tag : sub

  // Selectors
  const isLoggedIn = useSelector((state) => !!state.user.auth)
  const userStatus = useSelector((state) => state.user.user_status)
  const sortOrder = useSelector((state) => state.pageSavedInfo.sortOrder)
  const featureState = useSelector((state) => state.features)
  const isPremium = useSelector((state) => state.user.premium_status === '1')
  const total = useSelector((state) => state.pageSavedInfo.totalCount)
  const inBulkEdit = useSelector((state) => state?.app?.mode === 'bulk')

  // Derived Values
  const shouldRender = userStatus !== 'pending'
  const { flagsReady } = featureState

  const Header = headerSelector(searchTerm, tag, subset)

  // Actions
  const handleNewest = () => dispatch(savedItemsSetSortOrder('DESC'))
  const handleOldest = () => dispatch(savedItemsSetSortOrder('ASC'))
  const handleRelevance = () => dispatch(savedItemsSetSortBy('RELEVANCE'))
  const handleCreateList = () => {
    dispatch(sendSnowplowEvent('shareable-list.create.header'))
    dispatch(mutateListCreate())
  }

  return (
    <Layout
      title={metaData.title}
      metaData={metaData}
      selectedNavLink={selectedNavLink}
      subset={subset}
      tag={tag}>
      <SideNav type="saves" subset={subset} isLoggedIn={isLoggedIn} tag={tag} />
      <main className="main">
        <SuccessFXA type="saves" />
        <Header
          subset={subset}
          title={selector}
          filter={filter}
          tag={tag}
          total={total}
          query={searchTerm}
          sortOrder={sortOrder}
          handleNewest={handleNewest}
          handleOldest={handleOldest}
          isPremium={isPremium}
          handleRelevance={handleRelevance}
          handleCreateList={handleCreateList}
          inBulkEdit={inBulkEdit}
        />
        {flagsReady && shouldRender ? <SavedItems {...props} /> : null}
      </main>

      <ConfirmFavorite />
      <ConfirmDelete />
      <ConfirmArchive />
      <ConfirmTagging />
      <ConfirmShare />
      <ConfirmTagEdit />
      <ConfirmTagDelete />
      <ConfirmAddToList />
      <CreateListModal />

      <Toasts />
    </Layout>
  )
}
