import React, { useEffect, useState, useContext, createContext } from 'react'

const viewportContext = createContext({})

/**
 * Provider that listens for window resize and makes width/height values available
 * through context.
 */

function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

const ViewportProvider = ({ children }) => {
  const [width, setWidth] = useState(global?.innerWidth)
  const [height, setHeight] = useState(global?.innerHeight)

  const handleWindowResize = () => {
    setWidth(global?.innerWidth)
    setHeight(global?.innerHeight)
  }

  const handleDebouncedWindowResize = debounce(handleWindowResize, 100)
  useEffect(() => {
    if (global && global.addEventListener) {
      global.addEventListener('resize', handleDebouncedWindowResize)
    }

    return () => {
      if (global && global.removeEventListener)
        global.removeEventListener('resize', handleDebouncedWindowResize)
    }
  }, [handleDebouncedWindowResize]) // store the width/height values in the value of the Provider */

  return (
    <viewportContext.Provider
      value={{
        width,
        height
      }}>
      {children}
    </viewportContext.Provider>
  )
}
/**
 * Effect hook to return the window width when it resizes. Requires availability
 * of the <ViewportProvider> to provide values through context.
 */

const useViewport = () => {
  const { width, height } = useContext(viewportContext) // if we're in-browser and width/height is undefined, likely means that the provider
  // was not added to outer scope

  if (typeof window !== 'undefined' && (width === undefined || height === undefined)) {
    console.warn(
      'a component using the custom `useViewport` hook was missing `viewportContext`. Make sure your app or feature is wrapped in a `<ViewportProvider>` instance.'
    )
  }

  return {
    width,
    height
  }
}

export { ViewportProvider, useViewport }
