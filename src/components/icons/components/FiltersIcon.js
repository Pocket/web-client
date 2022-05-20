import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const FiltersIcon = ({ className, ...rest }) => (
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
        d="M3 3a1 1 0 0 1 2 0v10.17a3.001 3.001 0 0 1 0 5.66V21a1 1 0 1 1-2 0v-2.17a3.001 3.001 0 0 1 0-5.66V3Zm2 13a1 1 0 1 0-2 0 1 1 0 0 0 2 0ZM11 3a1 1 0 1 1 2 0v6.17a3.001 3.001 0 0 1 0 5.66V21a1 1 0 1 1-2 0v-6.17a3.001 3.001 0 0 1 0-5.66V3Zm2 9a1 1 0 1 0-2 0 1 1 0 0 0 2 0ZM19 3a1 1 0 1 1 2 0v2.17a3.001 3.001 0 0 1-.01 5.663l-.117 10.19a1 1 0 1 1-2-.024l.117-10.173A3.001 3.001 0 0 1 19 5.17V3Zm2 5a1 1 0 1 0-2 0 1 1 0 0 0 2 0Z"
      />
    </svg>
  </span>
)
