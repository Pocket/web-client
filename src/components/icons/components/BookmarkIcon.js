import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'
    
export const BookmarkIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M18.765 22.848a2 2 0 0 1-2.18-.434L12 17.828l-4.586 4.586A2 2 0 0 1 4 21V6a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v15a2 2 0 0 1-1.235 1.848ZM12 15l6 6V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v15l6-6Z"/></svg>
  </span>
)
  
