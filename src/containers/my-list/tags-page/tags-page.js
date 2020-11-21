// @refresh reset
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { matchSorter } from 'match-sorter'

import Layout from 'layouts/with-sidebar'
import { SideNav } from 'components/side-nav/side-nav'
import { getUserTags } from './tags-page.state'
import { Pill } from '@pocket/web-ui'
import { pillboxStyle } from 'components/topics-pillbox/topics-pillbox'
import { MyListHeader } from 'components/headers/my-list-header'
import { RecentTags } from './recent-tags'

export default function TagsPage(props) {
  const { metaData = {}, subset = 'active', filter } = props
  const dispatch = useDispatch()

  const isLoggedIn = useSelector((state) => !!state.user.auth)
  const userStatus = useSelector((state) => state.user.user_status)
  const userTags = useSelector((state) => state.userTags.tagsList)
  const userTagsRecent = useSelector((state) => state.userTags.recentTags)
  const userTagsWithItems = useSelector((state) => state.userTags.tagsWithItems)

  const [value, setValue] = useState('')
  const valueChange = (e) => setValue(e.target.value)

  const shouldRender = userStatus !== 'pending'

  useEffect(() => {
    dispatch(getUserTags())
  }, [dispatch])

  const sortedTags = matchSorter(userTags, value).slice(0, 5)

  return (
    <Layout title={metaData.title} metaData={metaData}>
      <SideNav subset={subset} isLoggedIn={isLoggedIn} />

      {shouldRender ? (
        <main className="main">
          <MyListHeader subset={'tags'} filter={filter} />
          <div style={{ paddingBottom: '2rem' }}>
            <input
              value={value}
              onChange={valueChange}
              type="text"
              placeholder="Search for your tags"
            />
          </div>
          <div className={pillboxStyle}>
            <ul>
              {value.length ? (
                <>
                  <li>
                    <Pill>un-tagged</Pill>
                  </li>
                  {sortedTags.map((tag) => (
                    <li key={tag}>
                      <Pill>{userTagsWithItems[tag]}</Pill>
                    </li>
                  ))}
                </>
              ) : null}
            </ul>
          </div>
          {userTagsRecent ? <RecentTags /> : null}
        </main>
      ) : null}
    </Layout>
  )
}
