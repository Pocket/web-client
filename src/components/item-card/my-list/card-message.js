import React from 'react'
import { css } from 'linaria'
import { readTime } from 'connectors/items-by-id/my-list/items.derive'
import { displayPublisher } from 'connectors/items-by-id/my-list/items.derive'
import { CardMedia } from 'components/media/card-media'
import { SaveToPocket } from 'components/save-to-pocket/save-to-pocket'
import { urlWithPocketRedirect } from 'common/utilities'

const card = css`
  width: 100%;
  height: 100%;
  padding: 0;
  font-family: var(--fontSansSerif);
  font-weight: 400;
  font-size: var(--fontSize100);
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

  h2 {
    font-size: var(--fontSize150);
    font-family: 'Graphik Web';
    font-weight: 600;
    line-height: 1.22;
    padding: 0;
    margin: 0;
    max-height: 4.6em;
    overflow: hidden;
    a {
      text-decoration: none;
    }
  }

  .details {
    font-style: normal;
    font-size: var(--fontSize085);
    padding: var(--size050) 0;
    display: block;
    color: var(--color-textSecondary);
  }

  .readtime {
    white-space: nowrap;
  }

  p {
    font-size: var(--fontSize100);
    margin-bottom: var(--spacing100);
  }
`

export const Card = ({ item, onSave }) => {
  const { resolved_id: id, resolved_title, resolved_url, image, excerpt } = item

  const time = readTime({ item })
  const publisher = displayPublisher({ item })

  return (
    <article className={card} key={id}>
      <CardMedia image_src={image?.src} title={resolved_title} id={id} />
      <div className="content">
        <h2 className="title">
          <a
            href={urlWithPocketRedirect(resolved_url)}
            target="_recommendation"
            rel="noopener noreferrer">
            {resolved_title}
          </a>
        </h2>
        <cite className="details">
          <span>{publisher}</span>
          <span className="readtime">{time ? ` · ${time} min` : null}</span>
        </cite>
        {excerpt ? <p>{excerpt}</p> : null}
        <footer className="footer">
          <div className="actions">
            <SaveToPocket
              saveAction={onSave}
              isAuthenticated
              saveStatus="unsaved"
              id={id}
            />
          </div>
        </footer>
      </div>
    </article>
  )
}
