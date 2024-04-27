import { useTranslation } from 'next-i18next'
import { Modal, ModalBody } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
// import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { ItemCard } from 'connectors/items/item-card-transitional'
import { dismissShare } from '../../share/sharedItem.state'
import { css } from '@emotion/css'

const contextWrapper = css`
  padding: 0 2rem;
  h4 {
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.25;
    color: var(--color-textSecondary);
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.1875rem;
    font-style: italic;
  }

  div {
    border-left: 6px solid var(--color-dividerSecondary);
    padding: 1rem 0 0 1rem;
  }

  .note {
    border-color: var(--color-dividerTertiary);
  }
  .highlight {
    border-color: var(--color-amber);
  }
`

export const SharedItemInterstitial = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const sharedItem = useSelector((state) => state.sharedItem)
  // const onLinkClick = () => dispatch(sendSnowplowEvent('home.recent.view-saves'))

  const closeModal = () => dispatch(dismissShare())
  const appRootSelector = '#__next'

  if (!sharedItem) return null

  const { displayItemId, context } = sharedItem
  const { note, highlight } = context
  return (
    <Modal
      title={t('sharedItem:sharedItem', 'Shared Item')}
      appRootSelector={appRootSelector}
      isOpen={true}
      screenReaderLabel={t('sharedItem:sharedItem', 'Shared Item')}
      handleClose={closeModal}>
      <ModalBody>
        <ItemCard id={displayItemId} onOpenItem={closeModal} />
        <div className={contextWrapper}>
          <SharedHighlight highlight={highlight} />
          <SharedNote note={note} />
        </div>
      </ModalBody>
    </Modal>
  )
}

const SharedNote = ({ note }) => {
  return note ? (
    <div className="note">
      <h4>Shared Note</h4>
      <p>{note}</p>
    </div>
  ) : null
}
const SharedHighlight = ({ highlight }) => {
  return highlight ? (
    <div className="highlight">
      <h4>Shared Highlight</h4>
      <p>{highlight}</p>
    </div>
  ) : null
}
