import { css } from 'linaria'
import Link from 'node_modules/next/link'
import { CardMedia } from 'components/item/item-media'
import { ListStatus } from 'components/shareable-lists/list-status'

const listItemStyles = css`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 1rem;
  grid-template-columns: repeat(12, 1fr);
  text-decoration: none;
  margin-bottom: 2rem;

  &:hover {
    text-decoration: none;
    color: var(--color-primary); // maybe?
  }

  .mediaWrapper {
    grid-column: span 2;
  }

  .detailsWrapper {
    grid-column: span 10;

    h5 {
      color: var(--color-primary);
      font-weight: 600;
      font-size: 19px;
      line-height: 24px;
      margin-bottom: 8px;
    }

    p {
      color: var(--color-primary);
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      margin-bottom: 8px;
    }
  }
`

export const AllLists = ({ shareableLists }) => {
  let imageIndex = 300
  return (
    <div>
      {shareableLists.map((list) => (
        <div key={list.title}>
          <Link href={`/lists/${list.title}`}>
            <a data-cy="list" className={listItemStyles}>
              <span className="mediaWrapper">
                <CardMedia image_src={`http://placekitten.com/200/${imageIndex++}`} />
              </span>
              <div className="detailsWrapper">
                <h5>{list.title}</h5>
                <p>{list.description}</p>
                <ListStatus status={list.status} />
              </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}
