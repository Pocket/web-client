/* eslint-disable -- Legacy behavior -- needs to be updated */
//!! UPDATE HOOKS / REFACTOR TO TYPESCRIPT
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { createPopper as createPopperInstance } from '@popperjs/core'
import { css, cx } from '@emotion/css'

const popupStyle = css`
  position: absolute;
  z-index: var(--zIndexTooltip);

  .popup-content {
    background-color: var(--color-popoverCanvas);
    color: var(--color-textPrimary);
    border: 1px solid var(--color-popoverBorder);
    border-radius: var(--borderRadius);
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.12);
    padding: var(--spacing100);
    font-family: var(--fontSansSerif);
    transition: all 75ms ease-in-out;
    transition-property: opacity, transform;
    /* next line necessary to make text within menu to animate smoothly */
    backface-visibility: hidden;
    opacity: 0;
    transform: scale(0.8);
    visibility: hidden;
    /* push offscreen so the div doesn't block any elements or take up layout */
    margin-left: -99999px;

    &.enter {
      visibility: visible;
      margin-left: auto;
    }

    &.animate-to {
      opacity: 1;
      transform: scale(1);
      transition-duration: 150ms;
    }
  }

  &[data-popper-placement^='top-start'] .content {
    transform-origin: bottom left;
  }

  &[data-popper-placement^='top-end'] .content {
    transform-origin: bottom right;
  }

  &[data-popper-placement^='bottom-start'] .content {
    transform-origin: top left;
  }

  &[data-popper-placement^='bottom-end'] .content {
    transform-origin: top right;
  }
`
/**
 * A GOTCHA APPEARS FROM THE WEST
 * We have to cache a single "click outside" handler variable/function in this
 * outer scope in order to make sure that window/global events get unbound properly.
 * React functional components run multiple times, meaning that if we define an
 * event handler for global events within the component, that function will get
 * cleaned up / redefined multiple times within the scope of that function, and
 * so the function that you originally bound to window/global will no longer exist
 * once you try to remove it later if the component function has been run again.
 * However, because the handler function contains references to state hooks and
 * other local component scope, we can't move the handler logic entirely to a
 * separate function here outside of the component. So, we create a single static
 * handler function, handleClickOutsidePointer, that then calls a function
 * handleClickOutside, which is accesible in this outer scope but gets redefined
 * within the component itself.
 */

let handleClickOutside = () => {}

function handleClickOutsidePointer(event) {
  handleClickOutside(event)
}
/**
 * A basic popup component that applies show/hide behavior based on clicking a
 * trigger passed in on a ref. Shows props.children as the content of the popup.
 * Handles positioning logic of the content, without any other presentational styling.
 * For standard types of popup, see more specific components per use case (e.g.
 * PopupMenu).
 *
 * Accepts a className prop to override/enhance styling as needed. Component also
 * applies an 'animate-to' class on the popup when the popup is visible to allow
 * for applying CSS transition animations.
 */

const Popup = ({
  children,
  trigger,
  id,
  className,
  animationDuration = 75,
  alwaysRender = true,
  onOpen = () => {},
  onClose = () => {},
  popperOptions = {
    placement: 'bottom-start'
  },
  forceShow = false
}) => {
  let popper
  let animationTimeout
  const globalEvents = ['click', 'touch', 'focus']
  const [isShowRequested, setIsShowRequested] = useState(forceShow)
  const [isShown, setIsShown] = useState(forceShow)
  const [isAnimationApplied, setIsAnimationApplied] = useState(forceShow)
  const contentRef = useRef(null)

  function createPopper() {
    if (!popper) {
      popper = createPopperInstance(trigger.current, contentRef.current, popperOptions)
      popper.forceUpdate()
    }
  }

  function destroyPopper() {
    if (popper) {
      popper.destroy()
      popper = null
    }
  }
  /**
   * Remove Document Listeners
   * We remove listeners on multiple events. This just allows it to
   * reusable throughout our function
   */

  function removeDocumentListeners() {
    if (global && global.document) {
      globalEvents.forEach((event) => {
        return global.document.removeEventListener(event, handleClickOutsidePointer)
      })
      global.removeEventListener('blur', handleWindowBlur)
    }
  }
  /**
   * Add Document Listeners
   * We add listeners to multiple events. This just allows it to
   * reusable throughout our function
   */

  function addDocumentListeners() {
    if (global && global.document) {
      globalEvents.forEach((event) => {
        return global.document.addEventListener(event, handleClickOutsidePointer)
      })
      global.addEventListener('blur', handleWindowBlur)
    }
  }
  /**
   * Handle Click Outside is a check to make sure we are not blocking clicks
   * on the actual popup or trigger.  It also allows for `persistOnClick` if it
   * is set on the options. If this is set, the user must dismiss the
   * popover by clicking outside or by explicitly clicking a close button
   *
   * Note: this function gets redefined to an outer scope variable because of
   * pointer/scope issues with global event listener adding & removing, and React
   * functional components. See notes above definition of handleClickOutsidePointer
   * @param {object} event Click event passed though from the listener
   */

  handleClickOutside = (event) => {
    if (
      !forceShow &&
      !trigger.current?.contains(event.target) &&
      !contentRef.current?.contains(event.target)
    ) {
      setIsShowRequested(false)
    }
  }
  /**
   * Handle Trigger Click is the handler for toggling the popup.
   * @param {object} event Click event passed though from the listener
   */

  function handleTriggerClick() {
    if (!forceShow) setIsShowRequested((prevShown) => !prevShown)
  }
  /**
   * Called when the window blurs via tabbing outside of the page and into browser
   * UI elements, or when window loses focus
   */

  function handleWindowBlur() {
    if (!forceShow) setIsShowRequested(false)
  } // Use Effect to create/set up popup on component mount

  useEffect(() => {
    // attach click event to trigger
    if (!contentRef.current || !trigger.current) return () => {}

    const triggerElement = trigger.current
    triggerElement.addEventListener('click', handleTriggerClick)
    return () => {
      triggerElement.removeEventListener('click', handleTriggerClick)
      removeDocumentListeners()
      clearTimeout(animationTimeout)
      destroyPopper()
    }
  }, []) // watch for state change to isShowRequested. This represents when the user
  // has clicked on the trigger to open or close the popup.

  useEffect(() => {
    if (isShowRequested) {
      createPopper()
      addDocumentListeners()
      setIsShown(true)
      onOpen(id)
    } else {
      removeDocumentListeners()
      setIsAnimationApplied(false)
      onClose(id)
      animationTimeout = setTimeout(() => {
        setIsShown(false)
      }, animationDuration)
    }
  }, [isShowRequested]) // state changes to whether the popup is actually visible or not, accounting
  // for animations

  useEffect(() => {
    if (isShown) {
      setIsAnimationApplied(true)
    }
  }, [isShown])
  return (
    <div ref={contentRef} className={cx(popupStyle, className)}>
      {alwaysRender || isShowRequested || isShown ? (
        <div
          className={cx('popup-content', isShown && 'enter', isAnimationApplied && 'animate-to')}
          data-testid={`popup-content-${id}`}>
          {children}
        </div>
      ) : null}
    </div>
  )
}

Popup.propTypes = {
  /**
   * Content to put within the popup.
   */
  children: PropTypes.node.isRequired,

  /**
   * Ref for the element or React node that will serve as the clickable trigger
   * for toggling the popup
   */
  trigger: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,

  /**
   * Provide an id if desired, for test markers or analytics.
   */
  id: PropTypes.string,

  /**
   * CSS class name that can be provided to override styles as well as animations
   * (using the animation selector class ('animate-to'))
   */
  className: PropTypes.string,

  /**
   * Animation duration in milliseconds that corresponds to any CSS transition
   * animations that will be applied. Necessary so that we don't remove the
   * animation classes and hide the popup until the animation is complete.
   */
  animationDuration: PropTypes.number,

  /**
   * When true, popper will remain rendered even when hidden. This would serve
   * SEO purposes to ensure hidden content is still available for crawlers, e.g.
   * navigational menu content. If content does not need to be available for SEO
   * and page weight/performance is a concern, set this to false.
   */
  alwaysRender: PropTypes.bool,

  /**
   * Called when the popup opens. Can be used for e.g. analytics tracking.
   */
  onOpen: PropTypes.func,

  /**
   * Called when the popup closes. Can be used for e.g. analytics tracking.
   */
  onClose: PropTypes.func,

  /**
   * Options object per the popperJS API that will be passed in when creating the
   * popperJS instance. See: https://popper.js.org/docs/v2/constructors/
   */
  popperOptions: PropTypes.object,

  /**
   * Set to true to have the popup shown. Mostly intended for debugging purposes
   * so that the popup stays open rather than closing on outside click.
   */
  forceShow: PropTypes.bool
}

export default Popup
