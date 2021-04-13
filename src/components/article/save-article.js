import { css } from 'linaria'
import classNames from 'classnames'
import { usePopover, popoverBase } from 'components/popover/popover'
import { SaveIcon } from '@pocket/web-ui'
import { SaveFilledIcon } from '@pocket/web-ui'
import { SavePopover } from 'components/item-actions/save-to-pocket'
import { breakpointLargeHandset } from '@pocket/web-ui'
import { Button } from '@pocket/web-ui'

const saveArticleStyles = css`
  padding-bottom: var(--spacing250);
  font-family: 'Graphik Web';

  p {
    font-size: var(--fontSize125);
    font-weight: 300;
    color: var(--color-textSecondary);
    margin-bottom: 0;
  }

  &.top {
    button,
    p {
      display: inline-block;
    }
    p {
      margin-left: var(--spacing075);
    }
  }

  &.bottom {
    padding-top: var(--spacing250);
    padding-bottom: var(--size050);
    p {
      margin-bottom: var(--spacing100);
    }
  }

  button {
    padding: var(--spacing050) var(--spacing075);
    line-height: var(--size150);

    & > span {
      height: var(--size150);
      width: var(--size150);
      margin-right: var(--spacing050);
    }
  }

  ${breakpointLargeHandset} {
    &.top {
      p {
        display: none;
      }
      .smallscreen {
        display: inline-block;
      }
    }

    &.bottom {
      text-align: center;
      p {
        font-size: var(--fontSize100);
      }
    }
  }
`

export function SaveArticleTop({ url, saveAction, saveStatus, isAuthenticated, trackSaveClick }) {
  return (
    <aside className={classNames(saveArticleStyles, 'top')}>
      <SaveStoryButton
        trackSaveClick={trackSaveClick}
        isAuthenticated={isAuthenticated}
        saveStatus={saveStatus}
        id="save-story-top"
        saveAction={saveAction}
        url={url}
        onClick={saveAction}
      />
      <p>Read when you’ve got time to spare.</p>
    </aside>
  )
}

export function SaveArticleBottom({
  url,
  saveAction,
  saveStatus,
  isAuthenticated,
  trackSaveClick
}) {
  return (
    <aside className={classNames(saveArticleStyles, 'bottom')}>
      <p>How was it? Save stories you love and never lose&nbsp;them.</p>
      <SaveStoryButton
        trackSaveClick={trackSaveClick}
        isAuthenticated={isAuthenticated}
        saveStatus={saveStatus}
        id="save-story-bottom"
        saveAction={saveAction}
        url={url}
        onClick={saveAction}
      />
    </aside>
  )
}

function SaveStoryButton({ url, isAuthenticated, saveStatus, saveAction, id, trackSaveClick }) {
  const saveCopy = {
    unsaved: 'Save Story',
    saving: 'Save Story',
    saved: 'Saved'
  }

  const handleClick = (event) => {
    event.preventDefault()
    event.stopPropagation()

    saveAction(url)
    trackSaveClick(id)
  }

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

  const saveClasses = classNames(saveStatus, 'card-actions')

  return (
    <>
      <Button onClick={handleClick} ref={popTrigger}>
        {saveStatus === 'saved' ? <SaveFilledIcon /> : <SaveIcon />}
        {saveCopy[saveStatus]}
      </Button>
      {!isAuthenticated && shown ? <SavePopover popoverRef={popBody} id={id} /> : null}
    </>
  )
}
