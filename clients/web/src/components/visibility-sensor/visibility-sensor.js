import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import ReactVisibilitySensor from 'react-visibility-sensor'

/**
 * Component that wraps a child and calls an onVisible callback prop when
 * the child becomes visible for the first time. Useful for detecting when
 * (small) elements become visible as user scrolls. Utilizes react-visibility-sensor
 * but wraps it with a configurable height threshold based on percentage, and
 * ensures that the callback is only called once on the first time visible.
 */
const defaultHeightThreshold = 0.5 // 0.5 is industry standard for ads
const VisibilitySensor = ({ children, onVisible, heightThreshold = defaultHeightThreshold }) => {
  const [offset, setOffset] = useState(0)
  const [isInvoked, setInvoked] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const elementHeight = ref.current.node.getBoundingClientRect().height
    setOffset(Math.round(elementHeight * heightThreshold))
  }, [setOffset, heightThreshold])

  const handleChange = (isVisible) => {
    if (isVisible && !isInvoked) {
      onVisible()
      setInvoked(true)
    }
  }

  return (
    <ReactVisibilitySensor
      onChange={handleChange}
      partialVisibility={true}
      minTopValue={offset}
      ref={ref}>
      {children}
    </ReactVisibilitySensor>
  )
}

VisibilitySensor.propTypes = {
  children: PropTypes.node.isRequired,

  /**
   * Called the first time that the component becomes visible in the viewport.
   */
  onVisible: PropTypes.func.isRequired,

  /**
   * The percentage (in decimal form) of the component height that needs to be
   * above the fold in order to count as "visible"
   */
  heightThreshold: PropTypes.number
}


export default VisibilitySensor
