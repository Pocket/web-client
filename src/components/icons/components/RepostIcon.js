import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const RepostIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M5 4a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h2a1 1 0 1 0 0-2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5.586L9.293 7.293a1 1 0 0 0 1.414 1.414l3-3a1 1 0 0 0 0-1.414l-3-3a1 1 0 0 0-1.414 1.414L10.586 4H5ZM14.707 22.707a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414l3-3a1 1 0 0 1 1.414 1.414L13.414 18H19a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2a1 1 0 1 1 0-2h2a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-5.586l1.293 1.293a1 1 0 0 1 0 1.414Z" />
    </svg>
  </span>
)
