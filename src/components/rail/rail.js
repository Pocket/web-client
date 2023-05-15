import { css, cx } from '@emotion/css'

const railWrapper = css`
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  width: 350px;
  background-color: var(--color-dividerTertiary);
  box-shadow: 2px 0px 4px 0px rgba(0, 0, 0, 0.12);
  border-right: 1px solid var(--color-dividerSecondary);
`

export const Rail = ({ clickAction, children }) => (
  <div className={cx(railWrapper, 'rail-wrapper')} onClick={clickAction}>
    {children}
  </div>
)
