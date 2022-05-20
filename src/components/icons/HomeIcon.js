import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const HomeIcon = ({ className, id, title, description, ...rest }) => (
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
        d="M10.671 1.442a2.004 2.004 0 0 1 2.658 0l8 7.09c.427.378.671.92.671 1.49v9.922a1.997 1.997 0 0 1-2 1.994h-3c-1.105 0-2-.893-2-1.994v-4.985c0-.275-.175-1.072-.689-1.789-.48-.67-1.201-1.203-2.311-1.203-1.11 0-1.831.533-2.311 1.203C9.175 13.887 9 14.684 9 14.96v4.986a1.996 1.996 0 0 1-2 1.993H4c-1.105 0-2-.893-2-1.994v-9.922c0-.57.244-1.112.671-1.49l8-7.09ZM12 2.932l-8 7.09v9.922h3v-4.985c0-.723.325-1.92 1.061-2.948.77-1.074 2.049-2.038 3.939-2.038 1.89 0 3.169.963 3.939 2.038.736 1.028 1.061 2.225 1.061 2.948v4.985h3v-9.922l-8-7.09ZM7 19.944Zm.002 0H7h.002Zm0 0Z"
      />
    </svg>
  </span>
)
