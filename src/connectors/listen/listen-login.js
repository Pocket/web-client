import { css } from 'linaria'
import { useDispatch, useSelector } from 'react-redux'
import { Listen } from 'connectors/listen/listen'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'
import { LOGIN_URL } from 'common/constants'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { ListenIcon } from 'components/icons/ListenIcon'

const loggedOutStyle = css`
  padding: 16px 18px;
  background-color: var(--color-actionPrimarySubdued);
  border-radius: 4px;
  color: var(--color-textPrimary);
  font-family: var(--fontSansSerif);
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5;

  .icon {
    margin-right: 10px;
    height: 1.5rem;
    color: var(--color-textPrimary);
  }

  a {
    color: var(--color-actionPrimary);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

export const ListenLogin = ({ itemId, path }) => {
  const dispatch = useDispatch()

  const userStatus = useSelector((state) => state.user.user_status)
  const featureState = useSelector((state) => state.features)
  const listenLab = featureFlagActive({ flag: 'lab.listen', featureState })

  const signUpEvent = () => dispatch(sendSnowplowEvent('listen.signup'))

  const loggedIn = userStatus === 'valid'
  const ElementToRender = loggedIn ? Listen : LoggedOut

  return listenLab ? (
    <ElementToRender itemId={itemId} path={path} clickEvent={signUpEvent} />
  ) : null
}

const LoggedOut = ({ clickEvent, path = '' }) => (
  <p className={loggedOutStyle}>
    <ListenIcon /> Want to Listen to this article?{' '}
    <a href={`${LOGIN_URL}?route=${path}`} onClick={clickEvent}>Sign in</a>
  </p>
)
