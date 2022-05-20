import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'
    
export const GoogleMonoIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M16.515 7.02c-1.163-1.09-2.643-1.645-4.29-1.645-2.924 0-5.398 1.935-6.281 4.534A6.496 6.496 0 0 0 5.592 12c0 .725.127 1.43.352 2.09.883 2.6 3.357 4.535 6.28 4.535 1.51 0 2.796-.39 3.802-1.05 1.188-.78 1.98-1.946 2.24-3.32h-6.041V9.998h10.571c.133.72.204 1.47.204 2.25 0 3.35-1.224 6.17-3.347 8.085C17.796 22.014 15.255 23 12.225 23c-4.388 0-8.184-2.465-10.03-6.06a10.817 10.817 0 0 1-.001-9.88C4.04 3.465 7.837 1 12.224 1c3.026 0 5.567 1.09 7.51 2.865L16.515 7.02Z"/></svg>
  </span>
)
  
