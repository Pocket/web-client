import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Layout from 'layouts/with-sidebar'
import { SideNav } from 'connectors/side-nav/side-nav'
import { ListsAllHeader } from 'components/headers/lists-header'
import { EmptyAllLists } from 'components/empty-states/all-lists'
import { listsItemsSetSortOrder } from './lists.state'
import { mutateListAction } from 'connectors/items/mutation-lists.state'
import { CreateListModal } from 'connectors/confirm/create-list'
import { getUserShareableLists } from './lists.state'
import { AllLists } from 'components/shareable-lists/all-lists'

export const Lists = () => {
  const dispatch = useDispatch()

  const userShareableLists = useSelector((state) => state.pageListsInfo.userShareableLists)
  const userStatus = useSelector((state) => state.user.user_status)
  const sortOrder = useSelector((state) => state.pageListsInfo.sortOrder)

  const shouldRender = userStatus !== 'pending'

  const hasLists = userShareableLists?.length > 0

  useEffect(() => {
    dispatch(getUserShareableLists())
  }, [dispatch])

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

          {hasLists ? <AllLists shareableLists={userShareableLists} /> : <EmptyAllLists />}
        </main>
      ) : null}

      <CreateListModal />
    </Layout>
  )
}
