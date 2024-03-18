import { css } from '@emotion/css'
import { breakpointSmallTablet } from 'common/constants'

const itemNoteStyles = css`
  display: flex;
  flex-direction: column;
  grid-column: span 12;
  padding: 16px 16px 14px 16px;
  background: var(--color-activeCanvas);
  border-top: 1px solid var(--color-dividerTertiary);
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  .note {
    margin-right: 39px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: var(--color-textPrimary);
    ${breakpointSmallTablet} {
      margin-right: 0px;
    }
  }
  footer {
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .creator {
    }
  }
  .buttons {
    margin-left: auto;
    display: flex;
    button {
      margin-left: 8px;
      width: 32px;
      height: 32px;
      border: 0;
    }
  }
`

export const ItemNote = ({ Actions, note, externalId, position, analyticsData }) => {
  return note ? (
    <div className={itemNoteStyles}>
      <span className="note">{note}</span>
      <footer>
        <span className="creator" />
        {Actions ? (
          <div className="buttons">
            <Actions externalId={externalId} position={position} analyticsData={analyticsData} />
          </div>
        ) : null}
      </footer>
    </div>
  ) : null
}
