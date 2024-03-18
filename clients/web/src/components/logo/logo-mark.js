import React from 'react'
import PropTypes from 'prop-types'
import { css, cx } from '@emotion/css'
import { screenReaderOnly } from '../../styles/helpers'
const logoMarkImg =
  'https://assets.getpocket.com/web-ui/assets/pocket-logo-mark.dd8dec213208a4fbf2bff946d112aec3.svg'
const logoStyle = css`
  background: no-repeat url(${logoMarkImg});
  background-size: contain;
  width: 24px;
  height: 24px;
`
const logoLabelStyle = css`
  ${screenReaderOnly}
`

const LogoMark = ({ className }) => {
  return (
    <div className={cx(logoStyle, className && className)}>
      <span className={logoLabelStyle}>Pocket</span>
    </div>
  )
}

LogoMark.propTypes = {
  /**
   * Use the className prop to customize width or layout of the logo.
   */
  className: PropTypes.string
}

export default LogoMark
