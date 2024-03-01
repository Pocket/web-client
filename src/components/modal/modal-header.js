import React from 'react'
import PropTypes from 'prop-types'
import { css, cx } from '@emotion/css'

const modalHeaderStyles = css`
  font-family: var(--fontSansSerif);
  font-weight: 600;
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

export const ModalHeader = ({ title, hasBorder = true, isSticky = true, className }) => {
  return (
    <h6
      data-testid="modal-header"
      className={cx(modalHeaderStyles, hasBorder && 'bordered', isSticky && 'sticky', className)}>
      {title}
    </h6>
  )
}

ModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  hasBorder: PropTypes.bool,
  isSticky: PropTypes.bool
}

export default ModalHeader
