import React from 'react'
import PropTypes from 'prop-types'
import { css, cx } from '@emotion/css'

const modalTabStyles = css`
  margin: 0;
  font-family: var(--fontSansSerif);

  .tabs {
    margin: 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    align-content: stretch;
    width: 100%;
  }

  .content {
    padding: var(--spacing100) var(--spacing150);
  }

  &.bordered {
    border-top: var(--dividerStyle);
  }
  &.sticky {
    position: sticky;
    top: 0;
    background-color: var(--color-popoverCanvas);
    z-index: 1;
  }
`

export const ModalTabs = ({ children, hasBorder = true, isSticky = true, className }) => {
  return (
    <div className={cx(modalTabStyles, hasBorder && 'bordered', isSticky && 'sticky', className)}>
      {children}
    </div>
  )
}

ModalTabs.propTypes = {
  hasBorder: PropTypes.bool,
  isSticky: PropTypes.bool
}


export default ModalTabs
