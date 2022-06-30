import { css } from 'linaria'
import { Trans } from 'next-i18next'
import { Button } from 'components/buttons/button'

const messageWrapper = css`
  font-family: var(--fontSansSerif);
`

export const MessageResend = ({ email, resendAction, status }) => {
  if (status === 'failed') {
    return (
      <div className={messageWrapper}>
        <p>
          <Trans i18nKey="messages:oops">Oops! Something went wrong. Please try again later.</Trans>
        </p>
      </div>
    )
  } else if (status === 'success') {
    return (
      <div className={messageWrapper}>
        <p>
          <Trans i18nKey="messages:confirmation">Confirmation sent! Please check your email.</Trans>
        </p>
      </div>
    )
  }
  return (
    <div className={messageWrapper}>
      <p>
        <Trans i18nKey="messages:a-friend-shared">
          A friend has shared something with you in Pocket. To view it, please confirm your email:
        </Trans>{' '}
        {email}
      </p>

      <Button onClick={resendAction}>
        <Trans i18nKey="messages:resend-confirmation">Resend Confirmation</Trans>
      </Button>
    </div>
  )
}
