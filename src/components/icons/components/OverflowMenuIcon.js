import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const OverflowMenuIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM6 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM22 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
    </svg>
  </span>
)
