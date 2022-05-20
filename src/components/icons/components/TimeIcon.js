import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'
    
export const TimeIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="m11 12.414 2.293 2.293a1 1 0 0 0 1.414-1.414L13 11.586V7a1 1 0 1 0-2 0v5.414Z"/><path fillRule="evenodd" clipRule="evenodd" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11Zm-2 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
  </span>
)
  
