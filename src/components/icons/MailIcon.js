import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const MailIcon = ({ className, id, title, description, ...rest }) => (
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
        d="M4 4a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H4Zm-.956 2.704A1 1 0 0 1 4 6h16a1 1 0 0 1 .956.704l-.02-.03L12 12.789 3.065 6.675l-.02.03ZM3 9.054V17a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9.054l-7.87 5.385a2 2 0 0 1-2.26 0L3 9.054Z"
      />
    </svg>
  </span>
)
