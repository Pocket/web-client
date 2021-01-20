import { useRouter } from 'next/router'
import { Button } from '@pocket/web-ui'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { cancelDeleteUserTag } from 'containers/my-list/tags-page/tags-page.state'
import { confirmDeleteUserTag } from 'containers/my-list/tags-page/tags-page.state'
import { useTranslation, Trans } from 'react-i18next'

export const TagDeleteModal = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { t } = useTranslation()

  // Handle delete actions with confirmation
  const tagToDelete = useSelector((state) => state.userTags.tagToDelete)

  const showModal = tagToDelete !== false
  const confirmTagDelete = () => dispatch(confirmDeleteUserTag(tagToDelete, router)) //prettier-ignore
  const cancelTagDelete = () => dispatch(cancelDeleteUserTag())

  const appRootSelector = '#__next'

  return (
    <Modal
      title={t("Delete Tag")}
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel={t("Delete Tag")}
      handleClose={cancelTagDelete}>
      <ModalBody>
        <Trans tagToDelete={tagToDelete}>
          Delete the tag "{tagToDelete}"?
        </Trans>
      </ModalBody>
      <ModalFooter>
        <em className="footnote">
          <Trans tagToDelete={tagToDelete}>
            Deleting the tag "{tagToDelete}" will remove it from all items. Are
            you sure you want to proceed?
          </Trans>
        </em>
        <Button type="submit" onClick={confirmTagDelete}>
          <Trans>Delete</Trans>
        </Button>
      </ModalFooter>
    </Modal>
  )
}
