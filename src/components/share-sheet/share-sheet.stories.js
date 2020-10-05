import { FriendList } from './share-sheet.friends'
import { ShareSheet } from './share-sheet'
import { useState } from 'react'
import FRIEND_LIST from 'mock/friends.json'

export default {
  title: 'Components/ShareSheet'
}

const { recent_friends, auto_complete_emails } = FRIEND_LIST

const FriendWrapper = () => {
  const [friends, setFriends] = useState([])

  const onToggle = email => {
    if (friends.indexOf(email) > -1) {
      setFriends(friends.filter(addr => addr !== email))
    } else {
      setFriends([...friends, email])
    }
  }

  return (
    <FriendList
      friends={recent_friends}
      selectedFriends={friends}
      onToggle={onToggle}
    />
  )
}
export const friendList = () => <FriendWrapper />


const mockItem = {
  thumbnail: 'http://www.fillmurray.com/500/500',
  title: 'Consistent Design Systems in Sketch With Atomic Design and the Auto-Layout Plugin',
  domain: 'css-tricks.com',
  recent_friends,
  auto_complete_emails
}
export const recommend = () => (
  <ShareSheet {...mockItem} recommend="recommend" />
)
export const recommendWithQuote = () => (
  <ShareSheet
    {...mockItem}
    quote="Real cool article, brosef."
    recommend="recommend" />
)
export const recommendNoThumbnail = () => (
  <ShareSheet
    {...mockItem}
    thumbnail={null}
    quote="Real cool article, brosef."
    recommend="recommend" />
)

export const sendToFriend = () => (
  <ShareSheet {...mockItem} />
)
export const sendWithQuote = () => (
  <ShareSheet {...mockItem} quote="Real cool article, brosef." />
)
