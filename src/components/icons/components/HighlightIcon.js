import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'
    
export const HighlightIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M5.512 8.546a3 3 0 0 0-.51 4.195l-.724.723a3.001 3.001 0 0 0-.586 3.415L1.18 19.391a1 1 0 0 0 .39 1.656l4.243 1.414a1 1 0 0 0 1.023-.241l1.098-1.098a3.001 3.001 0 0 0 3.415-.586l.746-.746a3.001 3.001 0 0 0 4.133-.77l6.406-9.15a3 3 0 0 0-.337-3.842l-4.112-4.112a3 3 0 0 0-3.98-.233L5.512 8.546Zm9.932-5.294-8.693 6.863a1 1 0 0 0-.087 1.492l6.4 6.4a1 1 0 0 0 1.526-.134l6.405-9.15a1 1 0 0 0-.112-1.28L16.771 3.33a1 1 0 0 0-1.327-.078ZM6.4 14.172l-.707.707a1 1 0 0 0 0 1.414l2.829 2.828a1 1 0 0 0 1.414 0l.707-.707L6.4 14.172Z"/></svg>
  </span>
)
  
