import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const SettingsIcon = ({
  className,
  id,
  title,
  description,
  ...rest
}) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fill="none"
        d="m21.736 10.317-2.942-.5a7.08 7.08 0 0 0-.448-1.077l1.729-2.434a.316.316 0 0 0-.034-.407l-1.94-1.94a.316.316 0 0 0-.407-.034l-2.434 1.73a7.088 7.088 0 0 0-1.078-.449l-.499-2.942A.317.317 0 0 0 13.371 2H10.63a.317.317 0 0 0-.312.264l-.5 2.942c-.37.12-.73.27-1.077.448L6.306 3.925a.317.317 0 0 0-.407.034L3.959 5.9a.317.317 0 0 0-.034.407l1.73 2.434a7.085 7.085 0 0 0-.449 1.078l-2.942.499a.317.317 0 0 0-.264.312v2.742a.317.317 0 0 0 .264.312l2.942.5c.12.37.27.73.448 1.077l-1.729 2.434a.316.316 0 0 0 .034.408L5.9 20.04a.317.317 0 0 0 .407.034l2.434-1.73c.347.18.707.33 1.078.449l.499 2.942a.317.317 0 0 0 .312.264h2.742a.317.317 0 0 0 .312-.264l.5-2.942c.37-.12.73-.27 1.077-.448l2.434 1.729a.317.317 0 0 0 .407-.034l1.94-1.94a.317.317 0 0 0 .034-.407l-1.73-2.434c.18-.347.33-.707.449-1.078l2.942-.499a.317.317 0 0 0 .264-.312V10.63a.317.317 0 0 0-.264-.312Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  </span>
)
