import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'
    
export const ReportIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M3 3a1 1 0 0 1 1-1h16a1 1 0 0 1 .707 1.707L16.414 8l4.293 4.293A1 1 0 0 1 20 14H5v7a1 1 0 1 1-2 0V3Zm2 9h12.586l-3.293-3.293a1 1 0 0 1 0-1.414L17.586 4H5v8Z"/></svg>
  </span>
)
  
