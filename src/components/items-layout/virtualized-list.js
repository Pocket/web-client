import { cardsGrid } from 'components/items-layout/base'
import { css, cx } from 'linaria'
import { breakpointSmallDesktop } from '@pocket/web-ui'
import { breakpointLargeTablet } from '@pocket/web-ui'
import { breakpointMediumTablet } from '@pocket/web-ui'
import { breakpointSmallTablet } from '@pocket/web-ui'
import { breakpointTinyTablet } from '@pocket/web-ui'
import { breakpointLargeHandset } from '@pocket/web-ui'
import { breakpointSmallHandset } from '@pocket/web-ui'
import { breakpointMediumHandset } from '@pocket/web-ui'

export const ruler = css`
  position: absolute;
  top: 0;
  height: 100vh;
  width: 1px;
  opacity: 0;
  pointer-events: none;
`

export const cardGrid = css`
  ${cardsGrid};
  grid-row-gap: var(--size100);
  article {
    height: 345px;
    grid-column: span 4;
    h2 {
      font-size: var(--fontSize100);
    }
    .details {
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .excerpt {
      display: none;
    }
    .item-actions {
      width: 100%;
    }
    .actions button {
      opacity: 0;
      @media (hover: none) {
        opacity: 1;
      }
      &.active {
        opacity: 1;
      }
    }

    .tags {
      display: none;
    }

    &:hover .actions button {
      opacity: 1;
    }

    .footer {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: var(--zIndexRaised);
    }
    .bulkBacking {
      padding: 0.45em 0.65em;
    }
  }

  /* 839 */
  ${breakpointSmallTablet} {
    article {
      height: 310px;
    }
  }

  /* 719 */
  ${breakpointTinyTablet} {
    --grid-media: 200px;
    --grid-height: 150px;
  }

  /* 599 */
  ${breakpointLargeHandset} {
    --grid-media: 150px;
    --grid-height: 130px;
  }

  /* 399 */
  ${breakpointSmallHandset} {
    --grid-media: 100px;
    --grid-height: 130px;
  }

  /* This is when we switch to a side by side layout */
  ${breakpointTinyTablet} {
    grid-row-gap: var(--size150);
    article {
      height: var(--grid-height);
      grid-column: span 12;
      border-bottom: var(--dividerStyle);

      & > a {
        display: grid;
        grid-template-columns: var(--grid-media) auto;
        grid-column-gap: 1rem;
        align-items: flex-start;
        height: initial;
      }

      .title {
        padding-top: 0;
        max-height: 2.4em;
      }

      .footer {
        bottom: 5px;
      }
      .actions {
        width: initial;
        padding-left: calc(var(--grid-media) + 1rem);
      }
    }
  }
`

export const cardList = css`
  ${cardsGrid};
  grid-row-gap: 0;

  article {
    grid-column: span 12;
    height: 75px;
    padding: 1em 0;
    border-bottom: 1px solid var(--color-dividerTertiary);

    & > a {
      display: grid;
      grid-column: span 11;
      grid-template-columns: repeat(12, 1fr);
      grid-column-gap: var(--size150);
      padding: 0;
    }
    .media {
      grid-column: span 1;
    }

    .content {
      grid-column: span 11;
      position: relative;
    }

    .title {
      padding: 0;
      font-size: var(--fontSize100);
      line-height: 1.286;
      width: 70%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .details {
      font-size: var(--fontSize075);
      line-height: 1.5;
      padding: var(--size025) 0 0;
    }

    .excerpt {
      font-size: var(--fontSize100);
      display: none;
    }

    .item-actions {
      padding: 0;
      &:after {
        box-shadow: none;
      }
    }
    .tags {
      display: none;
    }
    .footer {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }
    .bulkBacking {
      padding: 0.125em 1.1em;
      transform: translate(-0.5em, -1.1em);
    }
    .actions {
      grid-column: 4 / span 5;
    }

    /* 719 */
    ${breakpointTinyTablet} {
      & > a {
        grid-column: span 12;
      }
      .media {
        display: none;
      }
    }
  }
  /* 479 */
  ${breakpointMediumHandset} {
    --grid-height: 130px;
  }

  /* This is when we switch to a side by side layout */
  ${breakpointMediumHandset} {
    article {
      height: var(--grid-height);
      grid-column: span 12;
      border-bottom: var(--dividerStyle);

      & > a {
        display: block;
        height: initial;
      }
      .content {
        grid-column: initial;
      }
      .title {
        white-space: initial;
        width: initial;
        max-height: 2.4em;
      }
      .details {
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .excerpt {
        display: none;
      }

      .item-actions {
        width: 100%;
      }
      .tags {
        display: none;
      }
      .actions button {
        opacity: 1;
        &.active {
          opacity: 1;
        }
        width: initial;
      }

      &:hover .actions button {
        opacity: 1;
      }

      .footer {
        position: absolute;
        bottom: 0;
        left: 0;
        top: initial;
        right: initial;
        width: 100%;
        z-index: var(--zIndexRaised);
      }
      .bulkBacking {
        padding: 1.1em;
      }
    }
  }
`
export const cardDetail = css`
  ${cardsGrid};
  grid-row-gap: 0;

  article {
    grid-column: span 12;
    height: 155px;
    padding: 1em 0;
    border-bottom: 1px solid var(--color-dividerTertiary);

    & > a {
      height: initial;
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-column-gap: var(--size150);
      padding: 0;
    }
    .media {
      grid-column: span 2;
    }

    .content {
      grid-column: span 10;
      position: relative;
    }

    .title {
      padding: 0;
      font-size: var(--fontSize100);
      line-height: 1.286;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .details {
      font-size: var(--fontSize075);
      line-height: 1.5;
      padding: var(--size025) 0 0;
    }

    .excerpt {
      font-size: var(--fontSize085);
      max-height: 3.2em;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
    }

    .item-actions {
      padding: 0;
      &:after {
        box-shadow: none;
      }
    }
    .item-menu {
      width: initial;
    }

    .footer {
      align-items: center;
      padding-top: 0.5rem;
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-column-gap: var(--size150);
    }

    .bulkBacking {
      padding: 0 0.5em;
      transform: translate(-0.5em, -1em);
    }

    .tags {
      grid-column: 3 / span 7;
      overflow: hidden;
      white-space: nowrap;
      a {
        font-size: 14px;
        margin-right: 0.5em;
        cursor: pointer;
        text-decoration: none;
      }
    }
    .actions {
      grid-column: 10 / span 3;
    }
  }

  /* 1023 */
  ${breakpointLargeTablet} {
    article {
      .tags {
        grid-column: 1 / span 9;
      }
      .actions {
        grid-column: 10 / span 3;
      }
    }
  }

  /* 959 */
  ${breakpointMediumTablet} {
    article {
      .tags {
        grid-column: 1 / span 8;
      }
      .actions {
        grid-column: 9 / span 4;
      }
    }
  }

  /* 839 */
  ${breakpointSmallTablet} {
    article {
      .tags {
        grid-column: 1 / span 8;
      }
      .actions {
        grid-column: 9 / span 3;
      }
    }
  }

  /* 719 */
  ${breakpointTinyTablet} {
    article {
      height: 185px;
      .tags {
        grid-column: span 12;
      }
      .actions {
        grid-column: span 12;
        padding-top: 0.5rem;
        justify-content: flex-end;
      }
    }
  }

  /* 599 */
  ${breakpointLargeHandset} {
    article {
      .content {
        grid-column: span 12;
      }
      .media {
        display: none;
      }
    }
  }

  /* 479 */
  ${breakpointMediumHandset} {
  }

  /* 399 */
  ${breakpointSmallHandset} {
  }
`
