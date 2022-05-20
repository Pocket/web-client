import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'
    
export const RefreshIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M16.988 6.959A7 7 0 0 0 5.08 11.137a1 1 0 1 1-1.988-.219 9 9 0 0 1 16.232-4.295A1 1 0 0 1 17.707 7.8a7.057 7.057 0 0 0-.72-.841ZM7.271 17.041a7 7 0 0 0 11.908-4.178 1 1 0 0 1 1.988.219 9 9 0 0 1-16.232 4.295A1 1 0 0 1 6.552 16.2c.214.293.453.575.72.84Z"/><path fillRule="evenodd" clipRule="evenodd" d="M19.109 2.423a1 1 0 0 1 1 1v4.243a1 1 0 0 1-1 1h-4.243a1 1 0 1 1 0-2h3.243V3.423a1 1 0 0 1 1-1ZM10.21 16.151a1 1 0 0 0-1-1H4.966a1 1 0 0 0-1 1v4.243a1 1 0 1 0 2 0V17.15h3.242a1 1 0 0 0 1-1Z"/></svg>
  </span>
)
  
