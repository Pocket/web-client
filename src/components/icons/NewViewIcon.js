import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const NewViewIcon = ({ className, id, title, description, ...rest }) => (
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
        d="M6 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3a1 1 0 1 1 2 0v3a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h3a1 1 0 0 1 0 2H6Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 3a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v7a1 1 0 1 1-2 0V5.414l-7.293 7.293a1 1 0 0 1-1.414-1.414L18.586 4H14a1 1 0 0 1-1-1Z"
      />
    </svg>
  </span>
)
