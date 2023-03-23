import { css } from 'linaria'
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
        <span className="emailDisplay">{alias}</span>
        {unconfirmed ? (
          <ErrorIcon
            className={`unconfirmed ${topTooltip}`}
            data-tooltip={t('account:email-unconfirmed', 'Email is unconfirmed')}
          />
        ) : null}
      </div>
      <button className="secondary actionInline" onClick={onRemove}>
        {t('account:remove-alias', 'Remove alias')}
      </button>
      {unconfirmed ? (
        <button onClick={onResend} className="inline subButton">
          {t('account:email-resend-confirmation', 'Re-send email confirmation')}
        </button>
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
          <span className="emailDisplay">{primaryEmail}</span>
          {primaryUnConfirmed ? (
            <ErrorIcon
              className={`unconfirmed ${topTooltip}`}
              data-tooltip={t('account:email-unconfirmed', 'Email is unconfirmed')}
            />
          ) : null}
        </div>

        <button className="secondary actionInline" onClick={onChangeEmail}>
          {t('account:change-email', 'Change Email')}
        </button>

        {primaryUnConfirmed ? (
          <button onClick={resendPrimaryConfirmation} className="inline subButton">
            {t('account:email-resend-confirmation', 'Re-send email confirmation')}
          </button>
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
        <button className="primary actionInline" onClick={onAddEmailAlias}>
          {t('account:add-email', 'Add Email')}
        </button>
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
