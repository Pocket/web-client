import { useState } from 'react'
import { css } from '@emotion/css'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { AddIcon } from 'components/icons/AddIcon'
import { breakpointMediumHandset } from 'common/constants'
import { useTranslation } from 'next-i18next'

const footerStyles = css`
  display: flex;
  justify-content: space-between;

  .create {
    margin-left: 0;
    color: var(--color-actionPrimary);

    ${breakpointMediumHandset} {
      padding: 0;
    }
  }
`

export const AddToListModal = ({
  appRootSelector,
  showModal,
  modalTitle,
  handleCreate = () => {},
  handleClose = () => {},
  handleSubmit = () => {},
  previouslySelected = '',
  selectOptions = []
}) => {
  const { t } = useTranslation()

  const [value, setValue] = useState(previouslySelected)

  const setOptionValue = (e) => setValue(e.target.value)

  const createAction = () => handleCreate()
  const cancelAction = () => handleClose()
  const confirmAction = () => handleSubmit(value || selectOptions[0])

  return (
    <Modal
      appRootSelector={appRootSelector}
      title={modalTitle}
      screenReaderLabel={modalTitle}
      isOpen={showModal}
      handleClose={cancelAction}>
      <ModalBody>
        <select onChange={setOptionValue} value={value}>
          {selectOptions.map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
      </ModalBody>
      <ModalFooter className={footerStyles}>
        <button onClick={createAction} className="text create">
          <AddIcon /> {t('list:create-list', 'Create List')}
        </button>

        <div>
          <button onClick={cancelAction} className="secondary">
            {t('list:cancel', 'Cancel')}
          </button>

          <button onClick={confirmAction} autoFocus={true}>
            {t('list:save-to-list', 'Save to List')}
          </button>
        </div>
      </ModalFooter>
    </Modal>
  )
}
