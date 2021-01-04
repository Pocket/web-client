import { Button } from '@pocket/web-ui'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { itemsFavoriteConfirm } from 'connectors/items-by-id/my-list/items.favorite'
import { itemsFavoriteCancel } from 'connectors/items-by-id/my-list/items.favorite'
import { BatchProcessing } from 'components/processing/processing'

export const FavoriteModal = () => {
  const dispatch = useDispatch()

  // Handle delete actions with confirmation
  const itemsToFavorite = useSelector((state) => state.itemsToFavorite)
  const batchTotal = useSelector((state) => state.bulkEdit.batchTotal)
  const batchCount = useSelector((state) => state.bulkEdit.batchCount)
  const batchStart = useSelector((state) => state.bulkEdit.batchStart)
  const batchStatus = useSelector((state) => state.bulkEdit.batchStatus)

  const showModal = itemsToFavorite.length > 0
  const favoriteCopy = batchStatus === 'favorite' ? 'un-favorite' : 'favorite'
  const favoriteTitle =
    batchStatus === 'favorite' ? 'Un-Favorite Items' : 'Favorite Items'
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
          <p>
            Are you sure you want to {favoriteCopy} these items? This cannot be
            undone.
          </p>
        )}
      </ModalBody>
      {batchStart ? null : (
        <ModalFooter>
          <Button type="submit" onClick={confirmFavorite}>
            {favoriteTitle}
          </Button>
        </ModalFooter>
      )}
    </Modal>
  )
}
