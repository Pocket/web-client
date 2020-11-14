import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'linaria'
import classnames from 'classnames'
import { headingSansSerif } from '@pocket/web-ui'

const modalHeaderStyles = css`
  ${headingSansSerif};
  margin: 0;
  padding: 1.25rem var(--spacing150);

  &.bordered {
    border-bottom: var(--dividerStyle);
  }
  &.sticky {
    position: sticky;
    top: 0;
    background-color: var(--color-popoverCanvas);
    z-index: 1;
  }
`

export const ModalHeader = ({ title, hasBorder, isSticky, className }) => {
  return (
    <h6
      className={classnames(
        modalHeaderStyles,
        {
          bordered: hasBorder,
          sticky: isSticky
        },
        className
      )}>
      {title}
    </h6>
  )
}

ModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  hasBorder: PropTypes.bool,
  isSticky: PropTypes.bool
}

ModalHeader.defaultProps = {
  hasBorder: true,
  isSticky: true
}

export default ModalHeader
