// Vendor
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Layout from 'layouts/with-sidebar'
import { getMylistData } from './my-list.state'

import { MyListHeader } from 'components/headers/my-list-header'

import { VirtualizedList } from 'components/items-layout/virtualized-list'
import { SideNav } from 'components/side-nav/side-nav'

export default function Collection(props) {
  const { metaData = {}, subset = 'active', filter } = props

  // useEffect(trackPageView, [])
  const dispatch = useDispatch()
  const section = filter ? subset + filter : subset
  const items = useSelector((state) => state.myList[section])
  const offset = useSelector((state) => state.myList[`${section}Offset`])
  const total = useSelector((state) => state.myList[`${section}Total`])

  // Check if we have requested list items
  useEffect(() => {
    // We grab a small set of items for initial load quickly
    if (!items?.length) {
      dispatch(getMylistData(18, 0, subset, filter))
      return
    }

    // Subsequent runs we make a check to see if we need to prime the list
    const gatherMoreItems = offset === 18 && offset <= total
    if (gatherMoreItems) dispatch(getMylistData(54, offset, subset, filter))

    return
  }, [items])

  // Explicit request to load more items
  const loadMore = () => dispatch(getMylistData(150, offset, subset, filter))

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
