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
import { sortOrderSetNew, sortOrderSetOld, sortOrderSetRelevance } from 'connectors/app/app.state'
import { savedItemsSetSortOrder } from 'containers/list-saved/list-saved.state'
import { savedItemsSetSortBy } from 'containers/list-saved/list-saved.state'
import { SuccessFXA } from 'connectors/fxa-migration-success/success-fxa'

import { TagPageHeader } from 'containers/saves/tags-page/tag-page-header'
import { SavesHeader } from 'components/headers/saves-header'
import { SearchPageHeader } from 'components/headers/search-page-header'

import Saves from 'containers/saves/saves'
import SearchList from 'containers/saves/search-page/search-page'

import { MutationTaggingModal } from 'connectors/confirm-tags/confirm-tag-mutation'
import { BulkFavoriteModal } from 'connectors/confirm-favorite/confirm-bulk-favorite'
import { BulkDeleteModal } from 'connectors/confirm-delete/confirm-bulk-delete'
import { BulkArchiveModal } from 'connectors/confirm-archive/confirm-bulk-archive'
import { ShareModalConnector } from 'connectors/share-modal/share-modal'

import { BestOf2022 } from 'connectors/marketing/bestof2022'

export const List = (props) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { metaData = {}, subset: sub = 'active', filter: propFilter, locale } = props
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
  const v3Total = useSelector((state) => state.saves[`${section}Total`])
  const graphTotal = useSelector((state) => state.listSavedPageInfo.totalCount)

  // Derived Values
  const shouldRender = userStatus !== 'pending'
  const useApiNext = featureFlagActive({ flag: 'api.next', featureState })
  const sortOrder = useApiNext ? savedSortOrder : legacySortOrder

  const { flagsReady } = featureState
  const LegacyList = searchTerm ? SearchList : Saves
  const ListToRender = useApiNext ? ListSaved : LegacyList

  const ListHeader = searchTerm ? SearchPageHeader : SavesHeader
  const Header = tag ? TagPageHeader : ListHeader

  //const showBanner = locale === 'de' || locale === 'de-DE' || locale === 'en' || locale === 'en-US'
  const showBanner = featureFlagActive({ flag: 'bestof2022', featureState }) 

  // Actions
  const setNewest = useApiNext ? savedItemsSetSortOrder : sortOrderSetNew
  const setOldest = useApiNext ? savedItemsSetSortOrder : sortOrderSetOld
  const setRelevance = useApiNext ? savedItemsSetSortBy : sortOrderSetRelevance
  const handleNewest = () => dispatch(setNewest('DESC'))
  const handleOldest = () => dispatch(setOldest('ASC'))
  const handleRelevance = () => dispatch(setRelevance('RELEVANCE'))
  const total = useApiNext ? graphTotal : v3Total

  return (
    <>
      {showBanner ? <BestOf2022 locale={locale} /> : null}
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
          {flagsReady && shouldRender ? <ListToRender {...props} /> : null}
        </main>
        <DeleteModal />
        <TaggingModal />
        <ShareModal />
        <ArchiveModal />
        <FavoriteModal />
        <TagDeleteModal />
        <TagEditModal />

        <BulkFavoriteModal />
        <BulkDeleteModal />
        <BulkArchiveModal />
        <MutationTaggingModal />
        <ShareModalConnector />

        <Toasts />
      </Layout>    
    </>
  )
}
