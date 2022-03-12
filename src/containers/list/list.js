import React from 'react'
import Layout from 'layouts/with-sidebar'
import { useSelector, useDispatch } from 'react-redux'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'
import { SideNav } from 'connectors/side-nav/side-nav'
import { useRouter } from 'next/router'
import { ListSaved } from 'containers/list-saved/list-saved'
import { TaggingModal } from 'connectors/confirm-tags/confirm-tags'
import { DeleteModal } from 'connectors/confirm-delete/confirm-delete'
import { ShareModal } from 'connectors/confirm-share/confirm-share'
import { ArchiveModal } from 'connectors/confirm-archive/confirm-archive'
import { FavoriteModal } from 'connectors/confirm-favorite/confirm-favorite'
import { TagDeleteModal } from 'connectors/confirm-tags/confirm-tag-delete'
import { TagEditModal } from 'connectors/confirm-tags/confirm-tag-edit'
import { Toasts } from 'connectors/toasts/toast-list'
import { Onboarding } from 'connectors/onboarding/onboarding'
import { sortOrderSetNew, sortOrderSetOld, sortOrderSetRelevance } from 'connectors/app/app.state'
import { savedItemsSetSortOrder } from 'containers/list-saved/list-saved.state'
import { SuccessFXA } from 'connectors/fxa-migration-success/success-fxa'

import { TagPageHeader } from 'containers/my-list/tags-page/tag-page-header'
import { MyListHeader } from 'components/headers/my-list-header'
import { SearchPageHeader } from 'components/headers/search-page-header'

import MyList from 'containers/my-list/my-list'
import SearchList from 'containers/my-list/search-page/search-page'

export const List = (props) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { metaData = {}, subset: sub = 'active', filter: propFilter } = props
  const { tag, filter: queryFilter, query: searchTerm } = router.query
  const subset = tag ? 'tag' : searchTerm ? 'search' : sub
  const filter = tag ? queryFilter : propFilter
  const selector = tag ? tag : sub
  const section = filter ? subset + filter : subset

  // Selectors
  const isLoggedIn = useSelector((state) => !!state.user.auth)
  const userStatus = useSelector((state) => state.user.user_status)
  const sortSubset = useSelector((state) => state.app.section)
  const legacySortOrder = useSelector((state) => state.app.sortOptions[sortSubset] || 'newest')
  const savedSortOrder = useSelector((state) => state.listSavedPageInfo.sortOrder)
  const featureState = useSelector((state) => state.features)
  const isPremium = useSelector((state) => state.user.premium_status === '1')
  const total = useSelector((state) => state.myList[`${section}Total`])

  // Derived Values
  const shouldRender = userStatus !== 'pending'
  const useApiNext = featureFlagActive({ flag: 'api.next', featureState })
  const sortOrder = useApiNext ? savedSortOrder : legacySortOrder

  const { flagsReady } = featureState
  const LegacyList = searchTerm ? SearchList : MyList
  const ListToRender = useApiNext ? ListSaved : LegacyList

  const ListHeader = searchTerm ? SearchPageHeader : MyListHeader
  const Header = tag ? TagPageHeader : ListHeader

  // Actions
  const setNewest = useApiNext ? savedItemsSetSortOrder : sortOrderSetNew
  const setOldest = useApiNext ? savedItemsSetSortOrder : sortOrderSetOld
  const handleNewest = () => dispatch(setNewest('DESC'))
  const handleOldest = () => dispatch(setOldest('ASC'))
  const handleRelevance = () => dispatch(sortOrderSetRelevance())

  return (
    <Layout title={metaData.title} metaData={metaData} subset={subset} tag={tag}>
      <SideNav type="my-list" subset={subset} isLoggedIn={isLoggedIn} tag={tag} />
      <main className="main">
        <SuccessFXA type="my-list" />
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
        {flagsReady && shouldRender ? <ListToRender {...props} /> : null}
      </main>
      <DeleteModal />
      <TaggingModal />
      <ShareModal />
      <ArchiveModal />
      <FavoriteModal />
      <TagDeleteModal />
      <TagEditModal />
      <Toasts />
      <Onboarding type="my-list.flyaway.extensions" />
      <Onboarding type="my-list.flyaway.reader" />
    </Layout>
  )
}
