import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const BrighterIcon = ({
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
      <path d="M12 1a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V2a1 1 0 0 1 1-1Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
      />
      <path d="M13 20a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2ZM23 12a1 1 0 0 1-1 1h-2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1ZM4 13a1 1 0 1 0 0-2H2a1 1 0 1 0 0 2h2ZM4.222 4.222a1 1 0 0 1 1.414 0L7.05 5.636A1 1 0 1 1 5.636 7.05L4.222 5.636a1 1 0 0 1 0-1.414ZM18.364 16.95a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM19.778 4.222a1 1 0 0 1 0 1.414L18.364 7.05a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0ZM7.05 18.364a1 1 0 0 0-1.414-1.414l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414Z" />
    </svg>
  </span>
)
