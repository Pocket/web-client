import { css } from 'linaria'
import { containerMaxWidth } from '@pocket/web-ui'
import { breakpointTinyTablet } from '@pocket/web-ui'
import { breakpointLargeHandset } from '@pocket/web-ui'

const sectionWrapperStyle = css`
  box-sizing: content-box;
  padding: 0 2.5rem;

  ${breakpointTinyTablet} {
    padding: 0 1.5rem;
  }

  ${breakpointLargeHandset} {
    padding: 0 1rem;
  }

  &.highlight {
    padding-top: 1rem;
    padding-bottom: 1rem;
    margin: 4rem 0;
    background-color: var(--color-calloutBackgroundPrimary);
  }

  .inner {
    margin: 0 auto;
    max-width: ${containerMaxWidth}px;
  }
`

export const SectionWrapper = ({ children, className = '', ...rest }) => {
  return (
    <div className={`${sectionWrapperStyle} ${className}`} {...rest}>
      <div className="inner">{children}</div>
    </div>
  )
}
