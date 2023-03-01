import { useState, useEffect } from 'react'
import { Button } from 'components/buttons/button'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { mutateListAddCancel } from 'connectors/lists/mutation-add.state'
import { mutateListAddConfirm } from 'connectors/lists/mutation-add.state'
import { TextInput } from 'components/form-fields/text-input'

export const AddToListModal = () => {
  const dispatch = useDispatch()

  const showModal = useSelector((state) => state.mutationListCreate)

  const confirmListSelection = () => {
    dispatch(mutateListAddConfirm())
  }

  const cancelListSelection = () => dispatch(mutateListAddCancel())

  return (
    <Modal
      title="Save to List"
      screenReaderLabel="Save to List"
      isOpen={showModal}
      handleClose={cancelListSelection}>
      <ModalBody>
        { /* Lists */}
      </ModalBody>
      <ModalFooter>
        <Button onClick={cancelListSelection}>
          Create List
        </Button>

        <Button onClick={cancelListSelection}>
          Cancel
        </Button>

        <Button type="submit" onClick={confirmListSelection}>
          Save to List
        </Button>
      </ModalFooter>
    </Modal>
  )
}
