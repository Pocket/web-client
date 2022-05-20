import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const AndroidOverflowMenuIcon = ({
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
      <path d="M12 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM12 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM12 22a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
    </svg>
  </span>
)
