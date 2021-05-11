import { css } from 'linaria'
import { breakpointSmallDesktop } from '@pocket/web-ui'
import { breakpointLargeTablet } from '@pocket/web-ui'
import { breakpointMediumTablet } from '@pocket/web-ui'
import { breakpointSmallTablet } from '@pocket/web-ui'
import { breakpointTinyTablet } from '@pocket/web-ui'
import { breakpointLargeHandset } from '@pocket/web-ui'
import { breakpointSmallHandset } from '@pocket/web-ui'
import { breakpointMediumHandset } from '@pocket/web-ui'

// !! Caution
// Changes to cardStyles will change ALL cards across the app (eventually).
// The goal of these styles is to provide a baseline of styles which should/
// be overridden for specific card types
export const cardStyles = css`
  --card-column-span: span 12;
  --card-row-span: span 1;
  --media-column-span: span 4;
  --content-column-span: span 8;

  width: 100%;
  height: 100%;
  padding: 0;
  font-family: var(--fontSansSerif);
  font-weight: 400;
  position: relative;
  z-index: 0;
  grid-column: var(--card-column-span);
  grid-row: var(--card-row-span);

  .cardWrap {
    position: relative;
    height: 100%;
    width: 100%;
    text-decoration: none;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: var(--size150);
    padding-bottom: 0;

    a {
      text-decoration: none;
      &:focus {
        outline: none;
        text-decoration: underline;
      }
      &:hover {
        color: var(--color-textPrimary);
        text-decoration: underline;
      }
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        .media img {
          filter: brightness(0.95) saturate(0.8);
          transition: filter 300ms ease-in-out;
        }
      }
    }
  }

  .media {
    grid-column: var(--media-column-span);
  }

  .content {
    width: 100%;
    grid-column: var(--content-column-span);
  }

  .title {
    font-family: var(--fontSansSerif);
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.286;
    padding: 0;
    margin: 0;
    max-height: 3.858em;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .details {
    font-style: normal;
    padding: var(--size050) 0;
    font-size: var(--fontSize085);
    line-height: 1.5;
    display: block;
    color: var(--color-textSecondary);
  }

  .publisher {
    font-style: normal;
    padding: 0;
    display: inline-block;
    color: var(--color-textSecondary);
    &:hover {
      color: var(--color-textSecondary);
    }
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
  }

  .footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
  }

  &.noExcerpt .excerpt {
    display: none;
  }

  /* Bulk edit styles */
  &.bulkEdit {
    cursor: pointer;
    user-select: none;
    a,
    .actions {
      pointer-events: none;
    }
  }

  .selectedBack {
    position: absolute;
    box-sizing: content-box;
    border-radius: var(--borderRadius);
    width: 100%;
    height: 100%;
    transform: translate(-0.625rem, -0.75rem);
    display: none;
    padding: 0 0.625rem 0.75rem;
    z-index: -1;
  }

  &.list .selectedBack {
    padding: 0.125em 1.1em;
  }

  &.selected .selectedBack {
    background-color: var(--color-navCurrentTab);
    display: block;
  }

  &:focus-within .selectedBack,
  &.selected:focus-within .selectedBack {
    background-color: var(--color-navCurrentTab);
    display: block;
  }

  /** Block/Grid style
  --------------------------------------------------------------- */
  &.grid, /* my-list name for block elements */
  &.block {
    --card-column-span: span 4;

    .cardWrap {
      display: block;
      padding-bottom: 2.5rem;
    }

    /* Hide actions on block cards only */
    &.hiddenActions {
      .actions button,
      .actions a {
        display: none;
        &.active {
          display: flex;
        }
      }
      &:focus-within,
      &:hover {
        .actions button,
        .actions a {
          display: flex;
        }
      }
    }

    .footer .actions {
      grid-column: span 12;
    }

    ${breakpointTinyTablet} {
      --card-column-span: span 12;
      border-bottom: 1px solid var(--color-dividerTertiary);

      &.hiddenActions .actions {
        display: flex;
        justify-content: flex-end;
        padding: 0 0 1rem;
        button,
        a {
          display: flex;
        }
      }

      &:last-of-type {
        border-bottom: none;
      }

      .cardWrap {
        display: grid;
        padding-bottom: 1.85rem;
      }

      .footer .actions {
        grid-column: 5 / span 8;
        padding-bottom: 0.5rem;
        .item-actions {
          transform: none;
        }
      }
    }
  }

  /** Wide style
  --------------------------------------------------------------- */
  &.wide {
    --card-column-span: span 8;

    .content {
      padding-bottom: var(--size250);
    }

    .title {
      font-size: var(--fontSize150);
      line-height: 1.286;
      max-height: 3.8em;
    }

    .footer {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-column-gap: var(--size150);
      .actions {
        grid-column: 5 / -1;
      }
    }

    &.noMedia .content {
      grid-column: span 8;
    }
  }

  /** List style
  --------------------------------------------------------------- */
  &.list {
    padding: var(--size100) 0;
    border-bottom: 1px solid var(--color-dividerTertiary);

    .media {
      grid-column: span 1;
      padding-bottom: 0;
      margin-bottom: 0;
    }
    .content {
      grid-column: span 11;
    }
    .title {
      width: 70%;
      white-space: nowrap;
    }
    .details {
      font-size: var(--fontSize085);
      line-height: 1.5;
      padding: 0;
    }
    .excerpt {
      display: none;
    }
    .footer {
      width: initial;
      position: absolute;
      display: block;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      .actions {
        padding: 0;
      }
    }
    .selectedBack {
      padding: 0.125em 0.625em;
      transform: translate(-0.625rem, -1.1rem);
    }

    /* 959 */
    ${breakpointMediumTablet} {
      .media {
        display: none;
      }
      .content {
        grid-column: span 12;
      }
    }

    /* 719 */
    ${breakpointTinyTablet} {
      .cardWrap {
        height: initial;
      }
      .title {
        width: 100%;
      }
      .footer {
        width: initial;
        position: relative;
        top: initial;
        right: initial;
        transform: translateY(0);
      }
      .actions {
        grid-column: span 12;
        padding-top: 0.5rem;
        justify-content: flex-end;
      }
    }
  }

  /** Detail style
  --------------------------------------------------------------- */
  &.detail {
    grid-column: span 12;
    height: 155px;
    padding: 1em 0;
    border-bottom: 1px solid var(--color-dividerTertiary);

    .media {
      grid-column: span 2;
    }

    .content {
      grid-column: span 10;
      position: relative;
    }

    .title {
      width: 70%;
      white-space: nowrap;
    }

    &.full .title {
      width: 100%;
    }

    .details {
      padding: var(--size025) 0;
    }

    .excerpt {
      font-size: var(--fontSize085);
      max-height: 3.2em;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
    }

    .footer {
      align-items: center;
      align-content: center;
      padding-top: 0.5rem;
      bottom: 0.5rem;
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-column-gap: var(--size150);
    }

    .selectedBack {
      height: calc(100% - 0.5rem);
      transform: translate(-0.5rem, -1rem);
      padding: 0.25rem 0.5rem;
    }

    .tags {
      grid-column: 3 / span 7;
      overflow: hidden;
      white-space: nowrap;
      padding: 4px 0;
      a {
        font-size: 14px;
        margin-right: 0.5em;
        cursor: pointer;
        text-decoration: none;
      }
    }
    .actions {
      grid-column: 10 / span 3;
      padding: 0;
      justify-content: flex-end;
    }

    /* 1023 */
    ${breakpointLargeTablet} {
      .tags {
        grid-column: 1 / span 9;
      }
      .actions {
        grid-column: 10 / span 3;
      }
    }

    /* 959 */
    ${breakpointMediumTablet} {
      .tags {
        grid-column: 1 / span 8;
      }
      .actions {
        grid-column: 9 / span 4;
      }
    }

    /* 839 */
    ${breakpointSmallTablet} {
      .content {
        grid-column: span 8;
      }
      .media {
        grid-column: span 4;
      }
      .tags {
        grid-column: 1 / span 8;
      }
      .actions {
        grid-column: 9 / span 3;
      }
    }

    /* 719 */
    ${breakpointTinyTablet} {
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

    /* 599 */
    ${breakpointLargeHandset} {
      .content {
        grid-column: span 12;
      }
      .media {
        display: none;
      }
    }
  }

  /** Lockup style
  --------------------------------------------------------------- */
  .lockup-hero & {
    --card-column-span: span 3;

    .title {
      font-size: var(--fontSize125);
      line-height: 1.263;
    }

    &.hero-center,
    &.hero-left,
    &.hero-right {
      .title {
        font-size: var(--fontSize200);
        line-height: 1.212;
        max-height: 4.848em;
      }
    }

    &.hero-center {
      --card-row-span: span 2;
      --card-column-span: 4 / span 6;
    }

    &.hero-left {
      --card-row-span: span 2;
      --card-column-span: 1 / span 6;
    }

    &.hero-right {
      --card-row-span: span 2;
      --card-column-span: 7 / span 6;
    }
  }

  .lockup-showcase & {
    --card-column-span: span 8;
    --media-column-span: span 3;

    .title {
      font-size: var(--fontSize100);
      line-height: 1.263;
    }

    .excerpt {
      display: none;
      max-height: 3em;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .footer .actions {
      grid-column: 4 / -1;
    }

    &.hero-center,
    &.hero-left,
    &.hero-right {
      .title {
        font-size: var(--fontSize100);
        line-height: 1.212;
        max-height: 4.848em;
      }
      .excerpt {
        max-height: 4.4em;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .footer .actions {
        grid-column: span 12;
      }
    }

    &.hero-center,
    &.hero-left {
      --card-row-span: span 3;
      --card-column-span: 1 / span 4;
    }

    &.hero-right {
      --card-row-span: span 3;
      --card-column-span: 8 / span 4;
    }
  }

  /** Discover specific style
  --------------------------------------------------------------- */
  &.discover {
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--color-dividerTertiary);
    &:last-of-type {
      border-bottom: none;
    }
    .media {
      grid-column: span 4;
    }
    .content {
      grid-column: span 8;
    }
    .title {
      padding: 0;
      font-size: var(--fontSize150);
      line-height: 1.286;
    }

    .footer .actions {
      grid-column: 5 / span 8;
    }
  }
`
