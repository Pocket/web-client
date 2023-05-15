import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/css'
import Modal from 'components/modal/modal'
import { breakpointSmallTablet } from 'common/constants'
const DRAWER_MOBILE_WIDTH = '256px'
const DRAWER_DEFAULT_WIDTH = '80vw' // desktop default for now

const drawerStyles = css`
  .drawer {
    & {
      // drawer overlay animations, can override .animation-show/hide/base here
      transition: opacity var(--navDrawerDurationExitMS) var(--easingAccelerate);
    }
    .modal-drawer {
      top: 0;
      bottom: 0;
      right: auto;
      left: 0;
      margin: 0;
      max-height: 100%;
      background: var(--color-popoverCanvas);
      box-shadow: 0 var(--size025) var(--size075) rgba(0, 0, 0, 0.12);
      border-radius: 0;
      width: 100%;
      max-width: ${DRAWER_DEFAULT_WIDTH};
      transform: translateX(-${DRAWER_DEFAULT_WIDTH});
      /* exit transition */
      transition: all var(--navDrawerDurationExitMS) var(--easingAccelerate);

      ${breakpointSmallTablet} {
        max-width: ${DRAWER_MOBILE_WIDTH};
        transform: translateX(-${DRAWER_MOBILE_WIDTH});
      }

      &.animation-show {
        /* enter transition */
        opacity: 1;
        transition: all var(--navDrawerDurationEnterMS) var(--easingDecelerate);
        transform: translateX(0);
      }
    }
  }
`

export const Drawer = ({ children, isOpen, handleClose, appRootSelector, screenReaderLabel }) => {
  return (
    <Modal
      appRootSelector={appRootSelector}
      screenReaderLabel={screenReaderLabel}
      handleClose={handleClose}
      isOpen={isOpen}
      className="modal-drawer" // necessary for style override
      overlayClassName="drawer" // necessary for style override
      portalClassName={drawerStyles}
      showCloseButton={false}
      closeTimeoutMS={200}>
      <div>{children}</div>
    </Modal>
  )
}

Drawer.propTypes = {
  /**
   * Content of the Drawer (e.g. nav buttons)
   */
  children: PropTypes.node.isRequired,

  /**
   * Boolean indicating whether the Drawer should be open
   */
  isOpen: PropTypes.bool.isRequired,

  /**
   * Function that will be run when the Drawer is requested
   to be closed
   */
  handleClose: PropTypes.func.isRequired,

  /**
   * query selector specifying root element of React App (e.g. '#root')
   */
  appRootSelector: PropTypes.string.isRequired,

  /**
   * String indicating how the content container should be announced
   to screen readers
   */
  screenReaderLabel: PropTypes.string.isRequired
}
