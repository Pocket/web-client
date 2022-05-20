import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const OfflineIcon = ({ className, ...rest }) => (
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
        d="M8.293 13.293a1 1 0 0 1 1.414 0L12 15.586l2.293-2.293a1 1 0 0 1 1.414 1.414L13.414 17l2.293 2.293a1 1 0 0 1-1.414 1.414L12 18.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L10.586 17l-2.293-2.293a1 1 0 0 1 0-1.414ZM12 3a10.98 10.98 0 0 0-8.709 4.28A1 1 0 0 1 1.71 6.055 12.98 12.98 0 0 1 12 1a12.98 12.98 0 0 1 10.291 5.056 1 1 0 1 1-1.582 1.223A10.98 10.98 0 0 0 12 3Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 8a5.996 5.996 0 0 0-5.143 2.909 1 1 0 1 1-1.714-1.033A7.996 7.996 0 0 1 12 6a7.996 7.996 0 0 1 6.857 3.876 1 1 0 1 1-1.713 1.033A5.996 5.996 0 0 0 12 8Z"
      />
    </svg>
  </span>
)
