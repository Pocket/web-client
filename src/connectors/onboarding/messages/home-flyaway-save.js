import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { Flyaway } from 'components/flyaway/flyaway'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const HomeFlyawaySave = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const showFlyaway = true

  useEffect(() => {
    if (showFlyaway) dispatch(sendSnowplowEvent('onboarding.flyaway.save.impression'))
  }, [showFlyaway])

  const handleClose = () => {
    dispatch(sendSnowplowEvent('onboarding.flyaway.save.close'))
  }

  const title = t('onboarding:flyaway-save-title', 'Save articles you like')
  const description = t('onboarding:flyaway-save-description',
    'Home is filled with the best articles from across the web. Save one to read it later.')

  return (
    <Flyaway title={title} description={description} handleClose={handleClose} />
  )
}
