import { css } from 'linaria'
import { useDispatch, useSelector } from 'react-redux'
import { getBool } from 'common/utilities/get-bool/get-bool'
import { followUser } from 'containers/profile/profile.state'
import { unFollowUser } from 'containers/profile/profile.state'
import Avatar from 'components/avatar/avatar'
import { Button } from 'components/buttons/button'

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

  const name = useSelector((state) => state.userPublicProfile.name)
  const avatarUrl = useSelector((state) => state.userPublicProfile.avatar_url)
  const bio = useSelector((state) => state.userPublicProfile.description)
  const followCount = useSelector((state) => state.userPublicProfile.follow_count)
  const followerCount = useSelector((state) => state.userPublicProfile.follower_count)
  const isFollowing = useSelector((state) => state.userPublicProfile.is_following)
  const uid = useSelector((state) => state.userPublicProfile.uid)
  const isSelf = useSelector((state) => state.user.user_id === uid)

  const followStatus = getBool(isFollowing)
  const followAction = () =>
    !followStatus ? dispatch(followUser(uid)) : dispatch(unFollowUser(uid)) // Not currently reachable due to disabled button

  return (
    <header className={headerStyles}>
      <div className="centered">
        <Avatar src={avatarUrl} size="100px" />
      </div>

      <h1>{name}</h1>
      {bio ? <p>{bio}</p> : null}
      <p className="followers">
        {followerCount} Followers | {followCount} Following
      </p>

      {!isSelf ? (
        <Button disabled={followStatus} onClick={followAction}>
          {followStatus ? 'Following' : 'Follow'}
        </Button>
      ) : null}
    </header>
  )
}
