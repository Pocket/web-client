import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'
    
export const ArchiveIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M1 4a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4Zm2 0v2h18V4H3Z"/><path fillRule="evenodd" clipRule="evenodd" d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8Zm2 10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8H5v10Z"/><path fillRule="evenodd" clipRule="evenodd" d="M15.707 11.293a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 1 1 1.414-1.414L11 14.586l3.293-3.293a1 1 0 0 1 1.414 0Z"/></svg>
  </span>
)
  
