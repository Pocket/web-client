import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const ListenedIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M5 11a1 1 0 1 1 2 0v8a1 1 0 1 1-2 0v-8ZM9 7a1 1 0 0 1 2 0v12a1 1 0 1 1-2 0V7ZM13 5a1 1 0 1 1 2 0v14a1 1 0 1 1-2 0V5ZM17 13a1 1 0 1 1 2 0v6a1 1 0 1 1-2 0v-6Z" />
    </svg>
  </span>
)
