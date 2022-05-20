import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const LineHeightIcon = ({
  className,
  id,
  title,
  description,
  ...rest
}) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.707 2.293a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414l3-3a1 1 0 0 1 1.414 0Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.707 6.707a1 1 0 0 0 0-1.414l-3-3a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0Z"
      />
      <path d="M4 4h2v16H4V4ZM11 6a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H12a1 1 0 0 1-1-1ZM11 12a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H12a1 1 0 0 1-1-1ZM11 18a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.293 21.707a1 1 0 0 1 0-1.414l3-3a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.293 17.293a1 1 0 0 0 0 1.414l3 3a1 1 0 0 0 1.414-1.414l-3-3a1 1 0 0 0-1.414 0Z"
      />
    </svg>
  </span>
)
