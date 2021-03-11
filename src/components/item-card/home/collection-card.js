import React from 'react'
import { css } from 'linaria'
import { SaveIcon, SaveFilledIcon } from '@pocket/web-ui'

const collectionCardStyle = css`
  height: 100%;
  width: 100%;
  padding: 1rem 0 0;
  font-family: var(--fontSansSerif);
  font-weight: 400;
  color: var(--color-textPrimary);
  position: relative;

  & > a {
    position: relative;
    display: block;
    height: 100%;
    width: 100%;
    padding-bottom: 3rem;
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
    margin: 0;
  }

  .footer {
    width: 100%;
    position: absolute;
    bottom: 0.75rem;
  }

  .save-container {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: flex-start;
    font-size: var(--fontSize150);
    min-width: 3.913em;
    color: var(--color-textSecondary);
    cursor: pointer;
    padding-top: 8px;

    span {
      margin-top: -0.15em;
    }

    svg {
      transition: transform 200ms ease-out;
      display: block;
      margin-right: var(--size050);
      height: 1.1em;
    }

    .actionCopy {
      font-size: 0.667em;
      height: var(--size150);
      line-height: var(--size150);
    }

    a {
      text-decoration: none;
    }
  }
`

export const CollectionCard = React.forwardRef(
  ({ collection, onOpen, id, saveStatus = 'unsaved' }, ref) => {
    const { title, url, image, subtitle } = collection

    const saveCopy = {
      unsaved: 'Save All',
      saving: 'Save All',
      saved: 'Saved to your list'
    }

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
        <footer className="footer">
          <div className="save-container" data-cy={`collection-save-btn-${id}`}>
            {saveStatus === 'saved' ? <SaveFilledIcon /> : <SaveIcon />}
            <div className="actionCopy">{saveCopy[saveStatus]}</div>
          </div>
        </footer>
      </article>
    )
  }
)
