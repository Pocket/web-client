import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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

export const Lists = () => {
  const dispatch = useDispatch()

  const enrolledFetched = useSelector((state) => state.pageListsInfo.enrolledFetched)

  const listsIds = useSelector((state) => state.pageListsInfo.listsIds)
  const userStatus = useSelector((state) => state.user.user_status)
  const sortOrder = useSelector((state) => state.pageListsInfo.sortOrder)
  const loading = useSelector((state) => state.pageListsInfo.loading)

  const shouldRender = userStatus !== 'pending'
  const ids = sortOrder === 'DESC' ? listsIds : [...listsIds].reverse()
  const showLists = listsIds?.length > 0 && !loading

  useEffect(() => {
    dispatch(getAllListsAction())
  }, [dispatch])

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
