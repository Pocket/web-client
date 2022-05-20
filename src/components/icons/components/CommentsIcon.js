import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'
    
export const CommentsIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M6 1a5 5 0 0 0-5 5v4.235a4.766 4.766 0 0 0 4 4.704V15a4 4 0 0 0 4 4h3v3.354a.75.75 0 0 0 1.242.566L17.75 19H19a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4h-.02a4.429 4.429 0 0 0-4.409-4H6Zm10.962 4a2.43 2.43 0 0 0-2.39-2H6a3 3 0 0 0-3 3v4.235c0 1.262.845 2.326 2 2.658V9a4 4 0 0 1 4-4h7.962Zm.788 12a2 2 0 0 0-1.312.49L14 19.61V19a2 2 0 0 0-2-2H9a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-1.25Z"/><path fillRule="evenodd" clipRule="evenodd" d="M9 10a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2h-8a1 1 0 0 1-1-1ZM9 14a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1Z"/></svg>
  </span>
)
  
