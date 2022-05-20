import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const LinkCopyIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <g fillRule="evenodd">
        <path d="M19.392 16.192a3 3 0 0 1-.117 4.354c-1.207 1.087-3.097.917-4.246-.231l-4.83-4.83a3 3 0 0 1 0-4.243 1 1 0 0 0-1.414-1.414 5.001 5.001 0 0 0 0 7.07l4.798 4.799c1.847 1.847 4.846 2.145 6.859.482a5 5 0 0 0 .364-7.401l-1.414-1.414a.999.999 0 1 0-1.414 1.414l1.414 1.414zM2.09 3.828a5.002 5.002 0 0 1 7.4-.364l4.95 4.95a5 5 0 0 1 0 7.07 1 1 0 0 1-1.413-1.413 3 3 0 0 0 0-4.243l-4.95-4.95a3 3 0 0 0-4.353.117c-1.088 1.207-.918 3.097.23 4.246l1.295 1.294a1 1 0 0 1-1.414 1.414l-1.263-1.262C.727 8.84.428 5.84 2.09 3.827z" />
        <path fillRule="nonzero" d="M19 1a1 1 0 0 1 2 0v6a1 1 0 0 1-2 0V1z" />
        <path fillRule="nonzero" d="M23 3a1 1 0 0 1 0 2h-6a1 1 0 0 1 0-2h6z" />
      </g>
    </svg>
  </span>
)
