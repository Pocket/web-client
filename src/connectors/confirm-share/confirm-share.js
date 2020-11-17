import { useState } from 'react'
import { css } from 'linaria'
import { useDispatch, useSelector } from 'react-redux'

import { Modal, ModalBody, ModalTabs } from 'components/modal/modal'

import { DisplayCard } from 'components/item-card/my-list/card-display-only'
import { itemsShareCancel } from 'connectors/items-by-id/my-list/items.share'
import { ShareSocial } from './share-social'
import { SelectShareType } from './select-share-type'

import { ShareToFriend } from './share-to-friend'
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

  /**
   * State and state actions
   * ------------------------------------------------------------------------
   */
  const itemId = useSelector((state) => state.itemsToShare.id)
  const item = useSelector((state) => state.myListItemsById[itemId])
  const quote = useSelector((state) => state.itemsToShare.quote)
  const [active, setActive] = useState('social')
  const cancelShare = () => dispatch(itemsShareCancel())

  if (!item) return null
  // const { open_url, excerpt, title } = item
  const showModal = itemId !== false

  /**
   * Event Actions
   * ------------------------------------------------------------------------
   */
  const activate = (tab) => setActive(tab)
  const appRootSelector = '#__next'

  return (
    <Modal
      title="Share Item"
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel="Share Item"
      handleClose={cancelShare}>
      <ModalBody>
        <DisplayCard id={itemId} />
        {quote ? <p className={shareQuote}>{quote}</p> : null}
      </ModalBody>
      <ModalTabs>
        <SelectShareType active={active} activate={activate} />
        {active === 'social' ? <ShareSocial item={item} quote={quote} /> : null}
        {active === 'recommend' ? <ShareRecommend item={item} /> : null}
        {active === 'friend' ? <ShareToFriend item={item} /> : null}
      </ModalTabs>
    </Modal>
  )
}
