import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'
    
export const ArrowDownIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5.707 11.293a1 1 0 0 0-1.414 1.414l7 7a1 1 0 0 0 1.414 0l7-7a1 1 0 0 0-1.414-1.414L13 16.586V4.95c0-.525-.448-.95-1-.95s-1 .425-1 .95v11.636l-5.293-5.293Z"/></svg>
  </span>
)
  
