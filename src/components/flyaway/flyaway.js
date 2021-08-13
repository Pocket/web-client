import { css } from 'linaria'
import { breakpointLargeHandset } from '@pocket/web-ui'
import { CloseButton } from 'components/close-button/close-button'

const flyawayWrapper = css`
  position: sticky;
  bottom: 50px;
  grid-column: span 12;
  max-width: 350px;

  ${breakpointLargeHandset} {
    max-width: 600px;
    bottom: 20px;
  }
`

const flyaway = css`
  font-family: var(--fontSansSerif);
  background-color: var(--color-actionPrimary);
  color: var(--color-canvas);
  padding: 1rem;
  border-radius: var(--borderRadius);

  .flyaway_title {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  h5 {
    font-weight: 600;
    margin-bottom: 0.5rem;

    ${breakpointLargeHandset} {
      font-size: 1.2rem;
    }
  }

  p {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  button {
    padding: 0.5rem;
  }
`

const closeButtonOverrides = css`
  color: var(--color-canvas);

  &:hover,
  &:active {
    color: var(--color-canvas);
  }
  &:focus {
    color: var(--color-canvas);
  }
`

export function Flyaway({ title, description, handleClose }) {
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
