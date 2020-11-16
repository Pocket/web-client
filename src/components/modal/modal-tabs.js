import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'linaria'
import classnames from 'classnames'

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

export const ModalTabs = ({ children, hasBorder, isSticky, className }) => {
  return (
    <div
      className={classnames(
        modalTabStyles,
        {
          bordered: hasBorder,
          sticky: isSticky
        },
        className
      )}>
      {children}
    </div>
  )
}

ModalTabs.propTypes = {
  hasBorder: PropTypes.bool,
  isSticky: PropTypes.bool
}

ModalTabs.defaultProps = {
  hasBorder: true,
  isSticky: true
}

export default ModalTabs
