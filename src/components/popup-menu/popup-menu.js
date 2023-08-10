//!! UPDATE HOOKS / REFACTOR TO TYPESCRIPT
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { css, cx } from '@emotion/css'
import Popup from 'components/popup/popup'
import Modal from 'components/modal/modal'
import { useViewport } from 'components/viewport-provider/viewport-provider'
import { screenLargeHandset, breakpointLargeHandset } from 'common/constants'
import Link from 'next/link'

const popupStyle = css`
  // make sure this style has precedence over built in popup styles
  .popup-content.popup-content {
    padding: 0;
  }
`
const menuStyle = css`
  display: block;
  list-style-type: none;
  margin: 0;
  padding: 0;
  min-width: 230px;

  ${breakpointLargeHandset} {
    padding: 0 var(--spacing050);
  }
`
const groupStyle = css`
  border-top: 1px solid var(--color-popoverBorder);
  padding: var(--spacing050) 0;

  ul {
    padding: 0;
    margin: 0;
  }

  &:first-child {
    border: none;
  }
`
const itemStyle = css`
  display: block;
  margin: 0;
  padding: 0;
  width: 100%;

  button,
  a {
    display: flex;
    width: 100%;
    padding: var(--spacing075) var(--spacing100);
    background: none;
    transition: background-color 0.1s ease-out;
    color: var(--color-textPrimary);
    font-size: var(--fontSize100);
    font-family: var(--fontSansSerif);
    font-weight: 500;
    text-decoration: none;
    text-align: left;
    line-height: 1.5rem;
    border-radius: 0;

    &:focus {
      outline: none;
      box-shadow: inset 0 0 0 2px var(--color-actionFocus);
    }

    &:hover {
      background: var(--color-actionPrimary);
      color: var(--color-actionPrimaryText);

      .label-secondary {
        color: var(--color-actionPrimaryText);
      }
    }

    &:active {
      background: var(--color-actionPrimaryHover);
      color: var(--color-actionPrimaryText);

      .label-secondary {
        color: var(--color-actionPrimaryText);
      }
    }

    &:disabled {
      pointer-events: none;
      cursor: default;
      opacity: 0.5;
    }

    ${breakpointLargeHandset} {
      border-radius: var(--borderRadius);
    }
  }

  .manage-account {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .icon {
    height: 1.5rem;
    line-height: 1rem;
    margin-right: var(--spacing075);
    margin-top: 1px;
  }

  &.label-wide .label {
    width: 100%;
  }

  .label-secondary {
    display: block;
    color: var(--color-textTertiary);
    font-size: var(--fontSize085);
    line-height: 1.25em;
    font-weight: normal;
  }
`
/** COMPONENT: PopupMenuItem
 ---------------------------------------------------------------------------- */

/**
 * Item to list in the menu. Assumes that it's a button or anchor, with or without
 * an icon and helper text. An anchor will be rendered if an href is passed. All
 * extra props will be passed to the button/anchor element.
 */

export const PopupMenuItem = ({
  children,
  id,
  helperText = null,
  className = '',
  external = false,
  href = null,
  icon = null,
  ...remaining
}) => {
  function getContent() {
    return (
      <>
        {icon}
        <span className="label">
          {children}
          {helperText ? (
            <span className="label-secondary" data-cy="popup-menu-helper-text">
              {helperText}
            </span>
          ) : null}
        </span>
      </>
    )
  }

  function getLink() {
    return external ? (
      <a id={id} href={href} {...remaining}>
        {getContent()}
      </a>
    ) : (
      <Link href={href} id={id} {...remaining}>
        {getContent()}
      </Link>
    )
  }

  // if an href is passed, element should be an anchor (hyperlink). If no href,
  // this is a button element
  return (
    <li className={cx(itemStyle, className)}>
      {href ? (
        <>{getLink()}</>
      ) : (
        <button type="button" id={id} {...remaining}>
          {getContent()}
        </button>
      )}
    </li>
  )
}
PopupMenuItem.propTypes = {
  /**
   * Will render the child as the text of a button/link.
   */
  children: PropTypes.node.isRequired,

  /**
   * Provide an id if menu item needs to be identified on the page, e.g.
   * during tests or analytics calls
   */
  id: PropTypes.string,

  /**
   * Text to be displayed below the primary label.
   */
  helperText: PropTypes.string,

  /**
   * CSS class to apply to the list item if needed to override styles for that
   * specific item.
   */
  className: PropTypes.string,

  /**
   * If the menu item should be a hyperlink, provide an href and it will be
   * rendered as an anchor rather than a button.
   */
  href: PropTypes.string,

  /**
   * If the hyperlink should not be wrapped in a next/link component. This is
   * is intended for links that live within the getpocket.com domain, but not
   * within web-client.
   */
  external: PropTypes.bool,

  /**
   * Provide a JSX icon in order to display an icon before the text.
   */
  icon: PropTypes.node
}

/** COMPONENT: PopupMenuGroup
 ---------------------------------------------------------------------------- */

/**
 * Groups the PopupMenuItems with borders/dividers. Items should always have a
 * wrapping group, even if the group only has one item, in order to provide correct padding.
 */

export const PopupMenuGroup = ({ children }) => {
  return (
    <li className={groupStyle}>
      <ul>{children}</ul>
    </li>
  )
}
/** COMPONENT: PopupMenu
 ---------------------------------------------------------------------------- */

/**
 * The outer container/wrapper for the popup menu, which provides the popup behavior
 * and decision on desktop/mobile implementations. Note that the PopupMenu
 * requires that `ViewportProvider` be added as a parent, i.e. wrapping the application.
 * `ViewportProvider` provides window resize handlers that are used by the custom
 * hook `useViewport` to detect window width.
 *
 * To assemble a popup menu, compose the `PopupMenu` with menu groups and items
 * as children:
 * ```
 * <PopupMenu>
 *   <PopupMenuGroup>
 *     <PopupMenuItem>Menu Item 1</PopupMenuItem>
 *     <PopupMenuItem>Menu Item 2</PopupMenuItem>
 *   </PopupMenuGroup>
 *   <PopupMenuGroup>
 *     <PopupMenuItem>Menu Item 3</PopupMenuItem>
 *   </PopupMenuGroup>
 * </PopupMenu>
 * ```
 */

export const PopupMenu = ({
  children,
  id = '',
  title,
  trigger,
  appRootSelector,
  screenReaderLabel,
  onOpen = () => {},
  onClose = () => {},
  popperOptions,
  className,
  forceShow = false
}) => {
  const viewport = useViewport() // if viewport not available, we're probably SSR and so set the default to the
  // desktop experience for SEO purposes

  const viewportWidth = viewport ? viewport.width : screenLargeHandset + 1
  const [isMenuOpen, setIsMenuOpen] = useState(forceShow)
  const [isMobile, setIsMobile] = useState(viewportWidth <= screenLargeHandset)
  /**
   * Listens for trigger click to control the modal (mobile) mode of the menu.
   * The Popup component handles its own trigger event handling. But we track state
   * here also so that we can sync state between popup and modal.
   */

  function handleTriggerClick() {
    setIsMenuOpen(!isMenuOpen)
  }
  /**
   * Callback when the modal is closed via its close button (rather than the menu trigger)
   */

  function handleModalClose() {
    if (!forceShow) setIsMenuOpen(false)
  } // Use Effect to create/set up trigger for modal on component mount

  useEffect(() => {
    // attach click event to trigger
    if (!trigger.current) return () => {}

    const triggerElement = trigger.current
    triggerElement.addEventListener('click', handleTriggerClick)
    return () => {
      triggerElement.removeEventListener('click', handleTriggerClick)
    }
  }, []) // effect for handling open/close events (callbacks)

  useEffect(() => {
    if (isMenuOpen) {
      onOpen(id)
    } else {
      onClose(id)
    }
  }, [id, isMenuOpen, onClose, onOpen]) // effect for handling window resize

  useEffect(() => {
    setIsMobile(viewportWidth <= screenLargeHandset)
  }, [viewportWidth])

  function getContent() {
    return (
      <ul id={id} className={cx(menuStyle, isMobile && 'is-mobile')}>
        {children}
      </ul>
    )
  }

  if (isMobile) {
    return (
      <Modal
        title={title}
        appRootSelector={appRootSelector}
        screenReaderLabel={screenReaderLabel}
        handleClose={handleModalClose}
        isOpen={isMenuOpen}
        className={className}
        forceMobile
        data-cy="modal">
        {getContent()}
      </Modal>
    )
  } else {
    return (
      <Popup
        trigger={trigger}
        className={cx(popupStyle, className)}
        popperOptions={popperOptions}
        forceShow={forceShow}
        onClose={handleModalClose}
        data-cy="popup">
        {getContent()}
      </Popup>
    )
  }
}
PopupMenu.propTypes = {
  /**
   * Content for the menu. Use <PopupMenuGroup> and <PopupMenuItem> to assemble
   * the content of the menu.
   */
  children: PropTypes.node.isRequired,

  /**
   * Ref for the element or React node that will serve as the clickable trigger
   * for toggling the popup
   */
  trigger: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,

  /**
   * Title of the menu, required for providing context to the user in the mobile
   * mode of the menu, in the header.
   */
  title: PropTypes.string.isRequired,

  /**
   * query selector specifying root element of React App
   */
  appRootSelector: PropTypes.string.isRequired,

  /**
   * String indicating how the content container should be announced
   to screen readers
   */
  screenReaderLabel: PropTypes.string.isRequired,

  /**
   * Provide an id if menu needs to be identified on the page, e.g.
   * during tests or analytics calls
   */
  id: PropTypes.string,

  /**
   * Called when the menu opens.
   */
  onOpen: PropTypes.func,

  /**
   * Called when the menu closes.
   */
  onClose: PropTypes.func,

  /**
   * Options object per the popperJS API that will be passed in when creating the
   * popperJS instance. See: https://popper.js.org/docs/v2/constructors/
   */
  popperOptions: PropTypes.object,

  /**
   * CSS class name if styles need to be provided/overridden.
   */
  className: PropTypes.string,

  /**
   * Set to true to have the popup shown. Mostly intended for debugging purposes
   * so that the popup stays open rather than closing on outside click.
   */
  forceShow: PropTypes.bool
}

export default PopupMenu
