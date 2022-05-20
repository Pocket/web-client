import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from 'linaria'

export const RedditMonoIcon = ({
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
      <path d="M22.5 11.846a2.617 2.617 0 0 0-2.614-2.615 2.58 2.58 0 0 0-1.57.53c-1.459-1.014-3.37-1.618-5.401-1.771l1.096-2.574 3.19.746a1.956 1.956 0 0 0 1.94 1.761c1.081 0 1.96-.88 1.96-1.961 0-1.082-.879-1.962-1.96-1.962-.684 0-1.287.354-1.637.89l-3.728-.873a.653.653 0 0 0-.752.38L11.51 7.956c-2.194.075-4.285.694-5.864 1.771a2.56 2.56 0 0 0-1.531-.495A2.617 2.617 0 0 0 1.5 11.846c0 .956.521 1.82 1.321 2.264-.01.115-.014.233-.014.352C2.807 18.067 6.91 21 11.954 21c5.043 0 9.148-2.933 9.148-6.538 0-.102-.004-.203-.01-.304a2.59 2.59 0 0 0 1.408-2.312ZM7.38 13.808c0-.72.587-1.308 1.307-1.308s1.307.587 1.307 1.308c0 .722-.587 1.307-1.307 1.307s-1.306-.585-1.306-1.307Zm7.592 4.337a5.141 5.141 0 0 1-6.035 0 .653.653 0 0 1 .766-1.059 3.83 3.83 0 0 0 4.503 0 .653.653 0 1 1 .766 1.06Zm.25-3.03a1.308 1.308 0 1 1 .001-2.615 1.308 1.308 0 0 1-.002 2.615Z" />
    </svg>
  </span>
)
