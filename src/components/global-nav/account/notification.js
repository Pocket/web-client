import { css } from 'linaria'
import classNames from 'classnames'

const bubbleStyles = css`
  height: var(--size050);
  width: var(--size050);
  background-color: #4ABEFF;
  display: inline-block;
  margin-left: var(--spacing025);
  border-radius: 50%;
  vertical-align: middle;

  a:hover & {
    background-color: var(--color-actionPrimaryText);
  }
`

const floatingBubble = css`
  border: 1px solid var(--color-canvas);
  position: absolute;
  bottom: 0;
  right: 0;
  height: 0.625rem;
  width: 0.625rem;
`

export const InlineNotification = () => (
  <span
    aria-hidden="true"
    className={bubbleStyles} />
)

export const FloatingNotification = () => (
  <span
    aria-hidden="true"
    className={classNames(bubbleStyles, floatingBubble)} />
)
