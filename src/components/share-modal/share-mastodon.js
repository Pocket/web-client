import { css } from '@emotion/css'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'

import { Modal, ModalBody, ModalTabs } from 'components/modal/modal'

import { Card } from 'components/item-card/card'
import { SelectShareType } from './share-selector'
import { ShareList } from './share-list'
import { ShareRecommend } from './share-recommend'

const shareQuote = css`
  margin: var(--spacing050) 0;
  padding: 0 var(--spacing100);
  border-left: 1px solid var(--color-dividerSecondary);
  color: var(--color-textSecondary);
  font-style: italic;
  font-size: var(--fontSize085);
`

export const ShareModal = ({
  title,
  publisher,
  excerpt,
  timeToRead,
  isSyndicated,
  externalUrl,
  thumbnail,
  quote,
  showModal,
  cancelShare,
  engagementEvent,
  recommendEvent
}) => {
  return (
    <Modal
      title="Share to Mastodon"
      isOpen={showModal}
      screenReaderLabel="Share to Mastodon"
      handleClose={cancelShare}>
      <ModalBody>body body body</ModalBody>
    </Modal>
  )
}
