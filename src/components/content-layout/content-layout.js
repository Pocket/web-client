import { css } from 'linaria'
import { cardsGrid } from 'components/items-layout/base'

export const contentLayout = css`
  .content-section {
    ${cardsGrid};
    position: unset;
  }

  header,
  footer,
  .content-body {
    grid-column: 2 / 9;
  }

  .left-aside {
    grid-column: 1 / 2;
    height: 100%;
    display: flex;
    & > div {
      flex-grow: 1;
    }
  }

  .right-aside {
    grid-column: 9 / -1;
    height: 100%;
    display: flex;
    flex-direction: column;
    & > div {
      flex-grow: 1;
    }
  }

  .sticky > div {
    position: sticky;
    top: 6rem;
  }

  .hero-image {
    width: 100%;
    margin-bottom: 1rem;
  }

  .content-excerpt {
    font-family: var(--fontSansSerif);
    font-style: italic;
    font-weight: 300;
    font-size: 1.25em;
    line-height: 140%;
    margin-bottom: var(--spacing100);
  }

  article {
    margin-bottom: 3rem;
  }
`
