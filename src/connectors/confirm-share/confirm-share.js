import { useState } from 'react'
import { css } from 'linaria'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'

import { Modal, ModalBody, ModalTabs } from 'components/modal/modal'

import { Card } from 'components/item-card/card'
import { itemsShareCancel } from 'connectors/items-by-id/my-list/items.share'
import { ShareSocial } from './share-social'
import { SelectShareType } from './select-share-type'

import { ShareRecommend } from './share-recommend'

const shareQuote = css`
  margin: var(--spacing050) 0;
  padding: 0 var(--spacing100);
  border-left: 1px solid var(--color-dividerSecondary);
  color: var(--color-textSecondary);
  font-style: italic;
  font-size: var(--fontSize085);
`

export const ShareModal = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  /**
   * State and state actions
   * ------------------------------------------------------------------------
   */
  const itemId = useSelector((state) => state.itemsToShare.id)
  const item = useSelector((state) => state.myListItemsById[itemId])
  const quote = useSelector((state) => state.itemsToShare.quote)
  const position = useSelector((state) => state.itemsToShare.position)
  const [active, setActive] = useState('social')
  const cancelShare = () => dispatch(itemsShareCancel())

  if (!item) return null
  const { externalUrl } = item
  const openUrl = externalUrl
  const showExcerpt = false
  const itemImage = item?.noImage ? '' : item?.thumbnail
  const {title, publisher, excerpt, timeToRead, isSyndicated, isCollection } = item //prettier-ignore

  const showModal = itemId !== false

  /**
   * Event Actions
   * ------------------------------------------------------------------------
   */
  const activate = (tab) => setActive(tab)
  const appRootSelector = '#__next'

  return (
    <Modal
      title={t('share:share-item', 'Share Item')}
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel={t('share:share-item', 'Share Item')}
      handleClose={cancelShare}>
      <ModalBody>
        <Card
          showExcerpt={showExcerpt}
          itemImage={itemImage}
          title={title}
          publisher={publisher}
          excerpt={excerpt}
          timeToRead={timeToRead}
          isSyndicated={isSyndicated}
          isCollection={isCollection}
          itemType="display"
          cardShape="wide"
        />
        {quote ? <p className={shareQuote}>{quote}</p> : null}
      </ModalBody>
      <ModalTabs>
        <SelectShareType active={active} activate={activate} />
        {active === 'social' ? (
          <ShareSocial
            openUrl={openUrl}
            excerpt={excerpt}
            title={title}
            itemId={itemId}
            quote={quote}
            position={position}
          />
        ) : null}
        {active === 'recommend' ? (
          <ShareRecommend openUrl={openUrl} itemId={itemId} position={position} />
        ) : null}
      </ModalTabs>
    </Modal>
  )
}
