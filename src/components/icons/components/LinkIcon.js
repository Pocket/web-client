import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const LinkIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M4.879 9.121A3 3 0 1 1 9.122 4.88l3.954 3.95.045.05a3 3 0 0 1 0 4.242 1 1 0 1 0 1.415 1.415 5 5 0 0 0 0-7.073l-4-3.999a5 5 0 0 0-7.071 7.072l1.17 1.171a1 1 0 0 0 1.415-1.414L4.879 9.121Z" />
      <path d="M10.879 15.121a3 3 0 0 1 0-4.242 1 1 0 0 0-1.415-1.415 5 5 0 0 0 0 7.071l3.999 4.002a5 5 0 1 0 7.073-7.072l-1.171-1.172a1 1 0 0 0-1.415 1.414l1.171 1.172a3 3 0 1 1-4.242 4.242.996.996 0 0 0-.05-.045l-3.95-3.955Z" />
    </svg>
  </span>
)
