import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import classnames from 'classnames'
import { css } from 'linaria'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks
} from 'body-scroll-lock'
import {
  breakpointSmallDesktop,
  breakpointTinyTablet,
  breakpointLargeHandset
} from '@pocket/web-ui'
import { CrossIcon } from '@pocket/web-ui'
import { screenReaderOnly } from '@pocket/web-ui'

import { ModalHeader } from './modal-header'
import { ModalBody } from './modal-body'
import { ModalFooter } from './modal-footer'
import { ModalTabs } from './modal-tabs'
import { useTranslation, Trans } from 'common/setup/i18n'

import { testIdAttribute } from '@pocket/web-utilities/test-utils'

const MODAL_MAX_WIDTH = 552

// mobile styles pulled out into their own definition so that they can be reused
// by both a media query and css class, which can't be used together as selectors
const modalMobileStyles = `
  left: 0;
  right: 0;
  bottom: 0;
  top: auto;
  border-radius: 0;
  max-height: 100vh;
  max-width: 100%;
  transform-origin: bottom;

  &.animation-base {
    transform: scale(1) translateY(20%);
  }

  &.animation-show {
    transform: scale(1) translateY(0);
    transition-property: opacity, transform;
  }
`

const modalStyles = css`
  position: absolute;
  overflow: auto;
  max-width: ${MODAL_MAX_WIDTH}px;
  padding: 0;
  background: var(--color-popoverCanvas);
  margin: 0 auto;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
  box-shadow: 0 var(--spacing150) 32px rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  max-height: calc(100vh - (calc(var(--spacing650) + var(--spacing400))));
  min-height: 200px; /* handle edge case of header and footer clashing */
  top: var(--spacing650);
  right: var(--spacing400);
  bottom: auto;
  left: var(--spacing400);
  z-index: var(--zIndexModal);
  /* exit transition */
  transition: opacity var(--dialogsDurationExitMS) var(--easingDecelerate),
    transform var(--dialogsDurationExitMS) var(--easingDecelerate);

  &.animation-base {
    pointer-events: none;
    opacity: 0;
    transform: scale(0.8);
  }

  &.animation-show {
    pointer-events: auto;
    opacity: 1;
    transform: scale(1);
    /* enter transition */
    transition: opacity var(--dialogsDurationEnterMS) var(--easingAccelerate),
      transform var(--dialogsDurationEnterMS) var(--easingAccelerate);
  }

  &.animation-hide {
    opacity: 0;
  }

  ${breakpointSmallDesktop} {
    max-height: calc(100vh - (calc(var(--spacing400) * 2)));
    top: var(--spacing400);
  }

  ${breakpointTinyTablet} {
    left: var(--spacing150);
    right: var(--spacing150);
  }

  // large handset breakpoint and .force-mobile class reuse the
  // same style definition
  ${breakpointLargeHandset} {
    ${modalMobileStyles}
  }
  &.force-mobile {
    ${modalMobileStyles}
  }

  // apply a style on body to prevent bg scrolling when modal is open
  :global() {
    body.modal-open {
      overflow: hidden;
    }
  }
`

const overlayStyles = css`
  position: fixed;
  /* rgb of grey100 + alpha value */
  background: rgba(26, 26, 26, 0.24) none repeat scroll 0 0;
  mix-blend-mode: normal;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: var(--zIndexModalShade);
  /* exit transition */
  transition: opacity var(--dialogsDurationExitMS) var(--easingAccelerate),
    transform var(--dialogsDurationExitMS) var(--easingAccelerate);

  &.animation-base {
    pointer-events: none;
    opacity: 0;
  }

  &.animation-show {
    pointer-events: auto;
    opacity: 1;
    /* enter transition */
    transition: opacity var(--dialogsDurationEnterMS) var(--easingDecelerate),
      transform var(--dialogsDurationEnterMS) var(--easingDecelerate);
  }

  &.animation-hide {
    opacity: 0;
  }
`

const Modal = ({
  title,
  appRootSelector,
  screenReaderLabel,
  isOpen,
  onClick,
  forceMobile,
  handleClose,
  shouldCloseOnOverlayClick,
  onAfterOpen,
  onAfterClose,
  modalContentClassName,
  overlayClassName,
  portalClassName,
  showCloseButton,
  doesAnimateTransition,
  children,
  className,
  closeTimeoutMS
}) => {
  // aids in accessibility, http://reactcommunity.org/react-modal/accessibility/
  ReactModal.setAppElement(appRootSelector)
  const { t } = useTranslation()

  const [readyAnimate, setReadyAnimate] = useState(false)
  let modalContentRef = useRef(null)

  return (
    <React.Fragment>
      <ReactModal
        isOpen={isOpen}
        contentLabel={screenReaderLabel}
        bodyOpenClassName="modal-open"
        onRequestClose={() => {
          setReadyAnimate(false)
          handleClose()
        }}
        onAfterOpen={() => {
          setReadyAnimate(true)
          disableBodyScroll(modalContentRef)
          onAfterOpen()
        }}
        onAfterClose={() => {
          setReadyAnimate(false)
          enableBodyScroll(modalContentRef)
          clearAllBodyScrollLocks()
          onAfterClose()
        }}
        shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
        className={classnames([
          className,
          modalStyles,
          modalContentClassName,
          {
            'animation-base': doesAnimateTransition,
            'animation-show': doesAnimateTransition && readyAnimate && isOpen,
            'animation-hide': doesAnimateTransition && readyAnimate && !isOpen,
            'force-mobile': forceMobile
          }
        ])}
        overlayClassName={classnames([
          overlayStyles,
          overlayClassName,
          {
            'animation-base': doesAnimateTransition,
            'animation-show': doesAnimateTransition && readyAnimate && isOpen,
            'animation-hide': doesAnimateTransition && readyAnimate && !isOpen
          }
        ])}
        portalClassName={classnames([portalClassName])}
        closeTimeoutMS={closeTimeoutMS} // necessary to make outgoing animation display
        {...testIdAttribute('modal')}
        contentRef={(node) => (modalContentRef = node)}
        ref={modalContentRef}>
        {showCloseButton ? (
          <CloseButton
            handleClose={handleClose}
            {...testIdAttribute('close-modal-button')}
          />
        ) : null}
        {title ? <ModalHeader title={title} /> : null}
        <div onClick={onClick}>{children}</div>
      </ReactModal>
    </React.Fragment>
  )
}

const closeButtonStyles = css`
  cursor: pointer;
  span,
  span:hover {
    width: 20px;
    height: 20px;
    background-color: transparent;
  }
  color: var(--color-textPrimary);
  background-color: transparent;

  padding: var(--spacing150);
  position: sticky;
  float: right;
  top: 0;
  z-index: 2;

  &:hover,
  &:active {
    background-color: transparent;
    color: var(--color-textLinkHover);
  }

  .visually-hidden {
    ${screenReaderOnly}
  }
`

const CloseButton = ({ handleClose }) => {
  const { t } = useTranslation()

  return (
    <button
      className={closeButtonStyles}
      aria-label={t('common:close-label', 'Close')}
      onClick={handleClose}>
      <CrossIcon />
      <span className="visually-hidden">
        <Trans i18nKey="common:close">Close</Trans>
      </span>
    </button>
  )
}

Modal.propTypes = {
  // Pocket Modal Props
  /**
   * title to display in ModalHeader
   */
  title: PropTypes.string,
  /**
   * query selector specifying root element of React App
   */
  appRootSelector: PropTypes.string.isRequired,

  // Exposing React Modal Props
  /**
   * Boolean indicating whether the modal should be open
   */
  isOpen: PropTypes.bool,
  /**
   * Set to true to force the modal into mobile styling.
   */
  forceMobile: PropTypes.bool,
  /**
   * String indicating how the content container should be announced
   to screen readers
   */
  screenReaderLabel: PropTypes.string.isRequired,
  /**
   * Function that will be run when the modal is requested
   to be closed (either by clicking on overlay or pressing ESC).
   Note: It is not called if isOpen is changed by other means.
   */
  handleClose: PropTypes.func.isRequired,
  /**
   * Boolean indicating whether to use a default close button
   */
  showCloseButton: PropTypes.bool,
  /**
   * Boolean indicating whether the modal close when a user clicks
   * on the overlay
   */
  shouldCloseOnOverlayClick: PropTypes.bool,
  /**
   * Function to run after the modal is opened
   */
  onAfterOpen: PropTypes.func,
  /**
   * Function to run after the modal is closed
   */
  onAfterClose: PropTypes.func,
  /**
   * Additional CSS class name to place on the modal content
   */
  modalContentClassName: PropTypes.string,
  /**
   * Additional CSS class name to place on the modal overlay
   */
  overlayClassName: PropTypes.string,
  /**
   * Additional CSS class name to place on the entire portal
   */
  portalClassName: PropTypes.string,
  /**
   * Boolean describing whether the modal should fade in and out
   */
  doesAnimateTransition: PropTypes.bool,
  /**
   * Milliseconds to delay close, useful for outgoing animations
   */
  closeTimeoutMS: PropTypes.number
}

Modal.defaultProps = {
  title: undefined,
  isOpen: false,
  forceMobile: false,
  shouldCloseOnOverlayClick: true,
  onAfterOpen: () => {},
  onAfterClose: () => {},
  modalContentClassName: '',
  overlayClassName: '',
  portalClassName: '',
  showCloseButton: true,
  doesAnimateTransition: true,
  closeTimeoutMS: 75
}

export { Modal, ModalHeader, ModalBody, ModalTabs, ModalFooter }

export default Modal
