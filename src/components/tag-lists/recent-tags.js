import { SimpleCard } from 'components/item-card/my-list/card-simple'
import { css } from 'linaria'
import { SectionHeader } from 'components/headers/section-header'
import { breakpointLargeHandset } from '@pocket/web-ui'
import { useTranslation } from 'react-i18next'

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
      <SectionHeader
        sectionTitle={t('tags:recently-tagged-items', 'Recently Tagged Items')}
      />
      <div className="cards">
        {taggedItems.map((itemId) => (
          <SimpleCard key={itemId} id={itemId} />
        ))}
      </div>
    </div>
  )
}
