import { css } from 'linaria'
import { cardsGrid } from 'components/items-layout/base'
import { breakpointMediumTablet } from '@pocket/web-ui'
import { breakpointSmallTablet } from '@pocket/web-ui'
import { breakpointTinyTablet } from '@pocket/web-ui'

export const contentLayout = css`
  .content-section {
    ${cardsGrid};
    position: unset;

    ${breakpointSmallTablet} {
      grid-column-gap: 16px;
    }
  }

  header,
  footer,
  .content-body {
    grid-column: 2 / 9;

    ${breakpointMediumTablet} {
      grid-column: 2 / 10;
    }

    ${breakpointSmallTablet} {
      grid-column: 2 / 11;
    }

    ${breakpointTinyTablet} {
      grid-column: 1 / 12;
    }

    &.isMobileWebView {
      grid-column: 1 / 8;

      ${breakpointMediumTablet} {
        grid-column: 1 / 11;
      }

      ${breakpointTinyTablet} {
        grid-column: 1 / 12;
      }
    }
  }

  .left-aside {
    grid-column: 1 / 2;
    height: 100%;
    display: flex;
    & > div {
      flex-grow: 1;
    }

    ${breakpointMediumTablet} {
      position: static;
      grid-column: 2 / 12;
    }
    ${breakpointTinyTablet} {
      grid-column: 1 / 12;
    }
  }

  .right-aside {
    grid-column: 9 / -1;
    height: 100%;
    display: flex;
    flex-direction: column;
    ${breakpointMediumTablet} {
      grid-column: 0;
      display: none;
    }
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
    font-size: 1.25rem;
    line-height: 140%;
    margin-bottom: 2.5rem;
  }

  article {
    margin-bottom: 3rem;
  }
`
