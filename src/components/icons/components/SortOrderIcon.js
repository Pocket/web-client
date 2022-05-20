import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const SortOrderIcon = ({ className, ...rest }) => (
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
        d="M6.293 2.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L8 5.414V21a1 1 0 1 1-2 0V5.414L3.707 7.707a1 1 0 0 1-1.414-1.414l4-4ZM16.293 21.707a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L18 18.586V3a1 1 0 1 0-2 0v15.586l-2.293-2.293a1 1 0 0 0-1.414 1.414l4 4Z"
      />
    </svg>
  </span>
)
