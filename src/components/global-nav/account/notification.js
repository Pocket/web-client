import { css, cx } from '@emotion/css'

const bubbleStyles = css`
  height: var(--size050);
  width: var(--size050);
  background-color: var(--color-teal85);
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

export const InlineNotification = (props) => (
  <span {...props} aria-hidden="true" className={bubbleStyles} />
)

export const FloatingNotification = (props) => (
  <span {...props} aria-hidden="true" className={cx(bubbleStyles, floatingBubble)} />
)
