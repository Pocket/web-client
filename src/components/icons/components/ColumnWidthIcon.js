import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const ColumnWidthIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 22"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5 0a1 1 0 0 1 1 1v20a1 1 0 1 1-2 0v-8.586l-2.293 2.293a1 1 0 0 1-1.414-1.414L2.586 11 .293 8.707a1 1 0 0 1 1.414-1.414L4 9.586V1a1 1 0 0 1 1-1zm16.414 11 2.293-2.293a1 1 0 0 0-1.414-1.414L20 9.586V1a1 1 0 1 0-2 0v20a1 1 0 1 0 2 0v-8.586l2.293 2.293a1 1 0 0 0 1.414-1.414L21.414 11zM16 5a1 1 0 0 1-1 1H9a1 1 0 0 1 0-2h6a1 1 0 0 1 1 1zm-4 13a1 1 0 1 0 0-2H9a1 1 0 1 0 0 2h3zm4-5a1 1 0 0 1-1 1H9a1 1 0 1 1 0-2h6a1 1 0 0 1 1 1zm-1-3a1 1 0 1 0 0-2H9a1 1 0 1 0 0 2h6z"
      />
    </svg>
  </span>
)
