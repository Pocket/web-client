import React from 'react'
import PropTypes from 'prop-types'
import { css, cx } from '@emotion/css'
import { containerMaxWidth, breakpointTinyTablet, breakpointLargeHandset } from 'common/constants'
const pageContainerStyle = css`
  box-sizing: content-box;
  margin: 0 auto;
  max-width: ${containerMaxWidth}px;
  padding: var(--spacing250);

  ${breakpointTinyTablet} {
    padding: var(--spacing250) var(--spacing150);
  }

  ${breakpointLargeHandset} {
    padding: var(--spacing150) var(--spacing100);
  }
`
/**
 * Standard layout component for containing content within a page. Provides a
 * centered container with a max-width as well as standard horizontal and vertical
 * padding with mobile breakpoints. The standard use is to wrap content below the
 * global nav and above the global footer.
 *
 */

export const PageContainer = ({ children = null, className }) => {
  return <div className={cx(pageContainerStyle, className && className)}>{children}</div>
}

PageContainer.propTypes = {
  /**
   * The content of the page/section.
   */
  children: PropTypes.node,

  /**
   * If you need to customize vertical or horizontal padding, pass in a CSS class
   * name to provide overriding styles. Note that we support several mobile breakpoints
   * with this component.
   */
  className: PropTypes.string
}
