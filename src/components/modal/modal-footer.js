import React from 'react'
import PropTypes from 'prop-types'
import { css, cx } from '@emotion/css'

/**
 * Defaults to aligning child items to the right. Will likely contain button actions
 * but can be configured per instance
 */
const modalFooterStyles = css`
  font-family: var(--fontSansSerif);
  font-weight: 600;
  margin: 0;
  padding: var(--spacing100) var(--spacing150);
  display: flex;
  justify-content: flex-end;

  .footnote {
    font-weight: 400;
    font-style: italic;
    font-size: 0.8em;
    padding-right: 1em;
    color: var(--color-formFieldTextSecondary);
  }

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

export const ModalFooter = ({ children, hasBorder = true, isSticky = true, className }) => {
  return (
    <div
      className={cx(modalFooterStyles, hasBorder && 'bordered', isSticky && 'sticky', className)}>
      {children}
    </div>
  )
}

ModalFooter.propTypes = {
  hasBorder: PropTypes.bool,
  isSticky: PropTypes.bool
}

export default ModalFooter
