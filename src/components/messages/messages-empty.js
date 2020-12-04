import { css } from 'linaria'
import { fontSansSerif } from '@pocket/web-ui'
import { MessagesHeader } from 'components/headers/messages-header'
import classNames from 'classnames'

const emptyWrapper = css`
  font-family: ${fontSansSerif};
`

export const MessageEmpty = () => (
  <main className={classNames('main', emptyWrapper)}>
    <MessagesHeader title="Your Inbox is Empty" />
    <p>
      When someone share items with you using Send to Friend, they will
      appear here.
    </p>
    <p>
      You can also use Send to Friend to share items directly to a
      friend’s Pocket. Look for Send to Friend in the Share menu.
    </p>
  </main>
)
