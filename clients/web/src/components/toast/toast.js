import { css, cx } from '@emotion/css'
import { CheckIcon } from '@ui/icons/CheckIcon'
import { ErrorIcon } from '@ui/icons/ErrorIcon'
import { Fade } from 'common/utilities/animation/fade'

const toastWrapper = css`
  text-align: left;
  width: 100%;
  padding: 0;
  box-sizing: border-box;
  transform: translateZ(0.01);
  .toastBlock {
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    line-height: 22px;
    font-size: 16px;
    font-family: 'Graphik Web';
    padding: 20px;
    border-radius: 4px;
    margin: 20px 0 0 0;
    min-width: 275px;
    border-radius: 4px;
    background-color: var(--color-actionPrimary);
    color: var(--color-actionBrandText);

    p {
      margin: 0;
    }

    .actionWrapper {
      padding-left: 1rem;
    }

    button.text {
      color: var(--color-actionBrandText);
      font-weight: 500;
      cursor: pointer;
    }

    &.success {
      background-color: var(--color-actionPrimary);
      color: var(--color-actionBrandText);
    }
    &.neutral {
      background-color: var(--color-actionPrimary);
      color: var(--color-actionBrandText);
    }
    &.warn {
      background-color: var(--color-error);
      color: var(--color-actionBrandText);

      button.text {
        color: var(--color-actionBrandText);
      }
    }
  }
  &.actionWrapper {
    text-align: right;
  }
`

export function Toast({ isError, message, undoString, type, show, remove, showUndo, handleUndo }) {
  const IconToShow = isError ? ErrorIcon : CheckIcon
  const status = isError ? 'warn' : 'success'

  return (
    <Fade show={show} remove={remove}>
      <div className={toastWrapper}>
        <div className={cx('toastBlock', `${type}`, `${status}`)} data-testid={message}>
          <p>{message}</p>
          <div className="actionWrapper">
            {showUndo ? (
              <button onClick={handleUndo} className="text">
                {undoString}
              </button>
            ) : (
              <IconToShow />
            )}
          </div>
        </div>
      </div>
    </Fade>
  )
}
