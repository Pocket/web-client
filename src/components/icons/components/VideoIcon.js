import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const VideoIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
      <rect
        width="18"
        height="18"
        x="3"
        y="3"
        stroke="currentColor"
        fill="none"
        strokeWidth="2"
        rx="3"
      />
      <path
        fill="currentColor"
        d="M9 14.461V9.54a1 1 0 0 1 1.406-.914l5.538 2.461c.792.352.792 1.476 0 1.828l-5.538 2.461A1 1 0 0 1 9 14.461z"
      />
    </svg>
  </span>
)
