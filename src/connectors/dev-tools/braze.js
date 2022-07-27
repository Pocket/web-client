import { useEffect, useState } from 'react'
import { css } from 'linaria'
import { useSelector } from 'react-redux'

const brazeStyles = css`
  section {
    cursor: pointer;
    border-radius: var(--borderRadius);
    border: 1px solid var(--color-calloutBackgroundPrimary);
    background-color: var(--color-calloutBackgroundPrimary);
    display: flex;
    padding: 0.5rem;
    text-decoration: none;
    &:hover {
      color: var(--color-textPrimary);
      border-color: var(--color-formFieldBorder);
    }

    & + section {
      margin-top: 1rem;
    }

    &.error {
      background-color: var(--color-error);
      color: white;
    }
  }
  .title {
    font-weight: 500;
    padding-right: 1rem;
  }
  .description {
    color: var(--color-textSecondary);
  }
`

export const BrazeTools = () => {
  const [pushGranted, setPushGranted] = useState(false)
  const [pushDenied, setPushDenied] = useState(false)
  const { user_id } = useSelector((state) => state.user)
  const brazeInitialized = useSelector((state) => state?.braze?.initialized)

  const brazeToken = useSelector((state) => state.userBraze?.token)

  useEffect(() => {
    if (!brazeInitialized) return
    import('common/utilities/braze/braze-lazy-load').then(({ isPushBlocked, isPushPermissionGranted }) => {
      if (isPushBlocked()) setPushDenied(true)
      if (isPushPermissionGranted()) setPushGranted(true)
    })
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
    <div className={brazeStyles}>
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
            Push notifications are currently blocked.<br />
            <a href="https://support.mozilla.org/en-US/kb/push-notifications-firefox#w_upgraded-notifications" target="_blank">
              Please update your settings
            </a>
          </div>
        </section>
      ) : null}
      {!pushGranted && !pushDenied ? (
        <section onClick={requestPush}>
          <div className="title">Push notifications</div>
          <div className="description">Allows push notifications from Braze</div>
        </section >
      ) : null}
    </div>
  ) : <BrazeOff />
}

const BrazeOff = () => (
  <p>Braze is currently turned off. Please enable Braze on the <a href="/account">Account Settings</a> page</p>
)
