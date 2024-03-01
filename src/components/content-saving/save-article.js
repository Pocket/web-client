import { css, cx } from '@emotion/css'
import { usePopover } from 'components/popover/popover'
import { SaveIcon } from 'components/icons/SaveIcon'
import { SaveFilledIcon } from 'components/icons/SaveFilledIcon'
import { SavePopover } from 'components/item-actions/save-to-pocket'
import { breakpointLargeHandset } from 'common/constants'
import { useTranslation } from 'next-i18next'

const saveArticleStyles = css`
  padding-bottom: var(--spacing150);
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
  const { t } = useTranslation()
  return (
    <div className={cx(saveArticleStyles, 'top', 'save-article')}>
      <SaveStoryButton
        trackSaveClick={trackSaveClick}
        isAuthenticated={isAuthenticated}
        saveStatus={saveStatus}
        id="save-story-top"
        saveAction={saveAction}
        url={url}
        onClick={saveAction}
      />
      <p> {t('item-action:save-article-top', 'Read when you’ve got time to spare.')}</p>
    </div>
  )
}

export function SaveArticleBottom({
  url,
  saveAction,
  saveStatus,
  isAuthenticated,
  trackSaveClick
}) {
  const { t } = useTranslation()

  return (
    <div className={cx(saveArticleStyles, 'top', 'save-article')}>
      <SaveStoryButton
        trackSaveClick={trackSaveClick}
        isAuthenticated={isAuthenticated}
        saveStatus={saveStatus}
        id="save-story-bottom"
        saveAction={saveAction}
        url={url}
        onClick={saveAction}
      />
      <p>
        {t(
          'item-action:save-article-bottom',
          'How was it? Save stories you love and never lose them.'
        )}
      </p>
    </div>
  )
}

function SaveStoryButton({ url, isAuthenticated, saveStatus, saveAction, id, trackSaveClick }) {
  const { t } = useTranslation()

  const saveCopy = {
    unsaved: t('item-action:save-unsaved', 'Save'),
    saving: t('item-action:save-saving', 'Save'),
    saved: t('item-action:save-saved', 'Saved')
  }

  const handleClick = (event) => {
    event.preventDefault()
    event.stopPropagation()

    saveAction(url, id)
    if (trackSaveClick) trackSaveClick(id) // Legacy method: Remove on analytics confirmation
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

  return (
    <>
      <button className="primary" onClick={handleClick} ref={popTrigger} data-testid={id}>
        {saveStatus === 'saved' ? <SaveFilledIcon /> : <SaveIcon />}
        {saveCopy[saveStatus]}
      </button>
      {!isAuthenticated && shown ? <SavePopover popoverRef={popBody} id={id} /> : null}
    </>
  )
}
