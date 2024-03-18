import { css } from '@emotion/css'
import { breakpointSmallDesktop } from 'common/constants'
import { breakpointLargeTablet } from 'common/constants'
import { breakpointMediumTablet } from 'common/constants'
import { breakpointSmallTablet } from 'common/constants'
import { breakpointTinyTablet } from 'common/constants'
import { breakpointLargeHandset } from 'common/constants'
import { breakpointSmallHandset } from 'common/constants'
import { breakpointMediumHandset } from 'common/constants'

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

    &:hover {
      .view-original {
        opacity: 1;
        transition: opacity 300ms ease-in-out;
      }
    }

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
    position: relative;
    grid-column: var(--media-column-span);
    .topic-name {
      background: rgba(26, 26, 26, 0.8);
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.25rem;
      border-radius: 8px;
      color: var(--color-white100);
      position: absolute;
      padding: 0.25rem 0.825rem;
      z-index: 10;
      bottom: 2rem;
      left: 1rem;
      text-transform: capitalize;
    }
  }

  .view-original {
    opacity: 0;
    transition: opacity 300ms ease-in-out;
    background: rgba(26, 26, 26, 0.7);
    color: var(--color-white100);
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    position: absolute;
    z-index: 10;
    padding: 0.25rem 0.825rem;
    border-radius: 4px;

    ${breakpointSmallTablet} {
      display: none;
    }

    .view-original-text + .icon {
      margin-left: 0.25rem;
      margin-top: 0;
    }
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
    overflow-wrap: anywhere;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    &.flow {
      max-height: initial;
      display: block;
    }

    &.open-external {
      a {
        margin-right: 0;
        ${breakpointSmallTablet} {
          margin-right: 0.5rem;
        }
      }
      .mobile-view-original {
        display: none;
        ${breakpointSmallTablet} {
          display: inline-block;
        }
      }
    }
  }

  .details {
    font-style: normal;
    padding: var(--size050) 0;
    font-size: var(--fontSize085);
    line-height: 1.5;
    display: flex;
    align-items: center;
    align-content: center;
    color: var(--color-textSecondary);
  }

  .authors {
    padding-right: 0.625rem;
    display: inline-block;
    span:after {
      content: ',';
      display: inline-block;
      padding: 0 0.5rem 0 0;
    }
    span:last-of-type:after {
      content: '';
      display: none;
      padding: 0;
    }
  }

  .authors + .publisher {
    &:before {
      content: '·';
      display: inline-block;
      padding: 0 0.625rem 0 0;
    }
  }

  .publisher {
    font-style: normal;
    padding: 0;
    display: inline-block;
    color: var(--color-textSecondary);
    max-width: 70%;
    overflow-x: hidden;
    padding-right: 0.25rem;
    text-overflow: ellipsis;
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

  .excerpt p {
    font-size: var(--fontSize100);
    margin: 0 0 1rem 0;
    strong {
      font-weight: 500;
    }
  }

  &.clamped .excerpt p {
    max-height: calc(3 * 1.5em);
    overflow: hidden;
    text-overflow: ellipsis;
    overflow-wrap: anywhere;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .markdown {
    a {
      text-decoration: underline;
      &:hover {
        color: var(--color-textLinkHover);
      }
    }
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

  .actions .item-actions {
    button,
    a {
      border-color: transparent;
    }
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
    border: 1px solid transparent;
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

  &.selected .selectedBack,
  &.selected:focus-within .selectedBack {
    background-color: var(--color-navCurrentTab);
    display: block;
  }

  &.bulkCurrent .selectedBack,
  &.bulkCurrent:focus-within .selectedBack {
    border-color: var(--color-navCurrentTabText);
    display: block;
  }

  /** Block/Grid style
  --------------------------------------------------------------- */
  &.grid, /* saves name for block elements */
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
  &.wide,
  &.display {
    --card-column-span: span 8;

    .content {
      padding-bottom: var(--size250);
    }

    .title {
      font-size: var(--fontSize150);
      line-height: 1.286;
      max-height: 3.8em;
      &.flow {
        max-height: initial;
      }
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

    ${breakpointMediumTablet} {
      --card-column-span: span 10;
    }

    ${breakpointLargeHandset} {
      --card-column-span: span 12;
      .title {
        font-size: 1rem;
        line-height: 1.25;
      }
    }
    ${breakpointMediumHandset} {
      .excerpt {
        display: none;
      }
    }
  }

  &.display {
    --card-column-span: span 4;
    .title {
      font-size: 0.85rem;
      line-height: 1.286;
      max-height: 2.6em;
      &.flow {
        max-height: initial;
      }
    }
    .details {
      padding: 0 0 var(--size050);
      font-size: 0.725rem;
    }
    .actions {
      .actionCopy {
        font-size: 0.85rem;
      }
      padding: 0 0 0.725rem;
      transform: translateX(-0.25rem);
    }

    ${breakpointLargeTablet} {
      --media-column-span: span 12;
      --content-column-span: span 12;
      .cardWrap {
        grid-column-gap: 0;
      }
      .footer .actions {
        grid-column: span 12;
      }
    }

    ${breakpointTinyTablet} {
      --card-column-span: span 12;
      --media-column-span: span 4;
      --content-column-span: span 8;
      .cardWrap {
        grid-column-gap: 1rem;
        padding-bottom: 0.25rem;
      }
      .title {
        font-size: 1rem;
        line-height: 1.25;
      }
      .details {
        font-style: normal;
        padding: var(--size050) 0;
        font-size: var(--fontSize085);
        line-height: 1.5;
        display: block;
        color: var(--color-textSecondary);
      }
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

      .footer .actions {
        grid-column: 5 / span 8;
        padding-bottom: 1rem;
        .item-actions {
          transform: none;
        }
      }
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

    .view-original .icon {
      margin-left: 0;
    }

    .view-original-text {
      display: none;
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
    height: 160px;
    padding: 1em 0;
    border-bottom: 1px solid var(--color-dividerTertiary);

    &:last-of-type {
      border-bottom: none;
    }

    .media {
      grid-column: span 2;
    }

    .view-original .icon {
      margin-left: 0;
    }

    .view-original-text {
      display: none;
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

  /** Flex style
  --------------------------------------------------------------- */

  &.flex {
    .title {
      font-size: 1rem;

      ${breakpointLargeHandset} {
        font-size: 1rem;
      }
    }

    & + .flex {
      grid-column: span 6;
    }

    ${breakpointSmallDesktop} {
      .view-original-text {
        display: none;
      }
    }

    ${breakpointMediumTablet} {
      --media-column-span: span 12;
      --content-column-span: span 12;

      .view-original-text {
        display: inline;
      }
    }

    ${breakpointSmallTablet} {
      --media-column-span: span 4;
      --content-column-span: span 8;
    }

    ${breakpointTinyTablet} {
      padding-bottom: 2.5rem;
    }

    // these styles are applied when there is only one <article> item in the parent
    &:only-of-type {
      grid-column: span 12;
      --media-column-span: span 3;
      --content-column-span: span 9;

      .title {
        font-size: 1.25rem;
      }
      .view-original-text {
        display: inline;
      }

      ${breakpointMediumTablet} {
        --media-column-span: span 4;
        --content-column-span: span 8;
        .title {
          font-size: 1rem;
        }
      }

      ${breakpointTinyTablet} {
        .excerpt {
          display: none;
        }
      }
    }

    // these styles are applied when there are two card items
    // https://css-tricks.com/solved-with-css-logical-styling-based-on-the-number-of-given-elements/
    &:first-child:nth-last-child(n + 2),
    &:first-child:nth-last-child(n + 2) ~ * {
      grid-column: span 6;
      .view-original-text {
        display: none;
      }

      ${breakpointSmallTablet} {
        --media-column-span: span 4;
        --content-column-span: span 8;
        grid-column: span 12;
        padding-bottom: 0;

        .cardWrap {
          grid-column-gap: 1.5rem;
        }
      }
    }

    // these styles are applied when there are three card items
    &:first-child:nth-last-child(n + 3),
    &:first-child:nth-last-child(n + 3) ~ * {
      grid-column: span 4;
      ${breakpointLargeTablet} {
        --media-column-span: span 12;
        --content-column-span: span 12;

        .view-original-text {
          display: inline;
        }
      }

      ${breakpointMediumTablet} {
        .cardWrap {
          grid-column-gap: 0;
        }
      }
      ${breakpointSmallTablet} {
        --media-column-span: span 4;
        --content-column-span: span 8;
        grid-column: span 12;
        padding-bottom: 0;

        .cardWrap {
          grid-column-gap: 1.5rem;
        }
      }
    }
  }

  /** Lockup style
  --------------------------------------------------------------- */
  .lockup-hero & {
    --card-column-span: span 3;
    border-bottom: 0;

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
        &.flow {
          max-height: initial;
        }
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

    ${breakpointLargeTablet} {
      &.hero-center,
      &.hero-left,
      &.hero-right {
        .title {
          font-size: 1.75rem;
          line-height: 1.179;
        }
      }
      .details,
      .excerpt {
        font-size: 0.85rem;
        line-height: 1.429;
      }
    }

    /*
      ┌───────┐ ┌───┐
      │       │ └───┘
      │       │ ┌───┐
      └───────┘ └───┘
      ┌─────┐ ┌─────┐
      └─────┘ └─────┘
    */

    ${breakpointMediumTablet} {
      &.hero-center,
      &.hero-left,
      &.hero-right {
        --card-row-span: span 2;
        --card-column-span: 1 / span 6;
      }
    }

    /*
      ┌─────────────┐
      │             │
      │             │
      └─────────────┘
      ┌─────┐ ┌─────┐
      └─────┘ └─────┘
      ┌─────┐ ┌─────┐
      └─────┘ └─────┘
    */

    ${breakpointTinyTablet} {
      --card-column-span: span 6;
      &.hero-center,
      &.hero-left,
      &.hero-right {
        --card-row-span: span 2;
        --card-column-span: 1 / -1;
        .details {
          padding: var(--spacing050) 0;
        }
        .title {
          max-height: calc(1em * 5.25);
          &.flow {
            max-height: initial;
          }
        }
      }
    }

    ${breakpointLargeHandset} {
      --card-column-span: span 12;

      &.hero-center,
      &.hero-left,
      &.hero-right {
        .title {
          font-size: 1.125rem;
          line-height: 1.286;
          max-height: 4.725em;
          &.flow {
            max-height: initial;
          }
        }
      }
      &:nth-child(n + 2) {
        .excerpt {
          display: none;
        }
        .title {
          font-size: 1rem;
          line-height: 1.25;
        }
      }
    }

    ${breakpointMediumHandset} {
      &.hero-center,
      &.hero-left,
      &.hero-right {
        --card-row-span: span 2;
        --card-column-span: 1 / -1;
        .media {
          grid-column: span 12;
        }
        .content {
          grid-column: span 12;
        }
        .title {
          font-size: 1.25rem;
          line-height: 1.286;
          max-height: 4.725em;
          &.flow {
            max-height: initial;
          }
        }
        .footer .actions {
          grid-column: 1 / -1;
        }
        .details {
          padding: var(--spacing050) 0;
        }
      }
    }

    ${breakpointSmallHandset} {
      &.hero-center,
      &.hero-left,
      &.hero-right {
        .title {
          font-size: 1.25rem;
        }
      }
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

  /** Collection specific style
  --------------------------------------------------------------- */
  &.collection {
    ${breakpointTinyTablet} {
      --card-column-span: span 12;
      .media {
        grid-column: span 12;
      }
      .content {
        grid-column: span 12;
      }
      .title {
        font-size: 1.25rem;
        line-height: 1.286;
        max-height: 4.825em;
        &.flow {
          max-height: initial;
        }
      }
      .footer .actions {
        grid-column: 1 / -1;
      }
    }
  }

  /** Home specific style
  --------------------------------------------------------------- */
  &.homeCard {
    .footer .card-actions .icon {
      margin-left: -6px;
    }

    ${breakpointSmallDesktop} {
      .details {
        flex-direction: column;
        align-content: flex-start;
        align-items: flex-start;
      }
      .authors {
        color: var(--color-textPrimary);
      }
      .authors + .publisher {
        &:before {
          content: '';
          display: none;
          padding: 0;
        }
      }
      .publisher {
        max-width: 100%;
      }
    }

    ${breakpointTinyTablet} {
      --card-column-span: span 12;
      padding-bottom: 2rem;
      .media {
        grid-column: span 12;
      }
      .content {
        grid-column: span 12;
      }
      .title {
        font-size: 1.25rem;
        line-height: 1.286;
        max-height: 4.825em;
        &.flow {
          max-height: initial;
        }
      }
      .details {
        flex-direction: row;
        align-content: flex-start;
        align-items: flex-start;
      }
      .authors + .publisher {
        &:before {
          content: '·';
          display: inline-block;
          padding: 0 0.625rem 0 0;
        }
      }
      .publisher {
        max-width: 70%;
      }
      .footer .actions {
        grid-column: 1 / -1;
      }
    }
  }

  .smallCards & {
    --media-column-span: 1;
    --content-column-span: 2/-1;

    .cardWrap {
      display: grid;
      height: initial;
      padding-bottom: 0;
      grid-column-gap: 1rem;
      grid-template-columns: repeat(3, 1fr);
    }
    .media {
      padding-bottom: 0;
    }

    .view-original {
      display: none;
    }

    .topic-name {
      display: none;
    }
    .excerpt {
      display: none;
    }
    .details {
      padding: 0.25rem 0;
    }

    .footer {
      position: initial;
      bottom: initial;
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: 1rem;
      .actions {
        padding-top: 0;
        grid-column: 2/-1;
      }
    }
  }
`
