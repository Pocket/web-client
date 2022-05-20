import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'
    
export const SmileyIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8.5 11a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM17 9.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM16.244 14c.69 0 1.167.687.79 1.265A5.995 5.995 0 0 1 12 18a5.995 5.995 0 0 1-5.034-2.735c-.377-.578.1-1.265.79-1.265h8.488Z"/><path fillRule="evenodd" clipRule="evenodd" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11Zm-2 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
  </span>
)
  
