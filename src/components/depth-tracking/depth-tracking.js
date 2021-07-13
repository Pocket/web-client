import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { once } from '@pocket/web-utilities/once'

const DEPTHS_TO_TRACK = [25, 50, 75, 100]

const getTriggers = (depthIncrements, callback) => {
  return depthIncrements.reduce(
    (acc, int) => ({
      ...acc,
      [int]: once(() => callback(int))
    }),
    {}
  )
}

const DepthTracking = ({ depthIncrements, onScrollDepth, children }) => {
  const [positions, setPositions] = useState(null)
  const triggers = getTriggers(depthIncrements, onScrollDepth)
  const ref = useRef(null)

  useEffect(() => {
    function buildPositions() {
      const elementHeight = ref.current.getBoundingClientRect().height
      const elementToTop = ref.current.getBoundingClientRect().top + window.scrollY

      const positionMap = depthIncrements.map((percent) => ({
        pixels: elementHeight * (percent / 100) + elementToTop,
        callback: triggers[percent]
      }))

      setPositions(positionMap)
    }

    function checkScrollPosition() {
      const windowY = window.pageYOffset + window.innerHeight

      positions.forEach((increment) => {
        const { pixels, callback } = increment
        if (pixels < windowY) {
          callback()
        }
      })
    }

    // timeoutId to debounce the scrollListener
    let timeoutId = null
    const scrollListener = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        checkScrollPosition()
      }, 200)
    }

    // Build positions first load and on resize
    // otherwise addEventListener
    if (!positions) buildPositions()

    window.addEventListener('resize', buildPositions)
    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('resize', buildPositions)
      window.removeEventListener('scroll', scrollListener)
    }
  }, [depthIncrements, positions, triggers])

  return <div ref={ref}>{children}</div>
}

DepthTracking.propTypes = {
  /**
   * Array of numbers ranging from 0-100, converted into a percentage.
   * The callback onScrollDepth will be fired when the user scrolls the
   * defined percentage down the child element
   */
  depthIncrements: PropTypes.array,

  /**
   * Called when a user scrolls to a defined depth percentage in depthIncrements
   */
  onScrollDepth: PropTypes.func,

  /**
   * Element to track scroll engagement
   */
  children: PropTypes.node
}

DepthTracking.defaultProps = {
  depthIncrements: DEPTHS_TO_TRACK,
  onScrollDepth() {}
}

export { DepthTracking }
