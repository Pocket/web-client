import { useSelector } from 'react-redux'
import { css } from '@emotion/css'
import { COLUMN_WIDTH_RANGE } from 'common/constants'
import { ItemCard } from 'connectors/items/item-card-transitional'
import { breakpointTinyTablet } from 'common/constants'
import { standardGrid } from 'components/item/items-layout'

const asideWrapper = css`
  margin: 0 2.5rem;
  padding: 2.5rem 0;
  border-top: 1px solid var(--color-dividerTertiary);
  box-sizing: border-box;

  ${breakpointTinyTablet} {
    padding-bottom: 0;
  }

  @media print {
    display: none;
  }
`

const sectionWrapper = css`
  // Width of content minus content padding of 2.5rem
  max-width: calc(${COLUMN_WIDTH_RANGE[3]}px);
  margin: 0 auto;
  padding: 2.5rem 0 0;
  & > article {
    --title-size: 0.875rem;
  }
`

const headerStyles = css`
  font-size: 1.25rem;
  font-weight: 500;
  font-family: 'Graphik Web';
  color: var(--color-textSecondary);
  max-width: calc(${COLUMN_WIDTH_RANGE[3]}px);
  margin: 0 auto;
`

export const Recommendations = ({ id }) => {
  const recommendations = useSelector((state) => state.itemsRelated[id])
  return recommendations?.length ? (
    <aside className={asideWrapper}>
      <h2 className={headerStyles}>You Might Also Like</h2>
      <section className={`${standardGrid} ${sectionWrapper}`}>
        {recommendations.map((itemId, index) => (
          <ItemCard
            key={itemId}
            id={itemId}
            position={index}
            clamp={true}
            snowplowId="reader.rec"
          />
        ))}
      </section>
    </aside>
  ) : null
}
