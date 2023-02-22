import { useSelector, useDispatch } from 'react-redux'
import Layout from 'layouts/with-sidebar'
import { SideNav } from 'connectors/side-nav/side-nav'
import { ListsAllHeader } from 'components/headers/lists-header'
import { EmptyAllLists } from 'components/empty-states/all-lists'
import { listsItemsSetSortOrder } from './lists.state'
import { mutateListAction } from 'connectors/items/mutation-lists.state'
import { CreateListModal } from 'connectors/confirm/create-list'

export const Lists = () => {
  const dispatch = useDispatch()

  const userStatus = useSelector((state) => state.user.user_status)
  const sortOrder = useSelector((state) => state.pageListsInfo.sortOrder)

  const shouldRender = userStatus !== 'pending'

  // Actions
  const handleCreateList = () => dispatch(mutateListAction())
  const handleNewest = () => dispatch(listsItemsSetSortOrder('DESC'))
  const handleOldest = () => dispatch(listsItemsSetSortOrder('ASC'))

  return (
    <Layout>
      <SideNav type="saves" />

      {shouldRender ? (
        <main className="main">
          <ListsAllHeader
            sortOrder={sortOrder}
            handleCreateList={handleCreateList}
            handleNewest={handleNewest}
            handleOldest={handleOldest}
          />

          {/* List Component */}
          <EmptyAllLists />

        </main>
      ) : null}

      <CreateListModal />
    </Layout>
  )
}
