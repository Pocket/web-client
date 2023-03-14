import { cx, css } from 'linaria'
import { useState } from 'react'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { Item } from 'components/item/item'
import { ShareList } from 'components/share-modal/share-list'
import { stackedGrid, stackedGridNoAside } from 'components/item/items-layout'

const linkStyles = css`
  padding: 14px 16px;
  color: var(--color-textLinkHover);
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.25;
  background-color: var(--color-calloutBackgroundPrimary);
  border-radius: 8px;
  margin-top: 24px;
`

const reducedPaddingStyles = css`
  padding: 0;
`

export const ShareListModal = ({
  externalId,
  title,
  description,
  externalUrl,
  thumbnail,
  storyCount,
  showModal,
  cancelShare,
  engagementEvent
}) => {
  const [imageUrl, setImageUrl] = useState(thumbnail)
  const onImageFail = () => setImageUrl('')

  return (
    <Modal
      title="Share List"
      isOpen={showModal}
      screenReaderLabel="Share List"
      handleClose={cancelShare}>
      <ModalBody>
        <div className={cx(stackedGrid, stackedGridNoAside, reducedPaddingStyles)}>
          <Item
            itemId={externalId}
            title={title}
            excerpt={description}
            openUrl={externalUrl}
            isInternalItem={true}
            itemImage={imageUrl}
            storyCount={storyCount}
            onImageFail={onImageFail}
            clamp
          />
        </div>

        <p className={linkStyles}>{externalUrl}</p>
      </ModalBody>
      <ModalFooter className={reducedPaddingStyles}>
        <ShareList
          openUrl={externalUrl}
          excerpt={description}
          title={title}
          engagementEvent={engagementEvent}
          cancelShare={cancelShare}
        />
      </ModalFooter>
    </Modal>
  )
}
