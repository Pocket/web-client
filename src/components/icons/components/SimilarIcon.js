import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'
    
export const SimilarIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M15.5 2a1 1 0 0 1 .938.653l1.596 4.313 4.313 1.596a1 1 0 0 1 0 1.876l-4.313 1.596-1.596 4.313a1 1 0 0 1-1.876 0l-1.596-4.313-4.313-1.596a1 1 0 0 1 0-1.876l4.313-1.596 1.596-4.313A1 1 0 0 1 15.5 2zm0 3.882-.818 2.21a1 1 0 0 1-.59.59l-2.21.818 2.21.818a1 1 0 0 1 .59.59l.818 2.21.818-2.21a1 1 0 0 1 .59-.59l2.21-.818-2.21-.818a1 1 0 0 1-.59-.59l-.818-2.21zM7 12a1 1 0 0 1 .938.653l.92 2.488 2.489.921a1 1 0 0 1 0 1.876l-2.488.92-.921 2.489a1 1 0 0 1-1.876 0l-.92-2.488-2.489-.921a1 1 0 0 1 0-1.876l2.488-.92.921-2.489A1 1 0 0 1 7 12zm0 3.882-.143.385a1 1 0 0 1-.59.59L5.882 17l.385.142a1 1 0 0 1 .59.591L7 18.12l.143-.386a1 1 0 0 1 .59-.59L8.118 17l-.385-.142a1 1 0 0 1-.59-.591L7 15.882z"/></svg>
  </span>
)
  
