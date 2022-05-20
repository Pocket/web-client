import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const MarginsIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M7 3a1 1 0 0 1 2 0v18a1 1 0 1 1-2 0V3ZM11 6a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H12a1 1 0 0 1-1-1ZM11 12a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H12a1 1 0 0 1-1-1ZM11 18a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.707 12.707a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.293 15.707a1 1 0 0 0 1.414 0l3-3a1 1 0 1 0-1.414-1.414l-3 3a1 1 0 0 0 0 1.414Z"
      />
    </svg>
  </span>
)
