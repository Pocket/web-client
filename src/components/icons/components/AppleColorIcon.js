import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'
    
export const AppleColorIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M21.58 17.924c-.358.803-.783 1.543-1.276 2.223-.671.927-1.22 1.569-1.644 1.925-.657.585-1.36.885-2.114.902-.54 0-1.193-.15-1.952-.452-.761-.3-1.461-.45-2.101-.45-.672 0-1.392.15-2.162.45-.771.303-1.392.46-1.867.476-.723.03-1.443-.278-2.161-.926-.46-.387-1.033-1.052-1.72-1.993-.738-1.005-1.344-2.17-1.82-3.5C2.256 15.144 2 13.755 2 12.41c0-1.542.344-2.871 1.033-3.985a5.963 5.963 0 0 1 2.162-2.12 5.96 5.96 0 0 1 2.924-.798c.574 0 1.326.172 2.261.51.932.339 1.531.51 1.794.51.196 0 .861-.2 1.989-.601 1.066-.372 1.966-.526 2.703-.465 1.997.156 3.498.919 4.497 2.293-1.787 1.049-2.67 2.517-2.653 4.401.016 1.468.565 2.69 1.646 3.659.49.45 1.036.798 1.644 1.045-.132.37-.271.725-.42 1.066ZM17 .46c0 1.15-.435 2.224-1.3 3.218-1.043 1.182-2.305 1.865-3.674 1.757A3.478 3.478 0 0 1 12 5c0-1.105.496-2.287 1.377-3.253.44-.489 1-.896 1.678-1.22.678-.32 1.318-.497 1.92-.527.018.154.025.308.025.46Z"/></svg>
  </span>
)
  
