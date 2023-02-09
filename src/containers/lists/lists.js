import { useSelector, useDispatch } from 'react-redux'
import Layout from 'layouts/with-sidebar'
import { SideNav } from 'connectors/side-nav/side-nav'
import { ListsHeader } from 'components/headers/lists-header'
import { listsItemsSetSortOrder } from './lists.state'

export const Lists = () => {
  const dispatch = useDispatch()

  const userStatus = useSelector((state) => state.user.user_status)
  const sortOrder = useSelector((state) => state.pageListsInfo.sortOrder)

  const shouldRender = userStatus !== 'pending'

  // Actions
  const handleCreateList = () => { }
  const handleNewest = () => dispatch(listsItemsSetSortOrder('DESC'))
  const handleOldest = () => dispatch(listsItemsSetSortOrder('ASC'))

  return (
    <Layout>
      <SideNav type="saves" />

      {shouldRender ? (
        <main className="main">
          <ListsHeader
            sortOrder={sortOrder}
            handleCreateList={handleCreateList}
            handleNewest={handleNewest}
            handleOldest={handleOldest}
          />

          {/* List Component */}
        </main>
      ) : null}
    </Layout>
  )
}
