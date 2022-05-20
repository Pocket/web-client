import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const ListenIcon = ({ className, ...rest }) => (
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
        d="M12 4a8 8 0 0 0-8 8v.8h2.5a2 2 0 0 1 2 2V20a2 2 0 0 1-2 2H5a3 3 0 0 1-3-3v-7C2 6.477 6.477 2 12 2s10 4.477 10 10v7a3 3 0 0 1-3 3h-1.5a2 2 0 0 1-2-2v-5.2a2 2 0 0 1 2-2H20V12a8 8 0 0 0-8-8Zm8 10.8h-2.5V20H19a1 1 0 0 0 1-1v-4.2Zm-16 0V19a1 1 0 0 0 1 1h1.5v-5.2H4Z"
      />
    </svg>
  </span>
)
