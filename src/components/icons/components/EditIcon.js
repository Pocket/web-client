import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'
    
export const EditIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M9 22a2 2 0 0 0 1.414-.586L20 11.828a4 4 0 0 0 0-5.656L17.828 4a4 4 0 0 0-5.656 0l-9.586 9.586A2 2 0 0 0 2 15v5a2 2 0 0 0 2 2h5Zm7.414-16.586 2.172 2.172a2 2 0 0 1 0 2.828l-1.379 1.379-5-5 1.379-1.379a2 2 0 0 1 2.828 0Zm-5.621 2.793L4 15v5h5l6.793-6.793-5-5Z"/></svg>
  </span>
)
  
