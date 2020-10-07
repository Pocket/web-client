// Vendor
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'

import Layout from 'layouts/main'
import { getMylistData } from './my-list.state'

import { CardPageHeader } from 'components/my-list-layouts/card-page-header'
import { myListContainer } from 'components/my-list-container/my-list-container'
import { myListNavigation } from 'components/my-list-container/my-list-container'
import { myListMain } from 'components/my-list-container/my-list-container'

import { sideNavHeader } from 'components/my-list-side-nav/side-nav'
import { sideNavItem } from 'components/my-list-side-nav/side-nav'
import { ListLayout } from 'components/my-list-layouts/list-layout'

export default function Collection(props) {
  const { metaData = {}, subset = 'active', filter } = props

  // useEffect(trackPageView, [])
  const dispatch = useDispatch()
  const section = filter ? subset + filter : subset
  const items = useSelector((state) => state.myList[section])
  const offset = useSelector((state) => state.myList[`${section}Offset`])
  const total = useSelector((state) => state.myList[`${section}Total`])

  useEffect(() => {
    // Check if we have requested list items
    // YES: Great!
    if (items?.length) {
      // Is this part of the first item grab?

      // YES: Let's hydrate the list a bit more
      if (offset === 18 && offset <= total) {
        dispatch(getMylistData(54, offset, subset, filter))
      }

      // NO: No problem, let's wait for the next explicit request
      return
    }

    // NO: Cool let's get a small set of items to get a fast page load
    dispatch(getMylistData(18, 0, subset, filter))
  }, [items])

  const loadMore = () => {
    dispatch(getMylistData(150, offset, subset, filter))
  }

  const subActive = (sub) => {
    const activeClass = sub === subset ? 'active' : ''
    return `${sideNavItem} ${activeClass}`
  }

  const type = 'grid'
  return (
    <Layout title={metaData.title} metaData={metaData}>
      <div className={myListContainer}>
        <nav role="navigation" className={myListNavigation}>
          <Link href="/my-list">
            <button className={subActive('active')}>Active</button>
          </Link>

          <Link href="/my-list/archive">
            <button className={subActive('archive')}>Archive</button>
          </Link>

          <div className={sideNavHeader}>Filters</div>

          <Link href="/my-list/favorites">
            <button className={subActive('favorites')}>Favorites</button>
          </Link>

          <Link href="/my-list/highlights">
            <button className={subActive('highlights')}>Highlights</button>
          </Link>

          {/*
          <Link href="/my-list/tags">
            <button className={subActive('tags')}>Tags</button>
          </Link>
          */}

          <Link href="/my-list/articles">
            <button className={subActive('articles')}>Articles</button>
          </Link>

          <Link href="/my-list/videos">
            <button className={subActive('videos')}>Videos</button>
          </Link>
        </nav>
        <main className={myListMain}>
          <CardPageHeader subset={subset} filter={filter} />
          {items?.length ? (
            <ListLayout type={type} items={items} loadMore={loadMore} />
          ) : null}
        </main>
      </div>
    </Layout>
  )
}
