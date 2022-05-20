import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const GoogleColorIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23 12.25c0-.78-.071-1.53-.204-2.25H12.225v4.254h6.04c-.26 1.375-1.05 2.54-2.24 3.32v2.76h3.628C21.776 18.42 23 15.6 23 12.25Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.225 23c3.03 0 5.571-.985 7.428-2.665l-3.627-2.76c-1.005.66-2.291 1.05-3.801 1.05-2.924 0-5.398-1.935-6.28-4.535h-3.75v2.85C4.04 20.535 7.836 23 12.224 23Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.944 14.09A6.492 6.492 0 0 1 5.592 12c0-.725.127-1.43.352-2.09V7.06h-3.75a10.816 10.816 0 0 0 0 9.88l3.75-2.85Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.224 5.375c1.648 0 3.128.555 4.291 1.645l3.22-3.155C17.79 2.09 15.25 1 12.225 1 7.836 1 4.04 3.465 2.193 7.06l3.75 2.85c.882-2.6 3.357-4.535 6.28-4.535Z"
        fill="currentColor"
      />
    </svg>
  </span>
)
