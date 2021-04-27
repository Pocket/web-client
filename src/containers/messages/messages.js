// @refresh reset
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import Layout from 'layouts/with-sidebar'
import { SideNav } from 'connectors/side-nav/side-nav'
import { getMessages } from './user-messages.state'
import { addMessageItem } from './user-messages.state'
import { ignoreMessage } from './user-messages.state'
import { requestConfirmation } from './user-messages.state'
import { MessagesHeader } from 'components/headers/messages-header'
import { MessageItem } from 'components/messages/messages-item'
import { MessageResend } from 'components/messages/messages-resend'
import { MessageEmpty } from 'components/messages/messages-empty'
import { Toasts } from 'connectors/toasts/toast-list'

export default function Messages(props) {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const isLoggedIn = useSelector((state) => !!state.user.auth)
  const hydrated = useSelector((state) => state.userMessages.hydrated)
  const notifications = useSelector((state) => state.userMessages.notifications)
  const unconfirmedShares = useSelector((state) => state.userMessages.unconfirmed_shares)
  const confirmationStatus = useSelector((state) => state.userMessages.confirmationStatus)
  const itemsById = useSelector((state) => state.userMessages.itemsById)

  useEffect(() => {
    dispatch(getMessages())
  }, [dispatch])

  const unconfirmedArray = unconfirmedShares ? Object.keys(unconfirmedShares) : []

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
    <Layout title={`Pocket - ${t('messages:messages', 'Messages')}`}>
      <SideNav isLoggedIn={isLoggedIn} />

      {hydrated ? (
        notifications.length || unconfirmedArray.length ? (
          <main className="main">
            <MessagesHeader title={t('messages:activity', 'Activity')} />

            {notifications.map((notification) => (
              <MessageItem
                key={notification.share_id}
                {...notification}
                item={itemsById[notification.item_id]}
                addItem={addItem}
                ignoreItem={ignoreItem}
              />
            ))}

            {unconfirmedArray.map((unconfirmed) => (
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
        )
      ) : null}
      <Toasts />
    </Layout>
  )
}
