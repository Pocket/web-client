import { Snackbar } from 'components/snackbar/snackbar'
import { useTranslation } from 'next-i18next'

export const SuccessFXA = ({ type }) => {
  const { t } = useTranslation()
  const queryParams = window.location.search
  const showMessage = queryParams.includes('fxa_migration=1')

  const title = t('fxa:success', 'Your account has been migrated successfully.')
  return showMessage ? <Snackbar type={type} title={title} showMessage={showMessage} /> : null
}
