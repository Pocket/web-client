import { css } from '@emotion/css'
import { cardsGrid } from 'components/items-layout/base'
import { breakpointMediumTablet } from 'common/constants'
import { breakpointSmallTablet } from 'common/constants'
import { breakpointTinyTablet } from 'common/constants'

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
      grid-column: 1 / -1;
    }

    &.isMobileWebView {
      grid-column: 1 / 8;

      ${breakpointMediumTablet} {
        grid-column: 1 / 12;
      }

      ${breakpointTinyTablet} {
        grid-column: 1 / -1;
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
      grid-column: 2 / -1;
    }
    ${breakpointTinyTablet} {
      grid-column: 1 / -1;
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
    margin-bottom: 2rem;
  }

  article {
    margin-bottom: 3rem;
  }
`
