import { css } from 'linaria'
import { getImageCacheUrl } from 'common/utilities'

const rowWrapper = css`
  font-family: "Graphik Web";
  padding: 0 1em;
  display: grid;
  grid-template-columns: 24px auto;
  grid-column-gap: 15px;
  cursor: pointer;
  background-color: var(--color-popoverCanvas);
  color: var(--color-textSecondary);
  &:hover {
    background-color: var(--color-actionPrimarySubdued);
  }

  p {
    margin: 14px 0;
    font-size: 16px;
  }
`

const friendThumbnail = css`
  margin-top: 15px;
  background-size: cover;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`
const friendName = css`
  border-bottom: 1px solid var(--color-dividerTertiary);
  display: grid;
  grid-template-columns: auto 24px;
`

const iconWrapper = css`
  margin-top: 6px;
`

class FriendItem extends React.Component {
  onFriendClick = () => {
    this.props.onToggle(this.props.friend.email)
  }

  render() {
    const { friend, selectedFriends } = this.props

    return (
      <div className={rowWrapper} onClick={this.onFriendClick}>
        <div
          className={friendThumbnail}
          data-test={getImageCacheUrl(friend.avatar_url)}
          style={{ backgroundImage: `url('${getImageCacheUrl(friend.avatar_url)}')`}}
        />
        <div className={friendName}>
          <p>{friend.name}</p>
          <div className={iconWrapper} className={iconWrapper}>
            <input
              type="checkbox"
              checked={selectedFriends?.indexOf(friend.email) > -1}
            />
          </div>
        </div>
      </div>
    )
  }
}

export const FriendList = ({ friends, onToggle, selectedFriends }) => {
  return friends?.map((friend, index) => {
    return (
      <FriendItem
        key={index}
        friend={friend}
        onToggle={onToggle}
        selectedFriends={selectedFriends}
      />
    )
  })
}
