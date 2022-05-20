import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const FowardBy15Icon = ({
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
      <path d="M12 2.833a9.167 9.167 0 1 0 9.13 10.001.917.917 0 0 1 1.825.165C22.45 18.606 17.74 23 12 23 5.925 23 1 18.075 1 12S5.925 1 12 1c3.457 0 6.54 1.594 8.556 4.086v-1.67a.917.917 0 0 1 1.833 0v4.348c0 .76-.616 1.375-1.375 1.375h-3.43a.917.917 0 1 1 0-1.834h2.291A9.162 9.162 0 0 0 12 2.833Z" />
      <path d="M15.93 13.623c0 1.393-.999 2.282-2.511 2.282-1.614 0-2.366-.88-2.43-2.053h1.366c.083.55.303.916 1.054.916.67 0 1.027-.467 1.027-1.164 0-.706-.403-1.146-1.063-1.146-.614 0-.99.22-1.256.523h-.825l.091-3.731h4.153v1.127h-3.043l-.028 1.641c.257-.311.715-.605 1.458-.605 1.191 0 2.007.816 2.007 2.21ZM9.856 15.804H8.37v-5.087l-1.33.87v-1.264L8.555 9.25h1.302v6.554Z" />
    </svg>
  </span>
)
