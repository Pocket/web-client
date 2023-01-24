import { Button } from 'components/buttons/button'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { mutationBulkConfirm, mutationBulkCancel } from 'connectors/items/mutations-bulk.state'

import { BatchProcessing } from 'components/processing/processing'
import { useTranslation, Trans } from 'next-i18next'

export const ConfirmFavorite = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  // Handle delete actions with confirmation
  const itemsToFavorite = useSelector((state) => state.mutationFavorite.itemIds)
  const batchTotal = useSelector((state) => state.mutationBulk.batchTotal)
  const batchCount = useSelector((state) => state.mutationBulk.batchCount)
  const batchStart = useSelector((state) => state.mutationBulk.batchStart)
  const batchFavorite = useSelector((state) => state.mutationBulk.favoriteAction)

  const showModal = itemsToFavorite.length > 0
  const favoriteCopy =
    batchFavorite === 'favorite' ? (
      <Trans i18nKey="confirm:favorite-copy">
        Are you sure you want to favorite these items? This cannot be undone.
      </Trans>
    ) : (
      <Trans i18nKey="confirm:un-favorite-copy">
        Are you sure you want to un-favorite these items? This cannot be undone.
      </Trans>
    )
  const favoriteTitle =
    batchFavorite === 'favorite'
      ? t('confirm:favorite-items', 'Favorite Items')
      : t('confirm:un-favorite-items', 'Un-Favorite Items')
  const confirmFavorite = () => dispatch(mutationBulkConfirm())
  const cancelFavorite = () => dispatch(mutationBulkCancel())

  const appRootSelector = '#__next'

  return (
    <Modal
      title={favoriteTitle}
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel={favoriteTitle}
      handleClose={cancelFavorite}>
      <ModalBody>
        {batchStart ? (
          <BatchProcessing batchTotal={batchTotal} batchCount={batchCount} />
        ) : (
          <p>{favoriteCopy}</p>
        )}
      </ModalBody>
      {batchStart ? null : (
        <ModalFooter>
          <Button
            type="submit"
            data-cy="favorite-modal-confirm"
            onClick={confirmFavorite}
            autoFocus={true}>
            {favoriteTitle}
          </Button>
        </ModalFooter>
      )}
    </Modal>
  )
}
