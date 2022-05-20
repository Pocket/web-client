import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const DimmerIcon = ({ className, id, title, description, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"
      />
      <path d="M6 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM20 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM12 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM7.757 6.343a1 1 0 1 1-1.414 1.414 1 1 0 0 1 1.414-1.414ZM17.657 17.657a1 1 0 1 0-1.414-1.414 1 1 0 0 0 1.414 1.414ZM17.657 7.757a1 1 0 1 1-1.414-1.414 1 1 0 0 1 1.414 1.414ZM6.343 17.657a1 1 0 1 0 1.414-1.414 1 1 0 0 0-1.414 1.414Z" />
    </svg>
  </span>
)
