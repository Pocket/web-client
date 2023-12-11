import { css } from '@emotion/css'
import { useTranslation } from 'next-i18next'

import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'

import { Card } from 'components/item-card/card'
import { ShareList } from './share-list'

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
  engagementEvent
}) => {
  const { t } = useTranslation()

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
      <ModalFooter>
        <ShareList
          openUrl={externalUrl}
          excerpt={excerpt}
          title={title}
          quote={quote}
          engagementEvent={engagementEvent}
          cancelShare={cancelShare}
        />
      </ModalFooter>
    </Modal>
  )
}
