import React from 'react'
import { css } from 'linaria'
import classnames from 'classnames'

const modalBodyStyles = css`
  padding: var(--spacing150);
  font-family: var(--fontSansSerif);
  font-size: var(--fontSize100);
  &.tagging {
    padding: var(--spacing150) var(--spacing150) var(--spacing075);
  }
`

export const ModalBody = ({ children, className }) => (
  <div className={classnames(modalBodyStyles, className)}>{children}</div>
)

export default ModalBody
