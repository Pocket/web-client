import { useState } from 'react'
import { css } from 'linaria'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { Button } from 'components/buttons/button'

const footerStyles = css`
  display: flex;
  justify-content: space-between;
`

export const AddToListModal = ({
  appRootSelector,
  showModal,
  modalTitle,
  handleCreate = () => { },
  handleClose = () => { },
  handleSubmit = () => { },
  previouslySelected = '',
  selectOptions = []
}) => {
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
        <Button onClick={createAction} variant="inline">
          Create List
        </Button>

        <div>
          <Button onClick={cancelAction} variant="secondary">
            Cancel
          </Button>

          <Button onClick={confirmAction}>
            Save to List
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}
