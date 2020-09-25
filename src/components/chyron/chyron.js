import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { testIdAttribute } from '@pocket/web-utilities/test-utils'
import { localStore } from 'connectors/browser-storage/browser-storage'
import { css } from 'linaria'

const CHYRON_NOT_COMPLETED = 'not-completed'
const CHYRON_COMPLETED = 'completed'

export const getChyronId = (id) => `chyron-${id}`
export const getChyronDismissalDate = (id) => `chyron-dismissed-${id}`

const getCurrentUnixTime = () => Math.round(new Date().getTime() / 1000)

// number of seconds in 30 days
const THIRTY_DAYS = 2592000
const isDismissalExpired = (timeDismissed) =>
  getCurrentUnixTime() - parseInt(timeDismissed) > THIRTY_DAYS

const Chyron = ({ instanceId, initialDismissed, initialSuccess, children }) => {
  const [isDismissed, setDismissed] = useState(initialDismissed)
  const [ctaIsSuccessful, setSuccessful] = useState(initialSuccess)

  const chyronId = getChyronId(instanceId)
  const chyronDismissalDate = getChyronDismissalDate(instanceId)

  const resolveDismissedState = () => {
    const chyronCompleted = localStore.getItem(chyronId)
    const chyronDismissedDate = localStore.getItem(chyronDismissalDate)

    // check if the chyron had been already been completed, if so, no more work to do here.
    // A chyron is considered completed if it's main use case has been fulfilled. For example,
    // if a chyron is being used to gather pocket hits signups, it would be completed upon a
    // user successfully signing up for pocket hits
    if (chyronCompleted === CHYRON_COMPLETED || ctaIsSuccessful) {
      setDismissed(true)
      return
    }

    //  check if the dismissal date > 30 days
    if (
      chyronCompleted === CHYRON_NOT_COMPLETED &&
      chyronDismissedDate !== null
    ) {
      if (isDismissalExpired(chyronDismissedDate)) {
        setDismissed(false)
        localStore.removeItem(chyronDismissalDate)
      } else {
        // if there is a dismissal date and it is less than 30 days old, do not show the chyron
        setDismissed(true)
      }
    }

    // first run, set a completion value for this chyron instance
    if (chyronCompleted === null) {
      localStore.setItem(chyronId, CHYRON_NOT_COMPLETED)
    }
  }

  useEffect(() => {
    resolveDismissedState()
  }, [])

  return isDismissed || ctaIsSuccessful ? null : (
    <div {...testIdAttribute('chyron-wrapper')}>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          // makes this dismiss and success functions available to all children
          // need to affect localStorage
          dismissChyron: () => {
            const dateDismissed = `${getCurrentUnixTime()}`
            localStore.setItem(chyronDismissalDate, dateDismissed)
            setDismissed(true)
          },
          completeChyron: () => {
            localStore.setItem(chyronId, CHYRON_COMPLETED)
          }
        })
      })}
    </div>
  )
}

Chyron.propTypes = {
  /**
   * An identifier, so in the case of multiple chyrons across the site, the states are kept unique
   */
  instanceId: PropTypes.string.isRequired,

  /**
   * The element to be shown and hidden inside the Chyron
   */
  children: PropTypes.object.isRequired,

  /**
   * State to hold whether the Chyron was previously dismissed
   */
  initialDismissed: PropTypes.bool,

  /**
   * State to hold whether the Chyron's CTA had already been successfully triggered
   */
  initialSuccess: PropTypes.bool
}

Chyron.defaultProps = {
  initialDismissed: false,
  initialSuccess: false
}

export { Chyron }
