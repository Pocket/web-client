import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const LikeIcon = ({ className, id, title, description, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M16.58 4C19.27 4 21 5.84 21 8.7c0 3.36-3.03 6.72-9 11.95-5.97-5.24-9-8.59-9-11.95C3 5.67 4.57 4 7.42 4c1.17 0 2.16.51 3.05 1.57l.763.918a1 1 0 0 0 1.536.002l.761-.91C14.42 4.51 15.42 4 16.58 4Zm0-2c-1.78 0-3.32.78-4.58 2.29C10.74 2.78 9.2 2 7.42 2 3.59 2 1 4.44 1 8.7c0 4.2 3.5 8.18 10.42 14.09A.9.9 0 0 0 12 23c.21 0 .41-.07.58-.22C19.5 16.88 23 12.9 23 8.7 23 4.55 20.18 2 16.58 2Z" />
    </svg>
  </span>
)
