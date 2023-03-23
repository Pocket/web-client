import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ErrorPage from 'containers/_error/error.js'
import Layout from 'layouts/with-sidebar'
import { SideNav } from 'connectors/side-nav/side-nav'
import { ListsAllHeader } from 'components/headers/lists-header'
import { EmptyAllLists } from 'components/empty-states/all-lists'
import { listsItemsSetSortOrder } from './lists.state'
import { mutateListCreate } from 'connectors/lists/mutation-create.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

import { CreateListModal } from 'connectors/confirm/create-list'
import { ConfirmListDelete } from 'connectors/confirm/delete-list'
import { getUserShareableLists } from './lists.state'
import { ListCard } from 'connectors/lists/list-card'
import { LoaderCentered } from 'components/loader/loader'

import { Toasts } from 'connectors/toasts/toast-list'

export const Lists = () => {
  const dispatch = useDispatch()

  const enrolled = useSelector((state) => state.pageListsInfo.enrolled)
  const enrolledFetched = useSelector((state) => state.pageListsInfo.enrolledFetched)
  const listIds = useSelector((state) => state.pageListsIds)
  const userStatus = useSelector((state) => state.user.user_status)
  const sortOrder = useSelector((state) => state.pageListsInfo.sortOrder)
  const loading = useSelector((state) => state.pageListsInfo.loading)

  const shouldRender = userStatus !== 'pending'

  const showLists = listIds?.length > 0 && !loading

  useEffect(() => {
    if (enrolled) dispatch(getUserShareableLists())
  }, [dispatch, enrolled])

  // Actions
  const handleCreateList = () => {
    dispatch(sendSnowplowEvent('shareable-list.create.header'))
    dispatch(mutateListCreate())
  }
  const handleNewest = () => dispatch(listsItemsSetSortOrder('DESC'))
  const handleOldest = () => dispatch(listsItemsSetSortOrder('ASC'))

  if (!enrolledFetched) return null
  if (enrolledFetched && !enrolled) return <ErrorPage statusCode={404} />
  return (
    <Layout>
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

          {showLists
            ? listIds.map((id) => <ListCard key={id} id={id} />)
            : <EmptyAllLists handleCreate={handleCreateList} />}
        </main>
      ) : null}

      <CreateListModal />
      <ConfirmListDelete />
      <Toasts />
    </Layout>
  )
}
