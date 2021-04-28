import { useSelector } from 'react-redux'
import { css } from 'linaria'
import { CardMedia } from 'components/media/card-media'

const card = css`
  width: 100%;
  height: 100%;
  padding: 0;
  font-family: var(--fontSansSerif);
  font-weight: 400;
  color: var(--color-textPrimary);
  position: relative;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: var(--spacing100);

  .media {
    grid-column: span 3;
    overflow: hidden;
    width: 100%;
    height: 0;
    padding-top: 66.66%;
    background-repeat: 'no-repeat';
    background-position: center;
    background-size: cover;
    transition-property: opacity;
    transition-duration: 0.2s;
    transition-timing-function: ease;
    border-radius: var(--size025);
  }

  .content {
    grid-column: span 9;
  }

  .title {
    --color-underliner: var(--color-canvas);
    font-size: var(--fontSize100);
    font-family: 'Graphik Web';
    font-weight: 600;
    line-height: 1.22;
    padding: 0;
    margin: 0;
    max-height: 4.6em;
    overflow: hidden;
  }

  .details {
    font-style: normal;
    padding: var(--size050) 0;
    display: block;
    color: var(--color-textSecondary);
  }

  .readtime {
    white-space: nowrap;
  }

  .syndicated {
    display: inline-block;
    padding-left: var(--spacing050);
  }

  .excerpt {
    font-size: var(--fontSize100);
    margin: 0;
    padding-bottom: 1em;
  }
`

export function DisplayCard({ id }) {
  // Get data from state
  const item = useSelector((state) => state.myListItemsById[id])

  // Render nothing if an item isn't present
  if (!item) return null

  const { item_id, title, thumbnail, publisher, read_time } = item

  return (
    <article className={card} key={item_id}>
      <CardMedia image_src={thumbnail} title={title} id={item_id} />
      <div className="content">
        <h2 className="title">
          <span>{title}</span>
        </h2>
        <cite className="details">
          <span>{publisher}</span>
          <span className="readtime">
            {read_time ? ` · ${read_time} min` : null}
          </span>
        </cite>
      </div>
    </article>
  )
}
