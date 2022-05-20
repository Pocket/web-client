import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const TextSettingsIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="m11.532 7.483 1.688 5.769H9.822l1.71-5.77ZM4 19h4.134l.822-2.79h5.13l.822 2.79h4.697L14.69 4H8.956L4 19Z" />
    </svg>
  </span>
)
