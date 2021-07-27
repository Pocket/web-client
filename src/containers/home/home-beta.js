import { css, cx } from 'linaria'
import { useDispatch } from 'react-redux'
import { buttonReset } from 'components/buttons/button-reset'
import { CrossIcon } from '@pocket/web-ui'
import { Chyron } from 'components/chyron/chyron'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

const bannerWrapper = css`
  display: inline-grid;
  grid-template-columns: auto 16px;
  gap: 16px;
  align-content: center;
  align-items: center;
  font-family: 'Graphik Web';
  text-align: left;
  padding: 20px;
  border-radius: 4px;
  margin: 0 0 1rem;
  border-radius: 4px;
  background-color: var(--color-navCurrentTab);
  color: var(--color-navCurrentTabText);

  p {
    margin-bottom: 0;
    font-weight: 400;
    line-height: 1.5rem;
    font-size: 1rem;
  }
`

const closeWrapper = css`
  cursor: pointer;
  justify-self: end;
  &:hover {
    background: transparent;
  }
`

const INSTANCE_ID = 'home.beta.notice'

export const HomeBeta = ({ dismissChyron }) => {
  const dispatch = useDispatch()

  const complete = () => {
    dispatch(sendSnowplowEvent(INSTANCE_ID), { value: 'complete' })
  }

  const dismiss = () => {
    dismissChyron()
    dispatch(sendSnowplowEvent(INSTANCE_ID), { value: 'dismiss' })
  }

  return (
    <Chyron instanceId={INSTANCE_ID}>
      <div className={bannerWrapper} data-cy={'home-beta-notice'}>
        <p>
          Welcome to our Beta for <i>Home</i>. Watch this space as we look to help you build your
          own slice of the curated web.{' '}
          <a href="#" onClick={complete}>
            Please let us know how we can improve this experience.
          </a>
        </p>
        <button className={cx(buttonReset, closeWrapper)} onClick={dismiss}>
          <CrossIcon />
        </button>
      </div>
    </Chyron>
  )
}
