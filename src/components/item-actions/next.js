import { css } from 'linaria'
import { OverflowMenuIcon } from 'components/icons/OverflowMenuIcon'
import { LikeIcon } from 'components/icons/LikeIcon'
import { SaveIcon } from 'components/icons/SaveIcon'
import { SaveFilledIcon } from 'components/icons/SaveFilledIcon'
import { LikeFilledIcon } from 'components/icons/LikeFilledIcon'

const nextActionStyle = css`
  @keyframes pulse {
    0% {
      transform: 0;
      opacity: 1;
    }
    20% {
      transform: scale(90%);
      opactiy: 0.2;
    }
    80% {
      transform: scale(150%);
      opacity: 0.5;
    }
    100% {
      transform: 0;
    }
  }
  text-align: right;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  z-index: var(--zIndexModal);
  color: var(--color-primary);

  button {
    display: inline-block;
    background-color: var(--color-canvas);
    box-sizing: content-box;
    border-radius: 50%;
    padding: 3px;
    font-size: 1.5rem;
    line-height: 1em;
    color: var(--color-actionSecondary);

    &:first-of-type {
      margin-right: 0.5rem;
    }

    &:focus {
      outline: none;
    }

    &:hover {
      color: var(--color-actionSecondaryHover);
    }
    .saveIcon {
      display: inline-block;
    }
    .likeIcon {
      display: none;
    }

    &:hover {
      .saveIcon {
        display: none;
      }
      .likeIcon {
        display: inline-block;
      }
    }

    &:active {
      .likeIcon {
        animation: 1000ms pulse;
      }
    }

    span {
      margin-top: 0;
    }

    &:first-of-type {
      .icon {
        color: var(--color-actionBrand);
        transform: translateY(1px);
      }
    }
    &:last-of-type {
      margin-right: 0;
    }
  }
`

export function NextActions({ onSave, onUnsave, saveStatus }) {
  return (
    <div className={`${nextActionStyle}`}>
      {saveStatus === 'saved' ? (
        <button className="saved" onClick={onUnsave}>
          <SaveFilledIcon className="saveIcon" />
          <LikeFilledIcon className="likeIcon" />
        </button>
      ) : (
        <button className="save" onClick={onSave}>
          <SaveIcon className="saveIcon" />
          <LikeIcon className="likeIcon" />
        </button>
      )}
      <button>
        <OverflowMenuIcon />
      </button>
    </div>
  )
}
