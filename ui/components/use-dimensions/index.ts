// Pulled from https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs

import { MutableRefObject, useEffect, useState } from 'react'

/**
 * getWindowDimensions
 * ---
 * Get the width and height from the window object
 */
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height
  }
}

/**
 * useWindowDimensions
 * ---
 * Hook to monitor and return window dimensions
 */
export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}

/**
 * useRefDimensions
 * ---
 * Hook to monitor and return window dimensions
 */
export const useRefDimensions = (ref: MutableRefObject<HTMLDivElement | null>) => {
  const [dimensions, setDimensions] = useState({ width: 1, height: 2 })
  useEffect(() => {
    if (ref.current) {
      const { current } = ref
      const boundingRect = current.getBoundingClientRect()
      const { width, height } = boundingRect
      setDimensions({ width: Math.round(width), height: Math.round(height) })
    }
  }, [ref])
  return dimensions
}
