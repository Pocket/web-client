import { EmailAddresses as EmailAddressesComponent } from './addresses'
import { accountStyles } from '../account'

export default {
  title: 'Components/EmailAddresses'
}

const noop = () => {}
export const EmailAddresses = () => {
  const aliases = {
    'thisistheevenlongestemail@wowwhyisthisolongImeanreallythisiscrazy.com': {},
    'thelongestemailisevenlongerthattheotheremails@wowwhyisthisolongImeanreallythisiscrazy.com': {}
  }
  return (
    <div className={accountStyles}>
      <EmailAddressesComponent
        primaryEmail="thisisthelongestemail@wowwhyisthisolongImeanreallythisiscrazy.com"
        onChangeEmail={noop}
        onAddEmailAlias={noop}
        onChangeEmailAlias={noop}
        emailAlias={''}
        emailAliasError={''}
        onResendConfirmation={noop}
        onRemoveAlias={noop}
        aliases={aliases}
      />
    </div>
  )
}
