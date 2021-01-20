import { css } from 'linaria'
import { Trans } from 'react-i18next'
import dayjs from 'dayjs'
import { domainForUrl } from 'common/utilities'
import Avatar from 'components/avatar/avatar'
import { fontSansSerif, Button } from '@pocket/web-ui'
import { timeRelativeToNow } from 'common/utilities'

const messageWrapper = css`
  font-family: ${fontSansSerif};
`

export const MessageResend = ({ email, resendAction, status }) => {
  if (status === 'failed') {
    return (
      <div className={messageWrapper}>
        <p><Trans>Oops! Something went wrong. Please try again later.</Trans></p>
      </div>
    )
  }
  else if (status === 'success') {
    return (
      <div className={messageWrapper}>
        <p><Trans>Confirmation sent! Please check your email.</Trans></p>
      </div>
    )
  }
  return (
    <div className={messageWrapper}>
      <p>
        <Trans>A friend has shared something with you in Pocket. To view
        it, please confirm your email:</Trans>{' '}
        {email}
      </p>

      <Button onClick={resendAction}>
        <Trans>Resend Confirmation</Trans>
      </Button>
    </div>
  )
}
