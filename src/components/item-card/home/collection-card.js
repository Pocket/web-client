import React from 'react'
import { css } from 'linaria'

const collectionCardStyle = css`
  height: 100%;
  width: 100%;
  padding: 0;
  font-family: var(--fontSansSerif);
  font-weight: 400;
  color: var(--color-textPrimary);
  position: relative;

  & > a {
    position: relative;
    display: block;
    height: 100%;
    width: 100%;
    padding-bottom: var(--size400);
    text-decoration: none;
    transition-property: color;
    transition-duration: 0.2s;
    transition-timing-function: ease;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--color-textPrimary);
        .title span {
          text-decoration: underline;
        }
        .media {
          filter: brightness(0.95) saturate(0.8);
          transition: filter 300ms ease-in-out;
        }
      }
    }
  }

  .media {
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

  .title {
    --color-underliner: var(--color-canvas);
    font-family: 'Graphik Web';
    font-size: var(--fontSize125);
    font-weight: 600;
    line-height: 1.22;
    padding: var(--size100) 0 0;
    margin: 0;
    max-height: 4.4em;
    overflow: hidden;
  }

  .subtitle {
    font-style: normal;
    font-size: var(--fontSize100);
    padding: var(--size050) 0;
    display: block;
    color: var(--color-textSecondary);
  }
`

export const CollectionCard = React.forwardRef(
  ({ collection, onOpen }, ref) => {
    const { title, url, image, subtitle } = collection

    return (
      <article
        ref={ref}
        className={collectionCardStyle}
        data-cy="home-collection">
        <a href={url} onClick={onOpen}>
          <img src={image} width="100%" alt="" aria-hidden="true" />
          <div className="content">
            <h2 className="title">{title}</h2>
            <p className="subtitle">{subtitle}</p>
          </div>
        </a>
      </article>
    )
  }
)
