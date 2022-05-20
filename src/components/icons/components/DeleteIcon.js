import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const DeleteIcon = ({ className, ...rest }) => (
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
        d="M7 5a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4h5a1 1 0 1 1 0 2h-1v11a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7H2a1 1 0 0 1 0-2h5Zm2 0a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2H9ZM5 7h14v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 10a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1ZM15 10a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1Z"
      />
    </svg>
  </span>
)
