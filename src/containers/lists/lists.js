import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Layout from 'layouts/with-sidebar'
import { SideNav } from 'connectors/side-nav/side-nav'
import { ListsAllHeader } from 'components/headers/lists-header'
import { EmptyAllLists } from 'components/empty-states/all-lists'
import { listsItemsSetSortOrder } from './lists.state'
import { mutateListAction } from 'connectors/lists/mutation-create.state'
import { CreateListModal } from 'connectors/confirm/create-list'
import { getUserShareableLists } from './lists.state'
import { ListCard } from 'connectors/lists/list-card'
import { LoaderCentered } from 'components/loader/loader'

export const Lists = () => {
  const dispatch = useDispatch()

  const userShareableLists = useSelector((state) => state.pageListsInfo.userShareableLists)
  const userStatus = useSelector((state) => state.user.user_status)
  const sortOrder = useSelector((state) => state.pageListsInfo.sortOrder)
  const loading = useSelector((state) => state.pageListsInfo.loading)

  const shouldRender = userStatus !== 'pending'

  const showLists = listIds?.length > 0 && !loading

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

          {loading ? <LoaderCentered /> : null}

          {showLists ? listIds.map((id) => <ListCard key={id} id={id} />) : <EmptyAllLists />}
        </main>
      ) : null}

      <CreateListModal />
    </Layout>
  )
}
