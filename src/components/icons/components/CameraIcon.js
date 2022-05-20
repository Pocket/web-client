import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const CameraIcon = ({ className, ...rest }) => (
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
        d="M16 14.723V16a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4h7a4 4 0 0 1 4 4v1.277l5.504-3.145A1 1 0 0 1 23 7v10a1 1 0 0 1-1.496.868L16 14.723ZM5 6h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm11 6.42 5 2.857V8.723l-5 2.857v.84Z"
      />
    </svg>
  </span>
)
