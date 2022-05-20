import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const CheckCircledIcon = ({ className, ...rest }) => (
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
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 2c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.707 9.293a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L11 13.586l4.293-4.293a1 1 0 0 1 1.414 0Z"
      />
    </svg>
  </span>
)
