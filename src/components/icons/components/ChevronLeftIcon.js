import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'
    
export const ChevronLeftIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M14.707 4.293a1 1 0 0 1 0 1.414L8.414 12l6.293 6.293a1 1 0 0 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414l7-7a1 1 0 0 1 1.414 0Z"/></svg>
  </span>
)
  
