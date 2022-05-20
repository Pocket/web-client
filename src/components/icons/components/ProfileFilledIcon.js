import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'
    
export const ProfileFilledIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 11.125a5.067 5.067 0 0 1-5.06-5.063A5.067 5.067 0 0 1 12 1c2.79 0 5.06 2.271 5.06 5.062A5.067 5.067 0 0 1 12 11.125ZM11.99 13.005c-5.44 0-9.85 3.072-9.99 6.884V20C2 21.1 2.9 22 4 22h16c1.09 0 1.98-.88 2-1.97-.04-3.883-4.5-7.025-10.01-7.025Z"/></svg>
  </span>
)
  
