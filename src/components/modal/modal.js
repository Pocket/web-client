import { css } from 'linaria'
import classNames from 'classnames'

const backdrop = css`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  user-select: none;
  cursor: default;
  z-index: var(--zIndexModalShade);
`

const shade = css`
  background-color: rgba(2, 2, 2, 0.2);
`

const modalContent = css`
  position: relative;
  z-index: var(--zIndexModal);
  font-family: 'Graphik Web';
`
export const Modal = ({ children, cancel }) => {
  const handleShadeClicks = () => {
    if (!cancel) return
    cancel()
  }

  return (
    <div className={backdrop}>
      <div
        className={classNames(backdrop, shade)}
        onClick={handleShadeClicks}
      />
      <div className={modalContent}>{children}</div>
    </div>
  )
}
