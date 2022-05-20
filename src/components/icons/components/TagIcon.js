import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'
    
export const TagIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 1.414.586L20 11.172a4 4 0 0 1 0 5.656L16.828 20a4 4 0 0 1-5.656 0l-8.586-8.586A2 2 0 0 1 2 10V4Zm8 0 8.586 8.586a2 2 0 0 1 0 2.828l-3.172 3.172a2 2 0 0 1-2.828 0L4 10V4h6Z"/><path d="M9 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/></svg>
  </span>
)
  
