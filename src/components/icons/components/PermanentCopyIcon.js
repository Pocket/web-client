import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'
    
export const PermanentCopyIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g clipRule="evenodd" fill="currentColor" fillRule="evenodd"><path d="M7 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4a1 1 0 1 1 2 0v4a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h2a1 1 0 0 1 0 2z"/><path d="M7 9a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1zM7 13a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1zM7 17a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1zM13 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V5.414l-3.293 3.293a1 1 0 1 1-1.414-1.414L17.586 4H14a1 1 0 0 1-1-1z"/></g></svg>
  </span>
)
  
