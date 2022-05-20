import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'
    
export const SortByNewestIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8.707 6.707a1 1 0 0 0 0-1.414l-3-3a.999.999 0 0 0-1.414 0l-3 3a1 1 0 0 0 1.414 1.414L4 5.414V21a1 1 0 1 0 2 0V5.414l1.293 1.293a1 1 0 0 0 1.414 0ZM11 6a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H12a1 1 0 0 1-1-1ZM11 12a1 1 0 0 1 1-1h7a1 1 0 1 1 0 2h-7a1 1 0 0 1-1-1ZM11 18a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1Z"/></svg>
  </span>
)
  
