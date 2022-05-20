import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'
    
export const HomeFilledIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="m20.664 9.302-8-7.111a1 1 0 0 0-1.328 0l-8 7.11A1 1 0 0 0 3 10.05V20a1 1 0 0 0 1 1h3c.552 0 1-.446 1-.998V15c0-1 1-4 4-4s4 3 4 4v5a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-9.95a1 1 0 0 0-.336-.748Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
  </span>
)
  
