import { css } from 'linaria'
import { useDispatch } from 'react-redux'
import { breakpointLargeHandset } from '@pocket/web-ui'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { CloseButton } from 'components/close-button/close-button'

const flyawayWrapper = css`
  position: sticky;
  bottom: 100px;
  grid-column: span 12;
  max-width: 350px;

  ${breakpointLargeHandset} {
    max-width: 600px;
    bottom: 20px;
  }
`

const flyaway = css`
  font-family: var(--fontSansSerif);
  background-color: #008078;
  background-color: var(--color-actionPrimary);
  color: #ffffff;
  padding: 1rem;
  border-radius: 4px;

  .flyaway_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  h5, p {
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
  }

  button {
    padding: 0.5rem;
  }
`

const closeButtonOverrides = css`
  color: #ffffff;

  &:hover,
  &:active {
    color: #ffffff;
  }
  &:focus {
    color: #ffffff;
  }
`

export function Flyaway({ title, description }) {
  const dispatch = useDispatch()

  // if (!title || !description) return null

  const handleClose = () => {
    dispatch(sendSnowplowEvent('onboarding.flyaway.save.close'))
  }

  return (
    <div className={flyawayWrapper}>
      <div className={flyaway}>
        <div className="flyaway_title">
          <h5>{title}</h5>
          <CloseButton
            handleClose={handleClose}
            dataCy="close-flyaway-button"
            closeButtonOverrides={closeButtonOverrides}
          />
        </div>
        <p>{description}</p>
      </div>
    </div>
  )
}
