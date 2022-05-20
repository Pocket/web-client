import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const FilterArrowsIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M9.838 8.809A1 1 0 0 1 8.662 7.19l2.75-2a1 1 0 0 1 1.176 0l2.75 2a1 1 0 0 1-1.176 1.618L12 7.236 9.838 8.81zm4.324 6.382a1 1 0 1 1 1.176 1.618l-2.75 2a1 1 0 0 1-1.176 0l-2.75-2a1 1 0 1 1 1.176-1.618L12 16.764l2.162-1.573z" />
    </svg>
  </span>
)
