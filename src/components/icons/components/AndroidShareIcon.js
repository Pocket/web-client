import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const AndroidShareIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M19 8a3 3 0 1 0-2.977-2.63l-8.94 4.47a3 3 0 1 0 0 4.319l8.94 4.47a3 3 0 1 0 .895-1.789l-8.94-4.47a3.028 3.028 0 0 0 0-.74l8.94-4.47C17.456 7.68 18.19 8 19 8Z" />
    </svg>
  </span>
)
