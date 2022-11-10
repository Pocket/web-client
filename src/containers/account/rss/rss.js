import { useSelector, useDispatch } from 'react-redux'
import { RSSFeeds as RSSComponent } from 'components/account/rss/rss'
import { updateUsername } from 'containers/account/profile/profile.state'

export const RSSFeeds = () => {
  const dispatch = useDispatch()
  
  // Profile content
  const userName = useSelector((state) => state?.userProfile?.username)

  const onChangeUsername = () => dispatch(updateUsername())

  return (
    <>
      <RSSComponent userName={userName} onChangeUsername={onChangeUsername}  />
    </>
  )
}
