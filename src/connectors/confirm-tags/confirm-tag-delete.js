import { useRouter } from 'next/router'
import { Button } from '@pocket/web-ui'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { cancelDeleteUserTag } from 'containers/my-list/tags-page/tags-page.state'
import { confirmDeleteUserTag } from 'containers/my-list/tags-page/tags-page.state'

export const TagDeleteModal = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  // Handle delete actions with confirmation
  const tagToDelete = useSelector((state) => state.userTags.tagToDelete)

  const showModal = tagToDelete !== false
  const confirmTagDelete = () => dispatch(confirmDeleteUserTag(tagToDelete, router)) //prettier-ignore
  const cancelTagDelete = () => dispatch(cancelDeleteUserTag())

  const appRootSelector = '#__next'

  return (
    <Modal
      title="Delete Tag"
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel="Delete Tag"
      handleClose={cancelTagDelete}>
      <ModalBody>Delete the tag "{tagToDelete}"?</ModalBody>
      <ModalFooter>
        <em className="footnote">
          Deleting the tag "{tagToDelete}" will remove it from all items. Are
          you sure you want to proceed?
        </em>
        <Button type="submit" onClick={confirmTagDelete}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  )
}
