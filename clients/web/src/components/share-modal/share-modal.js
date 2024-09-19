import { css } from '@emotion/css'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'

import { Item } from 'components/item/item'
import { ShareList } from './share-list'
import { TextArea } from 'components/form-fields/text-area'

const shareQuote = css`
  margin: 0.5rem 0;
  padding: 0 1rem;
  border-left: 3px solid var(--color-dividerSecondary);
  color: var(--color-textSecondary);
  font-style: italic;
  font-size: 1rem;
`
const shareNote = css`
  margin: 1.5rem 0 0;
  padding: 0;
`

export const ShareModal = ({
  title,
  publisher,
  excerpt,
  timeToRead,
  isSyndicated,
  shareUrl,
  thumbnail,
  quote,
  showModal,
  cancelShare,
  engagementEvent,
  updateContext,
  handleMastodon
}) => {
  const { t } = useTranslation()
  const [note, updateNote] = useState('')

  function handleInputChange(event) {
    const inputVal = event.target.value
    updateNote(inputVal)
  }

  function handleUpdateContext() {
    updateContext(note)
  }

  return (
    <Modal
      title={t('share:share-item', 'Share Item')}
      isOpen={showModal}
      screenReaderLabel={t('share:share-item', 'Share Item')}
      handleClose={cancelShare}>
      <ModalBody>
        <Item
          showExcerpt={false}
          itemImage={thumbnail}
          title={title}
          publisher={publisher}
          excerpt={excerpt}
          timeToRead={timeToRead}
          isSyndicated={isSyndicated}
          type="display"
          clamp={true}
        />
        {quote ? <p className={shareQuote}>{quote}</p> : null}
        <div className={shareNote}>
          <TextArea
            labelText={t('share:share-note', 'Note')}
            name="share-input-note"
            value={note}
            showCharacterLimit={true}
            characterLimit={500}
            onChange={handleInputChange}
            displayErrorInline={true}
            data-testid="email-input"
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <ShareList
          openUrl={shareUrl}
          externalUrl={shareUrl}
          excerpt={excerpt}
          title={title}
          quote={quote}
          note={note}
          updateContext={handleUpdateContext}
          engagementEvent={engagementEvent}
          cancelShare={cancelShare}
          handleMastodon={handleMastodon}
        />
      </ModalFooter>
    </Modal>
  )
}
