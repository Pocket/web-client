// @refresh reset
// Vendor
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import Layout from 'layouts/with-sidebar'
import { getMylistData } from './my-list.state'
import { updateMyListData } from './my-list.state'
import { appSetSection } from 'connectors/app/app.state'
import { MyListHeader } from 'components/headers/my-list-header'

import { VirtualizedList } from 'components/items-layout/virtualized-list'
import { SideNav } from 'components/side-nav/side-nav'

export default function Collection(props) {
  const { metaData = {}, subset = 'active', filter } = props

  // useEffect(trackPageView, [])
  const dispatch = useDispatch()
  const router = useRouter()

  const section = filter ? subset + filter : subset
  const items = useSelector((state) => state.myList[section])
  const offset = useSelector((state) => state.myList[`${section}Offset`])
  const total = useSelector((state) => state.myList[`${section}Total`])
  const since = useSelector((state) => state.myList[`${section}Since`])

  useEffect(() => {
    const handleFocus = () => {
      if (!since) return
      dispatch(updateMyListData(since, subset, filter))
    }

    // Adding new event listeners
    window.addEventListener('focus', handleFocus)

    // Remove event listeners when it is unmounted
    return () => {
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  // Check if we have requested list items
  useEffect(() => {
    dispatch(getMylistData(18, 0, subset, filter))
    dispatch(appSetSection(section))
  }, [])

  useEffect(() => {
    // Check if we are navigating to a route with items in place
    if (!since) {
      dispatch(getMylistData(18, 0, subset, filter))
      return
    }

    // If items are already in place, we want to know if anything has changed
    // since the last time we fetched the list (operations in other pages or apps)
    dispatch(updateMyListData(since, subset, filter))
  }, [router.pathname, dispatch])

  // Explicit request to load more items
  const loadMore = () => dispatch(getMylistData(150, offset, subset, filter))

  // TODO: Adjust this to use app state
  const type = 'grid'

  return (
    <Layout title={metaData.title} metaData={metaData}>
      <SideNav subset={subset} />
      <main className="main">
        <MyListHeader subset={subset} filter={filter} />
        {items?.length ? (
          <VirtualizedList type={type} items={items} loadMore={loadMore} />
        ) : null}
      </main>
    </Layout>
  )
}
