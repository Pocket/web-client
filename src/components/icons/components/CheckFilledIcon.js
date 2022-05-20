import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'
    
export const CheckFilledIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M22 11c0 6.075-4.925 11-11 11S0 17.075 0 11 4.925 0 11 0s11 4.925 11 11Zm-6.293-1.293a1 1 0 0 0-1.414-1.414l-2.147 2.146L10 12.586l-2.293-2.293a1 1 0 1 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l5-5Z" fill="currentColor"/></svg>
  </span>
)
  
