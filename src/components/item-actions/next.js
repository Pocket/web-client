import { css } from 'linaria'
import { OverflowMenuIcon } from 'components/icons/OverflowMenuIcon'
import { LikeIcon } from 'components/icons/LikeIcon'
import { SaveIcon } from 'components/icons/SaveIcon'
import { SaveFilledIcon } from 'components/icons/SaveFilledIcon'
import { LikeFilledIcon } from 'components/icons/LikeFilledIcon'
import { RemoveCircledIcon } from 'components/icons/RemoveCircledIcon'
import { IosShareIcon } from 'components/icons/IosShareIcon'
import { ReportIcon } from 'components/icons/ReportIcon'
import { ListenIcon } from 'components/icons/ListenIcon'
import { usePopover, popoverBase } from 'components/popover/popover'

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
    70% {
      transform: scale(180%);
      opacity: 0.5;
    }
    100% {
      opacity: 1;
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

    &.save-action {
      margin-right: 0.25rem;
      .icon {
        color: var(--color-actionBrand);
        transform: translateY(1px);
      }
    }
    .overflow {
      margin-right: 0;
    }
  }

  &.status-saving {
    .saveIcon {
      display: none;
    }
    .likeIcon {
      display: inline-block;
      animation: 550ms pulse;
    }
  }

  .overflow-container {
    display: inline-block;
    position: relative;
  }
`

const popoverContainer = css`
  ${popoverBase};
  position: absolute;
  bottom: 1.5rem;
  right: 0;
  background-color: var(--color-popoverCanvas);
  border-radius: 8px;

  button {
    padding: 0.5rem 1rem;
    margin: 0;
    display: block;
    font-size: 1rem;
    line-height: 1.25;
    font-weight: 400;
    border-radius: 0;
    text-decoration: none;
    width: 100%;
    box-sizing: border-box;
    text-align: left;
    .icon {
      font-size: 24px;
      margin-right: 0.25rem;
    }
    &:first-of-type {
      border-radius: 8px 8px 0 0;
    }
    &:last-of-type {
      border-radius: 0 0 8px 8px;
    }
    &:hover {
      text-decoration: none;
      color: var(--color-menuItemHoverText);
      background-color: var(--color-menuItemHover);
    }
  }
`

export function NextActions({ onSave, onUnsave, saveStatus }) {
  // Popover Effect
  const { popTrigger, popBody, shown } = usePopover({
    placement: 'top-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 0]
        }
      }
    ]
  })

  return (
    <div className={`${nextActionStyle} status-${saveStatus}`}>
      {saveStatus === 'saved' ? (
        <button className="save-action saved" onClick={onUnsave}>
          <SaveFilledIcon className="saveIcon" />
          <LikeFilledIcon className="likeIcon" />
        </button>
      ) : (
        <button className="save-action save" onClick={onSave}>
          <SaveIcon className="saveIcon" />
          <LikeIcon className="likeIcon" />
        </button>
      )}
      <div className="overflow-container">
        <button className="overflow" ref={popTrigger}>
          <OverflowMenuIcon />
        </button>
        {shown ? (
          <CardActionMenu
            popoverRef={popBody}
            saveStatus={saveStatus}
            onSave={onSave}
            onUnsave={onUnsave}
          />
        ) : null}
      </div>
    </div>
  )
}

function CardActionMenu({ ref, saveStatus, onSave, onUnsave }) {
  return (
    <div className={popoverContainer}>
      <button>
        <ReportIcon /> Report
      </button>
      <button>
        <IosShareIcon /> Share
      </button>
      <button>
        <ListenIcon /> Listen
      </button>
      {saveStatus === 'saved' ? (
        <button onClick={onUnsave}>
          <RemoveCircledIcon /> Un-Save
        </button>
      ) : (
        <button onClick={onSave}>
          <SaveIcon /> Save
        </button>
      )}
    </div>
  )
}



