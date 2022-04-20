import { Button } from '@pocket/web-ui'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { itemsFavoriteConfirm } from 'connectors/items-by-id/my-list/items.favorite'
import { itemsFavoriteCancel } from 'connectors/items-by-id/my-list/items.favorite'
import { BatchProcessing } from 'components/processing/processing'
import { useTranslation, Trans } from 'next-i18next'

export const FavoriteModal = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  // Handle delete actions with confirmation
  const itemsToFavorite = useSelector((state) => state.itemsToFavorite)
  const batchTotal = useSelector((state) => state.bulkEdit.batchTotal)
  const batchCount = useSelector((state) => state.bulkEdit.batchCount)
  const batchStart = useSelector((state) => state.bulkEdit.batchStart)
  const batchFavorite = useSelector((state) => state.bulkEdit.batchFavorite)

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
  const confirmFavorite = () => dispatch(itemsFavoriteConfirm())
  const cancelFavorite = () => dispatch(itemsFavoriteCancel())

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
