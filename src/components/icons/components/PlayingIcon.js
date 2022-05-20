import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'
    
export const PlayingIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5 8a1 1 0 0 1 2 0v8a1 1 0 1 1-2 0V8ZM9 5a1 1 0 0 1 2 0v14a1 1 0 1 1-2 0V5ZM13 8a1 1 0 1 1 2 0v8a1 1 0 1 1-2 0V8ZM17 5a1 1 0 1 1 2 0v14a1 1 0 1 1-2 0V5Z"/></svg>
  </span>
)
  
