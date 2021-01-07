import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'linaria'
import classnames from 'classnames'
import { headingSansSerif } from '@pocket/web-ui'

/**
 * Defaults to aligning child items to the right. Will likely contain button actions
 * but can be configured per instance
 */
const modalFooterStyles = css`
  ${headingSansSerif};
  margin: 0;
  padding: var(--spacing100) var(--spacing150);
  display: flex;
  justify-content: flex-end;

  button {
    margin-left: var(--spacing050);
  }

  &.bordered {
    border-top: var(--dividerStyle);
  }
  &.sticky {
    position: sticky;
    bottom: 0;
    background-color: var(--color-popoverCanvas);
    z-index: 1;
  }
`

export const ModalFooter = ({ children, hasBorder, isSticky, className }) => {
  return (
    <div
      className={classnames(
        modalFooterStyles,
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

ModalFooter.propTypes = {
  hasBorder: PropTypes.bool,
  isSticky: PropTypes.bool
}

ModalFooter.defaultProps = {
  hasBorder: true,
  isSticky: true
}

export default ModalFooter
