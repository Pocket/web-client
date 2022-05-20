import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'
    
export const PlayIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M2.484 2.143a1 1 0 0 1 .984-.027l17 9a1 1 0 0 1 0 1.768l-17 9A1 1 0 0 1 2 21V3a1 1 0 0 1 .484-.857ZM4 4.661v14.678L17.863 12 4 4.66Z"/></svg>
  </span>
)
  
