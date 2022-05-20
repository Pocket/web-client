import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'
    
export const ReadingIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M0 4a2 2 0 0 1 2-2h6a4.99 4.99 0 0 1 4 2 4.99 4.99 0 0 1 4-2h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6.077c-.912 0-1.774.415-2.343 1.125l-.354.445c-.302.375-.772.55-1.222.535-.452.015-.926-.155-1.23-.535l-.354-.445A3.004 3.004 0 0 0 8.077 20H2a2 2 0 0 1-2-2V4zm8 0c1.657 0 3 1.345 3 3v11.945A4.978 4.978 0 0 0 8.077 18H2V4h6zm7.923 14a4.98 4.98 0 0 0-2.923.945V7c0-1.655 1.343-3 3-3v4.46c0 .215.249.33.412.19l1.426-1.21c.093-.08.23-.08.324 0l1.426 1.21c.163.14.412.025.412-.19V4h2v14h-6.077z" fillRule="evenodd"/></svg>
  </span>
)
  
