import style from './style.module.css'

import { useTranslation } from 'next-i18next'
import { Modal, ModalBody } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
// import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { ItemCard } from 'connectors/items/item-card-transitional'
import { dismissShare } from '../../share/sharedItem.state'

export const SharedItemInterstitial = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const sharedItem = useSelector((state) => state.sharedItem)
  // const onLinkClick = () => dispatch(sendSnowplowEvent('home.recent.view-saves'))

  const closeModal = () => dispatch(dismissShare())
  const appRootSelector = '#__next'

  if (!sharedItem) return null

  const { displayItemId, context } = sharedItem
  const { note, highlights } = context
  const showContext = false
  return (
    <Modal
      title={t('sharedItem:sharedItem', 'Shared Item')}
      appRootSelector={appRootSelector}
      isOpen={true}
      screenReaderLabel={t('sharedItem:sharedItem', 'Shared Item')}
      handleClose={closeModal}>
      <ModalBody>
        <ItemCard id={displayItemId} onOpenItem={closeModal} />
        {showContext ? (
          <div className={style.base}>
            <SharedHighlight highlights={highlights} />
            <SharedNote note={note} />
          </div>
        ) : null}
      </ModalBody>
    </Modal>
  )
}

const SharedNote = ({ note }) => {
  return note ? (
    <div className={style.note}>
      <h4>Shared Note</h4>
      <p>{note}</p>
    </div>
  ) : null
}
const SharedHighlight = ({ highlights }) => {
  return highlights.length ? (
    <div className={style.highlights}>
      <h4>Shared Highlights</h4>
      {highlights.map((highlight) => (
        <blockquote key={highlight.quote}>
          <mark>{highlight.quote}</mark>
        </blockquote>
      ))}
    </div>
  ) : null
}
