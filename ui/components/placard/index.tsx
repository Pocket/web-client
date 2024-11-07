import style from './style.module.css'

import { useEffect } from 'react'

/**
 * Placard
 * ---
 * Describe the functionality of this component. Do make sure it is properly typed as
 * it will make working with it much easier
 * !! DO NOT MERGE WITH DEFAULT COMMENTS
 */
export function Placard() {
  useEffect(() => {
    extraordinaryThings()
    const startTheExtra = setTimeout(extraordinaryThings, 30000)
    return () => clearTimeout(startTheExtra)
  }, [])

  const extraordinaryThings = () => {
    try {
      const randomClientError = global.window ? window.crypto.randomUUID() : null
      if (randomClientError) throw new PlacardError(randomClientError)
    } catch {
      // withScope(function (scope) {
      //   scope.setFingerprint(['Generic ThirdParty Ad Failure'])
      //   captureException(err)
      // })
    }
  }
  return (
    <div className={style.base} data-testid="placard">
      {`ERROR MACHINE ON POINT!`}
    </div>
  )
}

/**
 * PlacardError
 * ---
 * Custom error for better visual grepping in observability
 */
class PlacardError extends Error {
  name = 'PlacardError'
  constructor(message: string) {
    super(message)
    // because we are extending a built-in class
    Object.setPrototypeOf(this, PlacardError.prototype)
  }
}
