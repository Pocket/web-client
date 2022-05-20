import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const SaveFilledIcon = ({ className, ...rest }) => (
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
        d="M12 21c5.523 0 10-4.477 10-10V5a2 2 0 0 0-2-2H4c-1.105 0-2 .893-2 1.998V11c0 5.523 4.477 10 10 10ZM8.707 9.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L12 12.586 8.707 9.293Z"
      />
    </svg>
  </span>
)
