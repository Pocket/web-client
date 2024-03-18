import { css, cx } from '@emotion/css'
import { usePopover } from 'components/popover/popover'
import { SaveIcon } from '@ui/icons/SaveIcon'
import { SaveFilledIcon } from '@ui/icons/SaveFilledIcon'
import { SavePopover } from 'components/item-actions/save-to-pocket'
import { useTranslation } from 'next-i18next'

const saveListStyles = css`
  .icon {
    height: 16px;
    width: 16px;
  }
`

export const SaveListButton = ({ isAuthenticated, saveStatus = 'unsaved', saveAction }) => {
  const { t } = useTranslation()

  const saveCopy = {
    unsaved: t('list:save-list', 'Save List'),
    saving: t('list:save-list', 'Save List'),
    saved: t('list:saved', 'Saved')
  }

  const handleClick = () => saveAction()

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
      <button
        onClick={handleClick}
        ref={popTrigger}
        className={cx(saveListStyles, 'brand', 'small')}>
        {saveStatus === 'saved' ? <SaveFilledIcon /> : <SaveIcon />} {saveCopy[saveStatus]}
      </button>
      {!isAuthenticated && shown ? <SavePopover popoverRef={popBody} /> : null}
    </>
  )
}
