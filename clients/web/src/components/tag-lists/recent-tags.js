import { useSelector } from 'react-redux'
import { Card } from 'components/item-card/card'
import { css } from '@emotion/css'
import { SectionHeader } from 'components/headers/section-header'
import { breakpointLargeHandset } from 'common/constants'
import { useTranslation } from 'next-i18next'

const recentTagStyle = css`
  border-bottom: var(--dividerStyle);
  padding-bottom: 3rem;
  margin-bottom: 2rem;
  .cards {
    padding: 0;
    font-family: var(--fontSansSerif);
    font-weight: 400;
    color: var(--color-textPrimary);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 1rem;
    grid-column-gap: 2rem;
  }

  ${breakpointLargeHandset} {
    .cards {
      grid-template-columns: 1fr;
    }
  }
`

export function RecentTags({ taggedItems }) {
  const { t } = useTranslation()

  return (
    <div className={recentTagStyle}>
      <SectionHeader sectionTitle={t('tags:recently-tagged-items', 'Recently Tagged Items')} />
      <div className="cards">
        {taggedItems.map((itemId) => (
          <RecentCard key={itemId} itemId={itemId} />
        ))}
      </div>
    </div>
  )
}

function RecentCard({ itemId }) {
  const item = useSelector((state) => state.itemsDisplay[itemId])
  if (!item) return null

  const { externalUrl, title, publisher, excerpt, timeToRead, isSyndicated, isInternalItem } = item
  const openUrl = externalUrl
  const showExcerpt = false
  const itemImage = item?.noImage ? '' : item?.thumbnail

  // We need the wrapper div to contain the wide article to the container grid
  return (
    <div>
      <Card
        title={title}
        publisher={publisher}
        excerpt={excerpt}
        timeToRead={timeToRead}
        isSyndicated={isSyndicated}
        isInternalItem={isInternalItem}
        openUrl={openUrl}
        externalUrl={externalUrl}
        showExcerpt={showExcerpt}
        itemImage={itemImage}
        cardShape="wide"
        itemType="display"
      />
    </div>
  )
}
