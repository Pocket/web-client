import { css, cx } from 'linaria'
import { usePopover } from 'components/popover/popover'
import { SaveIcon } from 'components/icons/SaveIcon'
import { SaveFilledIcon } from 'components/icons/SaveFilledIcon'
import { SavePopover } from 'components/item-actions/save-to-pocket'

const saveListStyles = css`
  .icon {
    height: 16px;
    width: 16px;
  }
`

export const SaveListButton = ({
  isAuthenticated,
  saveStatus = "unsaved",
  saveAction
}) => {
  const saveCopy = {
    unsaved: "Save List",
    saving: "Save List",
    saved: "Saved"
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
        className={cx(saveListStyles, "brand", "small")}
      >
        {saveStatus === 'saved' ? <SaveFilledIcon /> : <SaveIcon />}{' '}
        {saveCopy[saveStatus]}
      </button>
      {!isAuthenticated && shown ? <SavePopover popoverRef={popBody} /> : null}
    </>
  )
}
