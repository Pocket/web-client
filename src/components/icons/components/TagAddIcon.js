import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'
    
export const TagAddIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 4v7.171a1 1 0 0 0 .293.708l9 8.998a1 1 0 0 0 1.414 0l6.172-6.17a1 1 0 0 0 0-1.414l-9-9A1 1 0 0 0 9.172 4H2zm19-1h2a1 1 0 0 1 0 2h-2v2a1 1 0 0 1-2 0V5h-2a1 1 0 0 1 0-2h2V1a1 1 0 0 1 2 0v2zm-.707 8.879a3 3 0 0 1 0 4.242l-6.172 6.17a3 3 0 0 1-4.242 0l-9-8.998A3 3 0 0 1 0 11.171V3a1 1 0 0 1 1-1h8.172a3 3 0 0 1 2.12.879l9.001 9zM7 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
  </span>
)
  
