import { useEffect, useState } from 'react'
import { sectionStyles } from 'components/dev-tools/tool-styles'
import { useSelector } from 'react-redux'
import Link from 'next/link'

export const BrazeTools = () => {
  const [pushGranted, setPushGranted] = useState(false)
  const [pushDenied, setPushDenied] = useState(false)
  const { user_id } = useSelector((state) => state.user)
  const brazeInitialized = useSelector((state) => state?.braze?.initialized)

  const brazeToken = useSelector((state) => state.userBraze?.token)

  useEffect(() => {
    if (!brazeInitialized) return () => {}
    import('common/utilities/braze/braze-lazy-load').then(
      ({ isPushBlocked, isPushPermissionGranted }) => {
        if (isPushBlocked()) setPushDenied(true)
        if (isPushPermissionGranted()) setPushGranted(true)
      }
    )
  }, [brazeInitialized])

  const wipeBrazeData = () => {
    import('common/utilities/braze/braze-lazy-load').then(({ wipeData, changeUser }) => {
      wipeData()
      changeUser(user_id, brazeToken)
    })
  }

  const requestPush = () => {
    import('common/utilities/braze/braze-lazy-load').then(({ requestPushPermission }) => {
      requestPushPermission(
        () => setPushGranted(true),
        () => setPushDenied(true)
      )
    })
  }

  return brazeInitialized ? (
    <div className={sectionStyles}>
      <section onClick={wipeBrazeData}>
        <div className="title">Reset Braze</div>
        <div className="description">Wipes data and starts new session</div>
      </section>
      {pushGranted ? (
        <section>
          <div className="title">Push notifications</div>
          <div className="description">You’re subscribed! 🎉</div>
        </section>
      ) : null}
      {pushDenied ? (
        <section className="error">
          <div>
            Push notifications are currently blocked.
            <br />
            <a
              href="https://support.mozilla.org/en-US/kb/push-notifications-firefox#w_upgraded-notifications"
              target="_blank"
              rel="noreferrer">
              Please update your settings
            </a>
          </div>
        </section>
      ) : null}
      {!pushGranted && !pushDenied ? (
        <section onClick={requestPush}>
          <div className="title">Push notifications</div>
          <div className="description">Allows push notifications from Braze</div>
        </section>
      ) : null}
    </div>
  ) : (
    <BrazeOff />
  )
}

const BrazeOff = () => (
  <p>
    Braze is currently turned off. Please enable Braze on the{' '}
    <Link href="/account">Account Settings</Link>
    page
  </p>
)
