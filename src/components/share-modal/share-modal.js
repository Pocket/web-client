import { css } from 'linaria'
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
  const { t } = useTranslation()
  const [active, setActive] = useState('social')

  const activate = (tab) => setActive(tab)

  return (
    <Modal
      title={t('share:share-item', 'Share Item')}
      isOpen={showModal}
      screenReaderLabel={t('share:share-item', 'Share Item')}
      handleClose={cancelShare}>
      <ModalBody>
        <Card
          showExcerpt={false}
          itemImage={thumbnail}
          title={title}
          publisher={publisher}
          excerpt={excerpt}
          timeToRead={timeToRead}
          isSyndicated={isSyndicated}
          itemType="display"
          cardShape="wide"
        />
        {quote ? <p className={shareQuote}>{quote}</p> : null}
      </ModalBody>
      <ModalTabs>
        <SelectShareType active={active} activate={activate} />
        {active === 'social' ? (
          <ShareList
            openUrl={externalUrl}
            excerpt={excerpt}
            title={title}
            quote={quote}
            engagementEvent={engagementEvent}
            cancelShare={cancelShare}
          />
        ) : null}
        {active === 'recommend' ? (
          <ShareRecommend recommendEvent={recommendEvent} />
        ) : null}
      </ModalTabs>
    </Modal>
  )
}
