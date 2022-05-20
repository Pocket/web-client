import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const TextSizeIcon = ({
  className,
  id,
  title,
  description,
  ...rest
}) => (
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
        d="M12.485 18.5H7.732l-.648-1.927H3.658L3.01 18.5H1l3.108-8.667h2.79l2.43 6.86L13.238 5.5h5.258L23 18.5h-4.305l-.754-2.418h-4.702l-.754 2.418Zm4.662-4.982-1.547-5-1.567 5h3.114Zm-10.526 1.66-1.243-3.745L4.12 15.18h2.5Z"
      />
    </svg>
  </span>
)
