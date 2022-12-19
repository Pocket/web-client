// @refresh reset
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Layout from 'layouts/with-sidebar'
import { SideNav } from 'connectors/side-nav/side-nav'
import { getUserTags } from 'containers/saves/lists/lists-page.state'
import { SavesHeader } from 'components/headers/saves-header'
import { RecentTags } from 'components/tag-lists/recent-tags'
import { TagList } from 'components/tag-lists/tags-list'

export default function TagsPage(props) {
  const { metaData = {}, subset = 'active', filter } = props
  const dispatch = useDispatch()

  const isLoggedIn = useSelector((state) => !!state.user.auth)
  const userStatus = useSelector((state) => state.user.user_status)
  const userTags = useSelector((state) => state.userTags.tagsList)
  const userTagsRecent = useSelector((state) => state.userTags.recentTags)

  const taggedItems = useSelector((state) => state.userTags.itemsWithTags)
  const [value, setValue] = useState('')
  const valueChange = (e) => setValue(e?.target?.value)

  const shouldRender = userStatus !== 'pending'

  useEffect(() => {
    dispatch(getUserTags())
  }, [dispatch])

  return (
    <Layout title={metaData.title} metaData={metaData}>
      <SideNav type="saves" subset={subset} isLoggedIn={isLoggedIn} />

      {shouldRender ? (
        <main className="main">
          <SavesHeader type="saves" subset={'tag-page'} filter={filter} title="tags" />

          {userTagsRecent ? <RecentTags taggedItems={taggedItems} /> : null}
          {userTags ? (
            <TagList userTags={userTags} value={value} valueChange={valueChange} />
          ) : null}
        </main>
      ) : null}
    </Layout>
  )
}
