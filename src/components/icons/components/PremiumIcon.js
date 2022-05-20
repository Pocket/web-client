import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const PremiumIcon = ({ className, ...rest }) => (
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
        d="M3.983 3.333A2.84 2.84 0 0 1 6.38 2h11.24c.969 0 1.872.502 2.397 1.333l2.528 4a2.958 2.958 0 0 1-.108 3.314l-8.148 11.18a2.82 2.82 0 0 1-4.578 0l-8.148-11.18a2.958 2.958 0 0 1-.108-3.314l2.528-4Zm2.397.607a.946.946 0 0 0-.799.445l-2.528 4c-.214.34-.2.78.037 1.104l8.147 11.18a.94.94 0 0 0 1.526 0l8.147-11.18a.986.986 0 0 0 .037-1.104l-2.528-4a.946.946 0 0 0-.8-.445H6.38Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.39 2.046a.95.95 0 0 1 .614 1.197l-1.72 5.336a.95.95 0 0 0-.006.565l3.633 12.075a.951.951 0 1 1-1.821.548L7.457 9.692a2.853 2.853 0 0 1 .016-1.697l1.72-5.336a.95.95 0 0 1 1.197-.613Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.61 2.046a.95.95 0 0 0-.613 1.197l1.72 5.336a.95.95 0 0 1 .005.565L11.09 21.22a.951.951 0 1 0 1.82.548l3.634-12.075a2.853 2.853 0 0 0-.017-1.697l-1.72-5.336a.95.95 0 0 0-1.197-.613Z"
      />
      <path fillRule="evenodd" clipRule="evenodd" d="M21.985 9.608H2.015V7.706h19.97v1.902Z" />
    </svg>
  </span>
)
