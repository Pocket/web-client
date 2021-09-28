import { useSelector, useDispatch } from 'react-redux'

import { RSSFeeds as RSSComponent } from 'components/account/rss/rss'

export const RSSFeeds = () => {
  const dispatch = useDispatch()

  // Profile content
  const userName = useSelector((state) => state?.userProfile?.username)

  return (
    <>
      <RSSComponent userName={userName} />
    </>
  )
}
