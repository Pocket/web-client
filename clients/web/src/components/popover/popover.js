import { useState, useRef } from 'react'
import { useCorrectEffect } from 'common/utilities/hooks/use-correct-effect'
import { createPopper } from '@popperjs/core'

export const popoverBase = {
  backgroundColor: 'var(--color-canvas)',
  color: 'var(--color-textPrimary)',
  borderRadius: '4px',
  boxShadow: 'var(--size025) var(--size025) var(--size100) rgba(0, 0, 0, 0.1)',
  zIndex: 'var(--zIndexTooltip)'
}

export function usePopover(options) {
  const events = ['click', 'touch', 'scroll']

  const [shown, setShown] = useState(false)
  const popTrigger = useRef(null)
  const popBody = useRef(null)

  /**
   * Remove Document Listeners
   * We remove listeners on multiple events. This just allows it to
   * reusable throughout our function
   */
  const removeDocumentListeners = () => {
    events.forEach((event) => document.removeEventListener(event, handleClickOutside))
  }

  /**
   * Add Document Listeners
   * We add listeners to multiple events. This just allows it to
   * reusable throughout our function
   */
  const addDocumentListeners = () => {
    events.forEach((event) => document.addEventListener(event, handleClickOutside))
  }

  /**
   * Handle Click Outside is a check to make sure we are not blocking clicks
   * on the actual popup or trigger.  It also allows for `persistOnClick` if it
   * is set on the options. If this is set, the user must dismiss the
   * popover by clicking outside or by explicitly clicking a close button
   * @param {object} event Click event passed though from the listener
   */
  const handleClickOutside = (event) => {
    if (!popTrigger.current?.contains(event.target) && !popBody.current?.contains(event.target)) {
      event.preventDefault()
      event.stopPropagation()
      setShown(false)
      removeDocumentListeners()
    }

    if (popBody.current?.contains(event.target) && !options.persistOnClick) {
      setShown(false)
      removeDocumentListeners()
    }
  }

  /**
   * Handle Trigger Click is the handler for toggling the popup.
   * @param {object} event Click event passed though from the listener
   */
  const handleTriggerClick = () => {
    addDocumentListeners()
    setShown((prevShown) => !prevShown)
  }

  /**
   * Use Effect to create/set up popup
   */
  useCorrectEffect(() => {
    if (!popBody.current) return

    const popper = createPopper(popTrigger.current, popBody.current, options)

    return () => popper.destroy()
  }, [shown])

  /**
   * Use effect to set up listeners on the trigger
   */
  useCorrectEffect(() => {
    if (!popTrigger.current) return
    const element = popTrigger.current
    element.addEventListener('click', handleTriggerClick)

    return () => {
      element.removeEventListener('click', handleTriggerClick)
    }
  }, [popTrigger.current])

  useCorrectEffect(() => {
    const element = popTrigger?.current
    return () => {
      removeDocumentListeners()
      if (element) element.removeEventListener('click', handleTriggerClick)
    }
  }, [])

  return { popTrigger, popBody, shown }
}
