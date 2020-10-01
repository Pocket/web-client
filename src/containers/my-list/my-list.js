// Vendor
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Layout from 'layouts/main'
import { getMylistData } from './my-list.state'

import { CardList, CardLayout } from 'components/my-list-layouts/card-layout'
import { ItemCard } from 'connectors/my-list-items/item-card'
import { CardPageHeader } from 'components/my-list-layouts/card-page-header'

export default function Collection({ metaData = {} }) {
  // useEffect(trackPageView, [])

  const dispatch = useDispatch()

  // Check if we have requested list items
  const items = useSelector((state) => state.myList.active)
  const offset = useSelector((state) => state.myList.activeOffset)

  useEffect(() => {
    // YES: Great! Let's request any changes since then
    if (items.length) return console.log('We have Items')

    // NO: Cool let's fetch the list
    dispatch(getMylistData())
  }, [items])

  const loadMore = () => {
    dispatch(getMylistData(150, offset))
  }

  return (
    <Layout title={metaData.title} metaData={metaData}>
      <main>
        <CardPageHeader title="My List" />
        {items.length ? (
          <CardLayout>
            <CardList
              Card={ItemCard}
              type="list"
              items={items}
              classNames={['no-border']}
            />
          </CardLayout>
        ) : null}
        {items.length ? (
          <button onClick={loadMore}>Load More Saved Articles</button>
        ) : null}
      </main>
    </Layout>
  )
}
