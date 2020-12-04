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
import { MessageResend } from 'components/messages/messages-resend'
import { MessageEmpty } from 'components/messages/messages-empty'

export default function Messages(props) {
  const dispatch = useDispatch()

  const isLoggedIn = useSelector((state) => !!state.user.auth)
  const notifications = useSelector((state) => state.messages.notifications)
  const unconfirmedShares = useSelector((state) => state.messages.unconfirmed_shares)
  const confirmationStatus = useSelector((state) => state.messages.confirmationStatus)

  useEffect(() => {
    dispatch(getMessages())
  }, [dispatch])

  const unconfirmedArray = unconfirmedShares
    ? Object.keys(unconfirmedShares)
    : []

  const addItem = ({ share_id, item_id, item }) => {
    dispatch(addMessageItem({ share_id, item_id, item }))
  }

  const ignoreItem = ({ share_id, item_id, item }) => {
    dispatch(ignoreMessage({ share_id, item_id, item }))
  }

  const resendAction = () => {
    dispatch(requestConfirmation())
  }

  return (
    <Layout title="Pocket - Messages">
      <SideNav isLoggedIn={isLoggedIn} />

      {notifications.length || unconfirmedArray.length ? (
        <main className="main">
          <MessagesHeader title="Activity" />

          {notifications.map(notification => (
            <MessageItem
              key={notification.share_id}
              {...notification}
              addItem={addItem}
              ignoreItem={ignoreItem}
            />
          ))}

          {unconfirmedArray.map(unconfirmed => (
            <MessageResend
              key={unconfirmedShares[unconfirmed].email}
              email={unconfirmedShares[unconfirmed].email}
              resendAction={resendAction}
              status={confirmationStatus}
            />
          ))}
        </main>
      ) : (
        <MessageEmpty />
      )}
    </Layout>
  )
}
