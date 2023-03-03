import { useState } from 'react'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'

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

  const showOptions = selectOptions.length > 0

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
      <ModalFooter>
        {/* <button onClick={createAction}>
          Create List
        </button> */}

        <button onClick={cancelAction} className="secondary">
          Cancel
        </button>

        <button type="submit" onClick={confirmAction}>
          Save to List
        </button>
      </ModalFooter>
    </Modal>
  )
}
