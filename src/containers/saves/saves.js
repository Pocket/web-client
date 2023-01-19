import Layout from 'layouts/with-sidebar'
import { useSelector, useDispatch } from 'react-redux'
import { SideNav } from 'connectors/side-nav/side-nav'
import { useRouter } from 'next/router'
import { SavedItems } from 'containers/saves/saved-items/saved-items'
import { TaggingModal } from 'connectors/confirm-tags/confirm-tags'


import { ArchiveModal } from 'connectors/confirm-archive/confirm-archive'
import { FavoriteModal } from 'connectors/confirm-favorite/confirm-favorite'
import { TagDeleteModal } from 'connectors/confirm-tags/confirm-tag-delete'
import { TagEditModal } from 'connectors/confirm-tags/confirm-tag-edit'
import { Toasts } from 'connectors/toasts/toast-list'
import { savedItemsSetSortOrder } from 'containers/saves/saved-items/saved-items.state'
import { savedItemsSetSortBy } from 'containers/saves/saved-items/saved-items.state'
import { SuccessFXA } from 'connectors/fxa-migration-success/success-fxa'

import { TagPageHeader } from 'containers/saves/tagged/tagged-header'
import { SavesHeader } from 'components/headers/saves-header'
import { SearchPageHeader } from 'components/headers/search-page-header'

import { MutationTaggingModal } from 'connectors/confirm-tags/confirm-tag-mutation'
import { BulkFavoriteModal } from 'connectors/confirm-favorite/confirm-bulk-favorite'
import { ConfirmDelete } from 'connectors/confirm/delete'
import { BulkArchiveModal } from 'connectors/confirm-archive/confirm-bulk-archive'
import { ConfirmShare } from 'connectors/confirm/share'

export const Saves = (props) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { metaData = {}, subset: sub = 'active', filter: propFilter, locale } = props
  const { tag, filter: queryFilter, query: searchTerm } = router.query
  const subset = tag ? 'tag' : searchTerm ? 'search' : sub
  const filter = tag ? queryFilter : propFilter
  const selector = tag ? tag : sub

  // Selectors
  const isLoggedIn = useSelector((state) => !!state.user.auth)
  const userStatus = useSelector((state) => state.user.user_status)
  const sortOrder = useSelector((state) => state.pageSavedInfo.sortOrder)
  const featureState = useSelector((state) => state.features)
  const isPremium = useSelector((state) => state.user.premium_status === '1')
  const total = useSelector((state) => state.pageSavedInfo.totalCount)

  // Derived Values
  const shouldRender = userStatus !== 'pending'
  const { flagsReady } = featureState

  const ListHeader = searchTerm ? SearchPageHeader : SavesHeader
  const Header = tag ? TagPageHeader : ListHeader

  // Actions
  const handleNewest = () => dispatch(savedItemsSetSortOrder('DESC'))
  const handleOldest = () => dispatch(savedItemsSetSortOrder('ASC'))
  const handleRelevance = () => dispatch(savedItemsSetSortBy('RELEVANCE'))

  return (
    <Layout title={metaData.title} metaData={metaData} subset={subset} tag={tag}>
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
        />
        {flagsReady && shouldRender ? <SavedItems {...props} /> : null}
      </main>
      <TaggingModal />
      <ArchiveModal />
      <FavoriteModal />
      <TagDeleteModal />
      <TagEditModal />

      <BulkFavoriteModal />
      <ConfirmDelete />
      <BulkArchiveModal />
      <MutationTaggingModal />
      <ConfirmShare />

      <Toasts />
    </Layout>
  )
}
