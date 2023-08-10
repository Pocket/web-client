import { useState } from 'react'
import { EmailAddresses } from 'components/account/email/addresses'

import { EmailModal } from 'containers/account/email/confirm-email'
import { updatePrimaryEmail } from 'containers/account/email/email.state'
import { addEmailAliasRequest } from 'containers/account/email/email.state'
import { removeEmailAliasRequest } from 'containers/account/email/email.state'
import { resendEmailConfirmation } from 'containers/account/email/email.state'

import { useSelector, useDispatch } from 'react-redux'

import { errorCodes } from 'common/errors'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'

export const Email = () => {
  const dispatch = useDispatch()

  const [emailAlias, setEmailAlias] = useState('')
  const primaryEmail = useSelector((state) => state?.userEmail?.email)
  const aliasError = useSelector((state) => state?.userEmail?.aliasError)
  const aliases = useSelector((state) => state?.userEmail?.aliases)
  const featureState = useSelector((state) => state.features)
  const onChangeEmailAlias = (e) => setEmailAlias(e.target.value)

  const onResendConfirmation = (email) => dispatch(resendEmailConfirmation(email))
  const onChangeEmail = () => dispatch(updatePrimaryEmail())
  const onAddEmailAlias = () => {
    dispatch(addEmailAliasRequest(emailAlias))
    setEmailAlias('')
  }
  const onRemoveAlias = (email) => dispatch(removeEmailAliasRequest(email))

  const emailAliasError = errorCodes[aliasError]?.desc || false
  const isFxa = featureFlagActive({ flag: 'fxa', featureState })

  return (
    <>
      <EmailAddresses
        primaryEmail={primaryEmail}
        onChangeEmail={onChangeEmail}
        emailAlias={emailAlias}
        emailAliasError={emailAliasError}
        onChangeEmailAlias={onChangeEmailAlias}
        onAddEmailAlias={onAddEmailAlias}
        onRemoveAlias={onRemoveAlias}
        onResendConfirmation={onResendConfirmation}
        aliases={aliases}
        isFxa={isFxa}
      />
      <EmailModal />
    </>
  )
}
