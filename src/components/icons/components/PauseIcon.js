import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'
    
export const PauseIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M8 18.5v-13a1.5 1.5 0 1 0-3 0v13a1.5 1.5 0 0 0 3 0ZM6.5 2A3.5 3.5 0 0 0 3 5.5v13a3.5 3.5 0 1 0 7 0v-13A3.5 3.5 0 0 0 6.5 2ZM19 18.5v-13a1.5 1.5 0 0 0-3 0v13a1.5 1.5 0 0 0 3 0ZM17.5 2A3.5 3.5 0 0 0 14 5.5v13a3.5 3.5 0 1 0 7 0v-13A3.5 3.5 0 0 0 17.5 2Z"/></svg>
  </span>
)
  
