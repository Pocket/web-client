import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ErrorPage from 'containers/_error/error'
import Layout from 'layouts/with-sidebar'
import { SideNav } from 'connectors/side-nav/side-nav'
import { ListsAllHeader } from 'components/headers/lists-header'
import { EmptyAllLists } from 'components/empty-states/all-lists'
import { listsItemsSetSortOrder } from './lists.state'
import { mutateListCreate } from 'connectors/lists/mutation-create.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

import { CreateListModal } from 'connectors/confirm/create-list'
import { ConfirmListDelete } from 'connectors/confirm/delete-list'
import { getAllListsAction } from './lists.state'
import { ListCard } from 'connectors/lists/list.card'
import { LoaderCentered } from 'components/loader/loader'

import { Toasts } from 'connectors/toasts/toast-list'

import { featureFlagActive } from 'connectors/feature-flags/feature-flags'

export const Lists = () => {
  const dispatch = useDispatch()

  const featureState = useSelector((state) => state.features)
  const enrolledFetched = useSelector((state) => state.pageListsInfo.enrolledFetched)
  const enrolledPilot = useSelector((state) => state.pageListsInfo.enrolled)
  const enrolledRelease = featureFlagActive({ flag: 'lists', featureState })
  const enrolled = enrolledPilot || enrolledRelease

  const listsIds = useSelector((state) => state.pageListsInfo.listsIds)
  const userStatus = useSelector((state) => state.user.user_status)
  const sortOrder = useSelector((state) => state.pageListsInfo.sortOrder)
  const loading = useSelector((state) => state.pageListsInfo.loading)

  const shouldRender = userStatus !== 'pending'
  const ids = sortOrder === 'DESC' ? listsIds : [...listsIds].reverse()
  const showLists = listsIds?.length > 0 && !loading && enrolled

  useEffect(() => {
    if (enrolled) dispatch(getAllListsAction())
  }, [dispatch, enrolled])

  // Actions
  const handleCreateList = (identifier) => {
    dispatch(sendSnowplowEvent(`shareable-list.create.${identifier}`))
    dispatch(mutateListCreate())
  }
  const handleNewest = () => {
    dispatch(sendSnowplowEvent('shareable-list.sort.newest'))
    dispatch(listsItemsSetSortOrder('DESC'))
  }

  const handleOldest = () => {
    dispatch(sendSnowplowEvent('shareable-list.sort.oldest'))
    dispatch(listsItemsSetSortOrder('ASC'))
  }

  if (!enrolledFetched) return null
  if (enrolledFetched && !enrolled) return <ErrorPage statusCode={404} />
  return (
    <Layout selectedNavLink="lists">
      <SideNav type="saves" subset="lists" />

      {shouldRender ? (
        <main className="main">
          <ListsAllHeader
            sortOrder={sortOrder}
            handleCreateList={handleCreateList}
            handleNewest={handleNewest}
            handleOldest={handleOldest}
          />

          {loading ? <LoaderCentered /> : null}

          {showLists ? (
            ids.map((id, index) => <ListCard key={id} id={id} position={index} />)
          ) : (
            <EmptyAllLists handleCreate={handleCreateList} />
          )}
        </main>
      ) : null}

      <CreateListModal />
      <ConfirmListDelete />
      <Toasts />
    </Layout>
  )
}
