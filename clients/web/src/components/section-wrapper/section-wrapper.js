import { css } from '@emotion/css'
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

  &.slideSection .inner {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: flex-end;
  }

  .controls {
    display: flex;
    justify-content: flex-end;
    padding-top: 1rem;
    button {
      font-size: 1.25rem;
      border: var(--borderStyle);
      border-radius: 50%;
      margin-left: 1rem;
      padding: 0.5rem;
    }
    &.no-slide {
      display: none;
    }
  }
`

export const SectionWrapper = ({ children, className = '', ...rest }) => {
  return (
    <div className={`${sectionWrapperStyle} ${className}`} {...rest}>
      <div className="inner">{children}</div>
    </div>
  )
}
