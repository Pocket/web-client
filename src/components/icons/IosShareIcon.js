import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const IosShareIcon = ({
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
        d="M11.293 1.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L13 4.414V13a1 1 0 1 1-2 0V4.414L8.707 6.707a1 1 0 0 1-1.414-1.414l4-4Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 10a1 1 0 0 1 1 1v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a1 1 0 1 1 2 0v7a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-7a1 1 0 0 1 1-1Z"
      />
    </svg>
  </span>
)
