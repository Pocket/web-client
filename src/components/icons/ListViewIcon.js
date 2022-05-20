import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const ListViewIcon = ({
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
      <path d="M5 5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM5 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM5 19a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 5a1 1 0 0 1 1-1h13a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1ZM7 12a1 1 0 0 1 1-1h13a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1ZM7 19a1 1 0 0 1 1-1h13a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Z"
      />
    </svg>
  </span>
)
