import { Friends } from './share-sheet.friends'
import { SendToFriend } from './share-sheet'
import { useState } from 'react'
import FRIEND_LIST from 'mock/friends.json'

export default {
  title: 'Components/ShareSheet'
}

const { recent_friends, auto_complete_emails } = FRIEND_LIST

const FriendWrapper = () => {
  const [friends, setFriends] = useState([])

  const onToggle = (email) => {
    if (friends.indexOf(email) > -1) {
      setFriends(friends.filter((addr) => addr !== email))
    } else {
      setFriends([...friends, email])
    }
  }

  return (
    <Friends
      friends={recent_friends}
      selectedFriends={friends}
      onToggle={onToggle}
    />
  )
}
export const friendList = () => <FriendWrapper />

const mockItem = {
  thumbnail: 'http://www.fillmurray.com/500/500',
  title:
    'Consistent Design Systems in Sketch With Atomic Design and the Auto-Layout Plugin',
  domain: 'css-tricks.com',
  recentFriends: recent_friends,
  autoCompleteEmails: auto_complete_emails
}
export const recommend = () => (
  <SendToFriend
    {...mockItem}
    isOpen
    appRootSelector="#root"
    recommend="recommend"
  />
)
export const recommendWithQuote = () => (
  <SendToFriend
    {...mockItem}
    isOpen
    appRootSelector="#root"
    quote="Real cool article, brosef."
    recommend="recommend"
  />
)
export const recommendNoThumbnail = () => (
  <SendToFriend
    {...mockItem}
    isOpen
    appRootSelector="#root"
    thumbnail={null}
    quote="Real cool article, brosef."
    recommend="recommend"
  />
)

export const sendToFriend = () => (
  <SendToFriend {...mockItem} isOpen appRootSelector="#root" />
)
export const sendWithQuote = () => (
  <SendToFriend
    {...mockItem}
    isOpen
    appRootSelector="#root"
    quote="Real cool article, brosef."
  />
)
