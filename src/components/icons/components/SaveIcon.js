import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'
    
export const SaveIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2H2Zm2 0H2v6c0 5.523 4.477 10 10 10s10-4.477 10-10V5h-2v6a8 8 0 1 1-16 0V5Z"/><path fillRule="evenodd" clipRule="evenodd" d="M7.293 9.293a1 1 0 0 1 1.414 0L12 12.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414Z"/></svg>
  </span>
)
  
