import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'
    
export const FollowIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M1 20c0-4.35 3.919-8 9-8 5.082 0 9 3.65 9 8 0 1.534-1.12 3-2.6 3H3.6C2.118 23 1 21.545 1 20zm2 0c0 .539.355 1 .6 1h12.8c.24 0 .6-.472.6-1 0-3.213-2.993-6-7-6s-7 2.787-7 6zM21 9h2a1 1 0 0 1 0 2h-2v2a1 1 0 0 1-2 0v-2h-2a1 1 0 0 1 0-2h2V7a1 1 0 0 1 2 0v2zm-11 1a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>
  </span>
)
  
