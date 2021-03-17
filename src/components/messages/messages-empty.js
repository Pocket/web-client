import { css } from 'linaria'
import { fontSansSerif } from '@pocket/web-ui'
import { MessagesHeader } from 'components/headers/messages-header'
import classNames from 'classnames'
import { Trans, useTranslation } from 'next-i18next'

const emptyWrapper = css`
  font-family: ${fontSansSerif};
`

export const MessageEmpty = () => {
  const { t } = useTranslation()

  return (
    <main className={classNames('main', emptyWrapper)}>
      <MessagesHeader
        title={t('messages:inbox-is-empty', 'Your Inbox is Empty')}
      />
      <p>
        <Trans i18nKey="messages:when-someone-shares">
          When someone shares items with you using Send to Friend, they will
          appear here.
        </Trans>
      </p>
      <p>
        <Trans i18nKey="messages:you-can-send-to-friend">
          You can also use Send to Friend to share items directly to a friend’s
          Pocket. Look for Send to Friend in the Share menu.
        </Trans>
      </p>
    </main>
  )
}
