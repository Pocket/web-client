import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const SkipToPreviousIcon = ({
  className,
  id,
  title,
  description,
  ...rest
}) => (
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
        d="M3 3a1 1 0 0 0-1 1v16a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1ZM8.995 12 20 5.678v12.644L8.995 12Zm-2.474.885a1.012 1.012 0 0 1 0-1.77l13.872-7.97c.71-.407 1.607.088 1.607.886v15.938c0 .798-.898 1.293-1.607.885l-13.872-7.97Z"
      />
    </svg>
  </span>
)
