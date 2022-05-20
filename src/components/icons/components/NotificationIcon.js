import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const NotificationIcon = ({ className, ...rest }) => (
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
        d="M19 8c0 3.804 1.206 6.402 2.088 8.304.3.646.563 1.212.729 1.718.171.525-.263.978-.815.978H16.9a5.002 5.002 0 0 1-9.8 0H2.997c-.552 0-.985-.453-.813-.978.165-.506.428-1.072.728-1.718C3.794 14.402 5 11.804 5 8c0-3.8 3.2-7 7-7s7 3.2 7 7ZM7 8c0-2.695 2.305-5 5-5s5 2.305 5 5c0 3.982 1.304 7.09 2.186 9H4.814C5.696 15.09 7 11.982 7 8Zm2.17 11a3.001 3.001 0 0 0 5.66 0H9.17Z"
      />
    </svg>
  </span>
)
