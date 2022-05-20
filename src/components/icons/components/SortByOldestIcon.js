import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'
    
export const SortByOldestIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M11 6a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1ZM11 12a1 1 0 0 1 1-1h7a1 1 0 1 1 0 2h-7a1 1 0 0 1-1-1ZM11 18a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H12a1 1 0 0 1-1-1ZM5 4a1 1 0 0 0-1 1v13.586l-1.293-1.293a1 1 0 0 0-1.414 1.414l3 3A1.005 1.005 0 0 0 5 22a.997.997 0 0 0 .707-.293l3-3a1 1 0 1 0-1.414-1.414L6 18.586V5a1 1 0 0 0-1-1Z"/></svg>
  </span>
)
  
