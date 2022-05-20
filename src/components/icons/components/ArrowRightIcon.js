import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'
    
export const ArrowRightIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M11.293 18.293a1 1 0 0 0 1.414 1.414l7-7a1 1 0 0 0 0-1.414l-7-7a1 1 0 1 0-1.414 1.414L16.586 11H4.95c-.525 0-.95.448-.95 1s.425 1 .95 1h11.636l-5.293 5.293Z"/></svg>
  </span>
)
  
