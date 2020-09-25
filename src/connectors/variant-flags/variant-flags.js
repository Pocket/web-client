import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const VariantFlag = ({ children, flag, variant }) => {
  const isVariantEnabled = useSelector(
    (state) => state.variants[flag] === variant
  )
  return isVariantEnabled ? <>{children}</> : null
}

VariantFlag.propTypes = {
  /**
   * Name of experiment flag to verify the variants against
   */
  flag: PropTypes.string.isRequired,

  /**
   * One of the variant options
   * This will be checked against local state management to determine whether
   * it will be displayed
   *
   * Snowplow analytics only: One of the variant options in your experiment MUST
   * be named 'control'. See src/common/snowplow/entities/feature-flag.js
   */
  variant: PropTypes.string.isRequired,

  /**
   * React element to render if it is the chosen variant
   */
  children: PropTypes.node
}

export { VariantFlag }
