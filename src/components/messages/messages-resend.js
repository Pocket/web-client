import { css } from 'linaria'
import dayjs from 'dayjs'
import { domainForUrl } from 'common/utilities'
import Avatar from 'components/avatar/avatar'
import { Card } from 'components/item-card/my-list/card-message'
import { fontSansSerif, Button } from '@pocket/web-ui'
import { timeRelativeToNow } from 'common/utilities'

const messageWrapper = css`
  font-family: ${fontSansSerif};
`

export const MessageResend = ({ email, resendAction, status }) => {
  if (status === 'failed') {
    return (
      <div className={messageWrapper}>
        <p>Oops! Something went wrong. Please try again later.</p>
      </div>
    )
  }
  else if (status === 'success') {
    return (
      <div className={messageWrapper}>
        <p>Confirmation sent! Please check your email.</p>
      </div>
    )
  }
  return (
    <div className={messageWrapper}>
      <p>
        A friend has shared something with you in Pocket. To view
        it, please confirm your email: {email}
      </p>

      <Button onClick={resendAction}>
        Resend Confirmation
      </Button>
    </div>
  )
}
