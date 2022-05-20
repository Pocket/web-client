import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const ReplyIcon = ({ className, ...rest }) => (
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
        d="M10.383 3.076A1 1 0 0 1 11 4v4.034c2.87.197 5.682 1.23 7.864 2.927C21.31 12.863 23 15.636 23 19a1 1 0 0 1-1.554.832h-.002l-.01-.007-.045-.03a22.996 22.996 0 0 0-.916-.552 29.548 29.548 0 0 0-2.63-1.33c-1.932-.858-4.375-1.69-6.843-1.875V20a1 1 0 0 1-1.707.707l-8-8a1 1 0 0 1 0-1.414l8-8a1 1 0 0 1 1.09-.217Zm10.385 14.045c-.462-1.821-1.587-3.38-3.132-4.582C15.571 10.933 12.79 10 10 10a1 1 0 0 1-1-1V6.414L3.414 12 9 17.586V15a1 1 0 0 1 1-1c3.202 0 6.35 1.061 8.656 2.086.809.36 1.523.719 2.112 1.035Z"
      />
    </svg>
  </span>
)
