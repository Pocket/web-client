// @refresh reset
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Layout from 'layouts/with-sidebar'
import { SideNav } from 'connectors/side-nav/side-nav'
import { getMessages } from './messages.state'
import { addMessageItem } from './messages.state'
import { ignoreMessage } from './messages.state'
import { requestConfirmation } from './messages.state'
import { MessagesHeader } from 'components/headers/messages-header'
import { MessageItem } from 'components/messages/messages-item'

export default function Messages(props) {
  const dispatch = useDispatch()

  const isLoggedIn = useSelector((state) => !!state.user.auth)
  const notifications = useSelector((state) => state.messages.notifications)
  const unconfirmedShares = useSelector((state) => state.messages.unconfirmed_shares)

  useEffect(() => {
    dispatch(getMessages())
  }, [dispatch])

  const unconfirmedArray = unconfirmedShares
    ? Object.keys(unconfirmedShares)
    : []

  return (
    <Layout title="Pocket - Messages">
      <SideNav isLoggedIn={isLoggedIn} />

      <main className="main">
        <MessagesHeader title="Activity" />

        {notifications.map(notification => (
          <MessageItem
            key={notification.share_id}
            {...notification}
            addItem={addMessageItem}
            ignoreMessage={ignoreMessage}
          />
        ))}

        {
        //{unconfirmedArray.map(unconfirmed => (
          // <InboxUnconfirmed
          //   key={unconfirmed_shares[unconfirmed].email}
          //   email={unconfirmed_shares[unconfirmed].email}
          //   resendConfirmation={requestConfirmation}
          // />
        //))
      }
      </main>
    </Layout>
  )
}
