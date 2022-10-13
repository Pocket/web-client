import { css } from 'linaria'
import { containerMaxWidth } from 'common/constants'
import { breakpointTinyTablet } from 'common/constants'
import { breakpointLargeHandset } from 'common/constants'

const sectionWrapperStyle = css`
  box-sizing: content-box;
  padding: 0 2.5rem;

  ${breakpointTinyTablet} {
    padding: 0 1.5rem;
  }

  ${breakpointLargeHandset} {
    padding: 0 1rem;
  }

  .inner {
    margin: 0 auto;
    max-width: ${containerMaxWidth}px;
  }

  &.homeSection {
    padding-top: 4.25rem;
  }
`

export const SectionWrapper = ({ children, className = '', ...rest }) => {
  return (
    <div className={`${sectionWrapperStyle} ${className}`} {...rest}>
      <div className="inner">{children}</div>
    </div>
  )
}
