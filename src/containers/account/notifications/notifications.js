import { useEffect } from 'react'
import { Notifications as NotificationComp } from 'components/account/notifications/notifications'
import { useSelector, useDispatch } from 'react-redux'
import { getNotifications, setFrequency, setMarketing } from './notfications.state'

export const Notifications = () => {
  const dispatch = useDispatch()
  const sendMarketing = useSelector((state) => state?.userNotifications?.checkMarketing)
  const hitsFrequency = useSelector((state) => state?.userNotifications?.hitsFrequency)

  useEffect(() => {
    dispatch(getNotifications())
  }, [dispatch])

  const onMarketingToggle = () => dispatch(setMarketing(!sendMarketing))
  const onFrequencyChange = (e) => dispatch(setFrequency(e.target.value))

  return (
    <NotificationComp
      sendMarketing={sendMarketing}
      hitsFrequency={hitsFrequency}
      onMarketingToggle={onMarketingToggle}
      onFrequencyChange={onFrequencyChange}
    />
  )
}
