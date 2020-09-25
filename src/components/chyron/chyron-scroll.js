import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { testIdAttribute } from '@pocket/web-utilities/test-utils'
import { css } from 'linaria'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import classNames from 'classnames'
import { Chyron } from './chyron'

const scrollChyronStyles = css`
  position: fixed;
  text-align: center;
  width: 100%;
  top: 100%;
  transform: translateY(1px); /* needs slightest gap below bottom of window */
  transition: transform 1s ease;
  will-change: transform;

  &.isVisible {
    transform: translateY(-100%);
  }
`

const ScrollChyron = ({ threshold, shouldHide, instanceId, children }) => {
  const [isVisible, setVisible] = useState(false)

  useScrollPosition(
    ({ currPos }) => {
      if (currPos.y > threshold) {
        setVisible(true)
      }
    },
    [isVisible],
    false,
    true,
    300
  )

  const chyronClassNames = classNames(scrollChyronStyles, { isVisible })
  return shouldHide ? null : (
    <div
      className={chyronClassNames}
      {...testIdAttribute('scroll-chyron-wrapper')}>
      <Chyron instanceId={instanceId}>{children}</Chyron>
    </div>
  )
}

ScrollChyron.propTypes = {
  /**
   * An identifier, so in the case of multiple chyrons across the site, the states are kept unique
   */
  instanceId: PropTypes.string.isRequired,

  /**
   * The element to be shown and hidden inside the Chyron
   */
  children: PropTypes.object.isRequired,

  /**
   * The vertical distance that needs to be scrolled for the Chyron to adjust its visibility
   */
  threshold: PropTypes.number,

  /**
   * Optional parameter to hide the chyron outside of normal flow
   */
  shouldHide: PropTypes.bool
}

ScrollChyron.defaultProps = {
  threshold: 400,
  shouldHide: false
}

export { ScrollChyron }
