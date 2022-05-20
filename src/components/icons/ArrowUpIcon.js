import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const ArrowUpIcon = ({ className, id, title, description, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M18.293 12.707a1 1 0 0 0 1.414-1.414l-7-7a1 1 0 0 0-1.414 0l-7 7a1 1 0 1 0 1.414 1.414L11 7.414V19.05c0 .525.448.95 1 .95s1-.425 1-.95V7.414l5.293 5.293Z" />
    </svg>
  </span>
)
