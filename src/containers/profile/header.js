import { css } from 'linaria'
import { useDispatch, useSelector } from 'react-redux'
import { getBool } from 'common/utilities'
import { followUser } from 'containers/profile/profile.state'
import { unFollowUser } from 'containers/profile/profile.state'
import Avatar from 'components/avatar/avatar'
import { Button } from '@pocket/web-ui'

const headerStyles = css`
  text-align: center;
  font-family: 'Graphik Web';
  margin-bottom: 2.5rem;

  .centered {
    display: inline-block;
    margin: 0 auto 1rem;
  }

  h1 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1rem;
  }

  .followers {
    color: var(--color-textSecondary);
  }
`

export const ProfileHeader = () => {
  const dispatch = useDispatch()

  const name = useSelector((state) => state.userProfile.name)
  const avatarUrl = useSelector((state) => state.userProfile.avatar_url)
  const bio = useSelector((state) => state.userProfile.description)
  const followCount = useSelector((state) => state.userProfile.follow_count)
  const followerCount = useSelector((state) => state.userProfile.follower_count)
  const isFollowing = useSelector((state) => state.userProfile.is_following)
  const uid = useSelector((state) => state.userProfile.uid)
  const isSelf = useSelector((state) => state.user.user_id === uid)

  const followStatus = getBool(isFollowing)
  const followAction = () => (!followStatus)
    ? dispatch(followUser(uid))
    : dispatch(unFollowUser(uid)) // Not currently reachable due to disabled button

  return (
    <header className={headerStyles}>
      <div className="centered">
        <Avatar src={avatarUrl} size="100px" />
      </div>

      <h1>{name}</h1>
      { bio ? <p>{bio}</p> : null}
      <p className="followers">{followerCount} Followers | {followCount} Following</p>

      { !isSelf ? (
        <Button disabled={followStatus} onClick={followAction}>
          {followStatus ? `Following` : `Follow`}
        </Button>
      ) : null}
    </header>
  )
}
