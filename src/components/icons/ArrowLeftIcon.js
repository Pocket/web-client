import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const ArrowLeftIcon = ({
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
      <path d="M12.707 5.707a1 1 0 0 0-1.414-1.414l-7 7a1 1 0 0 0 0 1.414l7 7a1 1 0 0 0 1.414-1.414L7.414 13H19.05c.525 0 .95-.448.95-1s-.425-1-.95-1H7.414l5.293-5.293Z" />
    </svg>
  </span>
)
