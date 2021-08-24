import { useState, useEffect } from 'react'
import { css, cx } from 'linaria'
import { breakpointLargeHandset, breakpointLargeTablet } from '@pocket/web-ui'
import { CloseButton } from 'components/close-button/close-button'

const flyawayWrapper = css`
  display: grid;
  grid-template-columns: repeat(12,1fr);
  position: sticky;
  bottom: 50px;
  z-index: 100;
  transition: opacity 700ms ease-in-out;
  opacity: 0;
  pointer-events: none;

  ${breakpointLargeHandset} {
    bottom: 20px;
  }
  
  &.show {
    opacity: 1;
    pointer-events: auto;
  }
  `

const flyaway = css`
  font-family: var(--fontSansSerif);
  background-color: var(--color-actionPrimary);
  color: var(--color-canvas);
  padding: 1rem;
  border-radius: var(--borderRadius);
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.3);
  grid-column: 9 / span 4;

  ${breakpointLargeTablet} {
    grid-column: 7 / span 6;
  }
  
  ${breakpointLargeHandset} {
    grid-column: span 12;
  }
  
  .flyaway_title {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  h5 {
    font-weight: 600;
    margin-bottom: 0.5rem;

    ${breakpointLargeTablet} {
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

export function Flyaway({ title, description, handleClose, show, styleOverrides }) {
  const [flyawayOpen, setFlyawayOpen] = useState(false)

  useEffect(() => {
    let timer
    if (show) timer = setTimeout(() => setFlyawayOpen(true), 700)
    else setFlyawayOpen(false)

    return () => clearTimeout(timer)
  }, [show])

  const flyawayClassNames = cx(flyawayWrapper, styleOverrides, flyawayOpen && 'show')
  return (
    <div className={flyawayClassNames}>
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
