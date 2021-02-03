import { Button } from '@pocket/web-ui'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { itemsFavoriteConfirm } from 'connectors/items-by-id/my-list/items.favorite'
import { itemsFavoriteCancel } from 'connectors/items-by-id/my-list/items.favorite'
import { BatchProcessing } from 'components/processing/processing'
import { useTranslation, Trans } from 'common/setup/i18n'

export const FavoriteModal = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  // Handle delete actions with confirmation
  const itemsToFavorite = useSelector((state) => state.itemsToFavorite)
  const batchTotal = useSelector((state) => state.bulkEdit.batchTotal)
  const batchCount = useSelector((state) => state.bulkEdit.batchCount)
  const batchStart = useSelector((state) => state.bulkEdit.batchStart)
  const batchStatus = useSelector((state) => state.bulkEdit.batchStatus)

  const showModal = itemsToFavorite.length > 0
  const favoriteCopy =
    batchStatus === 'favorite' ? (
      <Trans i18nKey="confirm:un-favorite-copy">
        Are you sure you want to un-favorite these items? This cannot be undone.
      </Trans>
    ) : (
      <Trans i18nKey="confirm:favorite-copy">
        Are you sure you want to favorite these items? This cannot be undone.
      </Trans>
    )
  const favoriteTitle =
    batchStatus === 'favorite'
      ? t('confirm:un-favorite-items', 'Un-Favorite Items')
      : t('confirm:favorite-items', 'Favorite Items')
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
          <p>{favoriteCopy} these items? This cannot be undone.</p>
        )}
      </ModalBody>
      {batchStart ? null : (
        <ModalFooter>
          <Button type="submit" onClick={confirmFavorite} autoFocus={true}>
            {favoriteTitle}
          </Button>
        </ModalFooter>
      )}
    </Modal>
  )
}
