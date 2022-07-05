import { css } from 'linaria'
import { Button } from 'components/buttons/button'
import { ErrorIcon } from 'components/icons/ErrorIcon'
import { topTooltip } from 'components/tooltip/tooltip'
import { useTranslation, Trans } from 'next-i18next'

const emailStyle = css`
  padding-bottom: 3rem;
  border-bottom: var(--dividerStyle);
  .unconfirmed {
    margin: 0 0 0 0.5rem;
    color: var(--color-error);
  }
  .errorText {
    display: block;
    text-align: left;
    padding: 1rem 0 0;
    color: var(--color-error);
    font-family: var(--fontSansSerif);
    font-size: 0.75rem;
    line-height: 1;
    grid-column: 3 / span 5;
  }
`

const Alias = ({ onRemoveAlias, onResendConfirmation, alias, confirmed }) => {
  const { t } = useTranslation()
  const onRemove = () => onRemoveAlias(alias)
  const onResend = () => onResendConfirmation(alias)
  const unconfirmed = confirmed === '0'

  return (
    <>
      <div className="contentDisplay">
        {alias}{' '}
        {unconfirmed ? (
          <ErrorIcon
            className={`unconfirmed ${topTooltip}`}
            data-tooltip={t('account:email-unconfirmed', 'Email is unconfirmed')}
          />
        ) : null}
      </div>
      <Button variant="secondary" className="actionInline" onClick={onRemove}>
        {t('account:remove-alias', 'Remove alias')}
      </Button>
      {unconfirmed ? (
        <Button variant="inline" onClick={onResend} className="subButton">
          {t('account:email-resend-confirmation', 'Re-send email confirmation')}
        </Button>
      ) : null}
    </>
  )
}

export const EmailAddresses = ({
  primaryEmail,
  onChangeEmail,
  onAddEmailAlias,
  onChangeEmailAlias,
  emailAlias,
  emailAliasError,
  onResendConfirmation,
  onRemoveAlias,
  aliases = {}
}) => {
  const { t } = useTranslation()

  const aliasArray = Object.keys(aliases).filter((alias) => alias !== primaryEmail)
  const primaryUnConfirmed = aliases[primaryEmail]?.confirmed === '0'
  const resendPrimaryConfirmation = () => onResendConfirmation(primaryEmail)

  return (
    <section className={emailStyle}>
      <h2 id="email">{t('account:email-addresses', 'Email Addresses')}</h2>
      <div className="sectionBody emailBody">
        <label htmlFor="primaryEmail">{t('account:email-primary', 'Primary Email')}</label>
        <div className="contentDisplay">
          {primaryEmail}{' '}
          {primaryUnConfirmed ? (
            <ErrorIcon
              className={`unconfirmed ${topTooltip}`}
              data-tooltip={t('account:email-unconfirmed', 'Email is unconfirmed')}
            />
          ) : null}
        </div>

        <Button variant="secondary" className="actionInline" onClick={onChangeEmail}>
          {t('account:change-email', 'Change Email')}
        </Button>

        {primaryUnConfirmed ? (
          <Button variant="inline" onClick={resendPrimaryConfirmation} className="subButton">
            {t('account:email-resend-confirmation', 'Re-send email confirmation')}
          </Button>
        ) : null}

        {aliasArray.map((alias) => (
          <Alias
            key={alias}
            alias={alias}
            confirmed={aliases[alias].confirmed}
            onRemoveAlias={onRemoveAlias}
            onResendConfirmation={onResendConfirmation}
          />
        ))}
        <input
          type="text"
          name="addEmail"
          placeholder={t('account:add-new-email', 'Add new email address')}
          onChange={onChangeEmailAlias}
          value={emailAlias}
        />
        <Button variant="primary" className="actionInline" onClick={onAddEmailAlias}>
          {t('account:add-email', 'Add Email')}
        </Button>
        {emailAliasError ? <span className="errorText">{emailAliasError}</span> : null}
        <div className="contextCopy">
          <Trans i18nKey="account:additional-email-disclaimer">
            Adding additional email addresses to your account will:
            <ul>
              <li>Allow you to log in with that email as well as your primary email </li>
              <li>Allow friends to share pocket links to any of your account emails </li>
              <li>Save links emailed to add@getpocket.com from any account email</li>
            </ul>
          </Trans>
        </div>
      </div>
    </section>
  )
}
