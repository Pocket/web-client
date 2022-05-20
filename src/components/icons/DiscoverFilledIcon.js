import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const DiscoverFilledIcon = ({
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
        d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11ZM6.343 6.343a1 1 0 0 1 1.078-.221l7.071 2.828a1 1 0 0 1 .558.557l2.828 7.071a1 1 0 0 1-1.3 1.3l-7.07-2.828a1 1 0 0 1-.558-.557L6.122 7.422a1 1 0 0 1 .221-1.079Zm4.305 7.009 2.704-2.704-4.507-1.803 1.803 4.507Z"
      />
    </svg>
  </span>
)
