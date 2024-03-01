import { useRouter } from 'next/router'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { cancelDeleteUserTag } from 'containers/saves/tagged/tagged-page.state'
import { confirmDeleteUserTag } from 'containers/saves/tagged/tagged-page.state'
import { useTranslation, Trans } from 'next-i18next'

export const ConfirmTagDelete = () => {
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
      title={t('confirm:delete-tag', 'Delete Tag')}
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel={t('confirm:delete-tag', 'Delete Tag')}
      handleClose={cancelTagDelete}>
      <ModalBody>
        <Trans i18nKey="confirm:delete-the-tag" tagToDelete={tagToDelete}>
          Delete the tag <em>{{ tagToDelete }}</em>?
        </Trans>
      </ModalBody>
      <ModalFooter>
        <em className="footnote">
          <Trans i18nKey="confirm:delete-tag-copy" tagToDelete={tagToDelete}>
            Deleting the tag <em>{{ tagToDelete }}</em> will remove it from all items. Are you sure
            you want to proceed?
          </Trans>
        </em>
        <button
          className="primary"
          type="submit"
          data-testid="delete-tag-confirm"
          onClick={confirmTagDelete}>
          <Trans i18nKey="confirm:delete">Delete</Trans>
        </button>
      </ModalFooter>
    </Modal>
  )
}
