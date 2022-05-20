import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const TwitterColorIcon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23 5.132a8.976 8.976 0 0 1-2.592.715 4.567 4.567 0 0 0 1.985-2.51 9.013 9.013 0 0 1-2.865 1.102A4.495 4.495 0 0 0 16.232 3c-2.495 0-4.516 2.036-4.516 4.547 0 .357.045.704.119 1.034-3.754-.188-7.079-1.999-9.304-4.746a4.551 4.551 0 0 0 1.398 6.064 4.55 4.55 0 0 1-2.049-.566v.053c0 2.203 1.555 4.041 3.623 4.452-.381.11-.779.164-1.192.164-.287 0-.572-.029-.846-.08a4.512 4.512 0 0 0 4.214 3.155A9.029 9.029 0 0 1 1 18.959 12.707 12.707 0 0 0 7.914 21c8.307 0 12.847-6.922 12.847-12.928 0-.198-.007-.394-.014-.59A9.242 9.242 0 0 0 23 5.132Z"
        fill="currentColor"
      />
    </svg>
  </span>
)
