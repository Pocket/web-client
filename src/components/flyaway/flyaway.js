import { useState, useEffect } from 'react'
import { css, cx } from '@emotion/css'
import { breakpointLargeHandset, breakpointLargeTablet } from 'common/constants'
import { CloseButton } from 'components/close-button/close-button'
import { containerMaxWidth } from 'common/constants'
import { SectionWrapper } from 'components/section-wrapper/section-wrapper'
import { getValueFromCookie } from 'common/utilities/cookies/cookies'

const sectionWrapper = css`
  position: sticky;
  grid-column: span 12;
  bottom: 50px;
  pointer-events: none;
  z-index: 1000;
`

const flyawayWrapper = css`
  margin: 0 auto;
  max-width: ${containerMaxWidth}px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  transition: opacity 700ms ease-in-out;
  opacity: 0;

  ${breakpointLargeHandset} {
    bottom: 20px;
  }

  &.show {
    opacity: 1;
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

  .show & {
    pointer-events: auto;
  }

  .flyaway_title {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  h5 {
    font-weight: 600;
    margin-bottom: 0;

    ${breakpointLargeTablet} {
      font-size: 1.2rem;
    }
  }

  .description {
    font-size: 1rem;
    margin: 0.5rem 0;
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

export function Flyaway({
  dataCy = 'flyaway',
  title,
  description,
  handleClose,
  show,
  styleOverrides
}) {
  const [flyawayOpen, setFlyawayOpen] = useState(false)

  // check whether the OptanonAlertBoxClosed cookie has been set
  // if it has, the cookie consent banner has been closed
  const cookie = document.cookie
  const bannerClosed = !!getValueFromCookie('OptanonAlertBoxClosed', cookie)

  // If cookie consent banner is open, grab its height so we can
  // determine the position of the flyaway
  const bannerHeight = !bannerClosed
    ? document.querySelector('#onetrust-banner-sdk')?.offsetHeight + 30
    : 50

  useEffect(() => {
    let timer
    if (show) timer = setTimeout(() => setFlyawayOpen(true), 700)
    else setFlyawayOpen(false)

    return () => clearTimeout(timer)
  }, [show])

  const flyawayClassName = cx(flyawayWrapper, styleOverrides, flyawayOpen && 'show')
  return (
    <SectionWrapper style={{ bottom: `${bannerHeight}px` }} className={sectionWrapper}>
      <div className={flyawayClassName} data-cy={dataCy}>
        <div className={flyaway}>
          <div className="flyaway_title">
            <h5>{title}</h5>
            <CloseButton
              handleClose={handleClose}
              dataCy="close-flyaway-button"
              closeButtonOverrides={closeButtonOverrides}
            />
          </div>
          {description ? <div className="description">{description}</div> : null}
        </div>
      </div>
    </SectionWrapper>
  )
}
