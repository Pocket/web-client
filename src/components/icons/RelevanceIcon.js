import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const RelevanceIcon = ({
  className,
  id,
  title,
  description,
  ...rest
}) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8.25 21.75h7.5M7.378 15.657A7.486 7.486 0 0 1 4.5 9.792c-.022-4.065 3.255-7.444 7.32-7.54a7.5 7.5 0 0 1 4.812 13.397 2.278 2.278 0 0 0-.882 1.786V18a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v-.565a2.26 2.26 0 0 0-.872-1.778v0Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.761 5.324a4.493 4.493 0 0 1 3.676 3.67"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
)
