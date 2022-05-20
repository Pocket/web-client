import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'
    
export const ChevronUpIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M19.707 14.707a1 1 0 0 1-1.414 0L12 8.414l-6.293 6.293a1 1 0 0 1-1.414-1.414l7-7a1 1 0 0 1 1.414 0l7 7a1 1 0 0 1 0 1.414Z"/></svg>
  </span>
)
  
