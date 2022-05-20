import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'
    
export const PinFilledIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" fillRule="evenodd" d="M15.77 1.027a1 1 0 0 1 .937.266l6 6a1 1 0 0 1-.39 1.656l-2.73.91-4.445 5.333a6.368 6.368 0 0 1-.155 4.501 7.005 7.005 0 0 1-.812 1.451 6 6 0 0 1-.45.544l-.01.012-.005.004-.001.002h-.001v.001a1 1 0 0 1-1.415 0L8 17.414l-4.793 4.793a1 1 0 0 1-1.414-1.414L6.586 16l-4.293-4.293a1 1 0 0 1-.15-1.222s0 .001 0 0l.001-.002.002-.003.004-.007.01-.016a2.03 2.03 0 0 1 .118-.167c.074-.098.18-.224.32-.364.28-.281.702-.62 1.292-.895 1.113-.52 2.71-.76 4.886-.146l5.365-4.471.91-2.73a1 1 0 0 1 .72-.657z" clipRule="evenodd"/></svg>
  </span>
)
  
