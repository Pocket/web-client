import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: no-preference)'

/**
 * The `prefers-reduced-motion` media query is only available on the client side
 * This function defaults prefersReducedMotion to true if `window` is not present yet
 */
const getInitialState = () => {
  return typeof window === 'undefined'
    ? true
    : !window.matchMedia(QUERY).matches
}

/*
 * This hook can be used to determine whether a user `prefers-reduced-motion`
 * to improve accessibility. Read more about this CSS media feature
 * [here](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).
 */
export default function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    getInitialState
  )

  /**
   * Listener to handle an updates from the Media Query
   */
  const handleQueryUpdate = (event) => {
    setPrefersReducedMotion(!event.matches)
  }

  /**
   * Use effect to add a listener for the `prefers-reduced-motion` media query
   * and remove it on unmount
   */
  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY)

    mediaQueryList.addListener(handleQueryUpdate)

    return () => {
      mediaQueryList.removeListener(handleQueryUpdate)
    }
  }, [])

  return prefersReducedMotion
}
