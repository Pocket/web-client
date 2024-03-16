import { cx, css } from '@emotion/css'
import { useState } from 'react'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { Item } from 'components/item/item'
import { ShareList } from 'components/share-modal/share-list'
import { stackedGrid, stackedGridNoAside } from 'components/item/items-layout'
import { PublicListUrl } from 'components/shareable-lists/public-list-url'
import { useTranslation } from 'next-i18next'

const reducedPaddingStyles = css`
  padding: 0;
`

export const ShareListModal = ({
  externalId,
  title,
  description,
  slug,
  externalUrl,
  thumbnail,
  itemCount,
  showModal,
  cancelShare,
  engagementEvent,
  handleMastodon,
  handleCopyUrl,
  handleOpenUrl
}) => {
  const { t } = useTranslation()

  const [imageUrl, setImageUrl] = useState(thumbnail)
  const onImageFail = () => setImageUrl('')

  const publicListInfo = {
    externalId,
    slug,
    callout: true
  }

  return (
    <Modal
      title={t('list:share-list', 'Share List')}
      isOpen={showModal}
      screenReaderLabel={t('list:share-list', 'Share List')}
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
            itemCount={itemCount}
            onImageFail={onImageFail}
            clamp
          />
        </div>
        <PublicListUrl
          publicListInfo={publicListInfo}
          handleCopyUrl={handleCopyUrl}
          handleOpenUrl={handleOpenUrl}
        />
      </ModalBody>
      <ModalFooter>
        <ShareList
          openUrl={externalUrl}
          excerpt={description}
          title={title}
          engagementEvent={engagementEvent}
          cancelShare={cancelShare}
          handleMastodon={handleMastodon}
        />
      </ModalFooter>
    </Modal>
  )
}
