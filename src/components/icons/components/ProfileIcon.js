import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'
    
export const ProfileIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 11.125a5.067 5.067 0 0 1-5.06-5.063A5.067 5.067 0 0 1 12 1c2.79 0 5.06 2.271 5.06 5.062A5.067 5.067 0 0 1 12 11.125ZM12 3a3.06 3.06 0 1 0 .001 6.121A3.06 3.06 0 0 0 12 3.001ZM11.99 15.006c4.41 0 7.98 2.302 8.01 4.993H4v-.07c.12-2.741 3.63-4.923 7.99-4.923Zm0-2c-5.44 0-9.85 3.071-9.99 6.883V20C2 21.1 2.9 22 4 22h16c1.09 0 1.98-.88 2-1.97-.04-3.883-4.5-7.025-10.01-7.025Z"/></svg>
  </span>
)
  
