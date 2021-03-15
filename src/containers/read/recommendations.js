import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css } from 'linaria'
import { FeatureFlag } from 'connectors/feature-flags/feature-flags'
import { COLUMN_WIDTH_RANGE } from 'containers/read/read'
import { RecCard } from 'connectors/item-card/reader/cardRec'
import { readerRecsRequest } from 'connectors/recit/recit.state'
import { breakpointTinyTablet } from '@pocket/web-ui'

const asideWrapper = css`
  margin: 0 2.5rem;
  padding: 2.5rem 0;
  border-top: 1px solid var(--color-dividerTertiary);
  box-sizing: border-box;

  ${breakpointTinyTablet} {
    padding-bottom: 0;
  }
`

const sectionWrapper = css`
  // Width of content minus content padding of 2.5rem
  max-width: calc(${COLUMN_WIDTH_RANGE[3]}px - 5rem);
  margin: 0 auto;
  padding: 2.5rem 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;

  article {
    margin: 0 0.5rem;
    padding: 0;
    height: unset;
    border-bottom-color: transparent;

    &:first-of-type {
      margin-left: 0;
      margin-top: 0;
    }
    &:last-of-type {
      margin-right: 0;
      border-bottom: none;
    }
  }

  ${breakpointTinyTablet} {
    flex-direction: column;

    article {
      margin: 0.5rem;
      border-bottom: 1px solid var(--color-dividerTertiary);
    }
  }
`

const headerStyles = css`
  font-size: 1.25rem;
  font-weight: 500;
  font-family: 'Graphik Web';
  color: var(--color-textSecondary);
  max-width: calc(${COLUMN_WIDTH_RANGE[3]}px - 5rem);
  margin: 0 auto;
`

export const Recommendations = ({ id }) => {
  const dispatch = useDispatch()

  const recommendations = useSelector((state) => state.recit.readerRecs)

  useEffect(() => {
    dispatch(readerRecsRequest(id))
  }, [dispatch])

  return Object.keys(recommendations).length ? (
    <FeatureFlag flag="temp.web.client.reader.recommendations">
      <aside className={asideWrapper}>
        <h2 className={headerStyles}>You Might Also Like</h2>
        <section className={sectionWrapper}>
          {Object.keys(recommendations).map((itemId, index) => (
            <RecCard
              key={itemId}
              id={itemId}
              position={index}
            />
          ))}
        </section>
      </aside>
    </FeatureFlag>
  ) : null
}
