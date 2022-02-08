import React from 'react'
import Layout from 'layouts/with-sidebar'
import { useSelector } from 'react-redux'
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

import MyList from 'containers/my-list/my-list'

export const List = (props) => {
  const router = useRouter()

  const { metaData = {}, subset: sub = 'active' } = props
  const { tag } = router.query
  const subset = tag ? 'tag' : sub

  const featureState = useSelector((state) => state.features)
  const useApiNext = featureFlagActive({ flag: 'api.next', featureState })
  const { flagsReady } = featureState

  const isLoggedIn = false
  const ListToRender = useApiNext ? ListSaved : MyList

  return (
    <Layout title={metaData.title} metaData={metaData} subset={subset} tag={tag}>
      <SideNav type="my-list" subset={subset} isLoggedIn={isLoggedIn} tag={tag} />
      {flagsReady ? <ListToRender {...props} /> : null}
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
