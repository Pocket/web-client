import { css } from 'linaria'

// !! Caution
// Changes to cardStyles will change ALL cards across the app (eventually).
// The goal of these styles is to provide a baseline of styles which should/
// be overridden for specific card types
export const cardStyles = css`
  width: 100%;
  height: 100%;
  padding: 0;
  font-family: var(--fontSansSerif);
  font-weight: 400;
  position: relative;
  z-index: 0;

  .cardWrap {
    position: relative;
    display: block;
    height: 100%;
    width: 100%;
    text-decoration: none;
    padding-bottom: 2.5rem;
    a {
      text-decoration: none;
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

  .idOverlay {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: rgba(255, 255, 255, 0.5);
    padding: var(--spacing050);
    border-radius: var(--size025);
  }

  .media {
    position: relative;
    border-radius: var(--size025);
    overflow: hidden;
    img {
      aspect-ratio: 3 / 2;
      width: 100%;
      height: auto;
      transition-property: opacity;
      transition-duration: 0.2s;
      transition-timing-function: ease;
      position: relative;
      &:before {
        content: '';
        width: 100%;
        height: 100%;
        background: linear-gradient(to right, var(--fallbackBackground), var(--fallbackBackground)),
          linear-gradient(to right, var(--color-canvas), var(--color-canvas));
        position: absolute;
        top: 0;
        left: 0;
      }
      &:after {
        content: var(--fallbackLetter);
        color: var(--fallbackColor);
        font-size: 18rem;
        font-weight: 500;
        font-family: var(--fontSerifAlt);
        width: 100%;
        height: 100%;
        position: absolute;
        top: -4rem;
        left: -1rem;
      }
    }
  }

  .content {
    width: 100%;
  }

  .title {
    --color-underliner: var(--color-canvas);
    font-family: Graphik Web;
    font-weight: 600;
    font-size: var(--fontSize100);
    line-height: 1.22;
    padding: var(--size100) 0 0;
    margin: 0;
    max-height: 4.6em;
    overflow: hidden;
  }

  .details {
    font-style: normal;
    padding: var(--size050) 0;
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
    bottom: 0.5rem;
  }

  .actions {
    padding: var(--size100) 0 var(--size025);
    display: flex;
    justify-content: space-between;
  }

  &.noActions .cardLink {
    padding-bottom: 0;
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

    &.selected .title {
      --color-underliner: var(--color-navCurrentTab);
    }
  }

  .selectedBack {
    position: absolute;
    box-sizing: content-box;
    border-radius: var(--borderRadius);
    width: 100%;
    height: 100%;
    transform: translate(-1.1em, -1.1em);
    display: none;
    padding: 0 1.1em 1.1em;
    z-index: -1;
  }

  &.list .selectedBack {
    padding: 0.125em 1.1em;
  }

  &.selected .selectedBack {
    background-color: var(--color-navCurrentTab);
    display: block;
  }

  &.hero-block {
    grid-row: span 3;
  }

  &.hero-list {
    grid-column: span 5;
    grid-row: span 5;
  }

  &.hero-wide {
    grid-column: span 5;
    grid-row: span 3;
  }

  &.subset {
    grid-column: span 8;
    .media {
      grid-column: span 4;
    }
    .content {
      grid-column: span 8;
    }
    .title {
      white-space: initial;
    }
  }
`

export const cardBlock = css`
  max-width: 552px;
  grid-column: span 4;
  &.noMedia {
    .cardLink .title {
      margin-top: 0;
    }
  }
`

export const cardWide = css`
  max-width: 745px;
  grid-column: span 10;
  .cardWrap {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: var(--size150);
    padding-bottom: 0;
  }

  .media {
    grid-column: span 3;
  }
  .content {
    grid-column: span 9;
    padding-bottom: var(--size200);
  }
  .title {
    margin-top: 0;
    font-size: var(--fontSize100);
    line-height: 1.286;
    max-height: 3.8em;
  }

  .footer {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: var(--size150);
    .actions {
      grid-column: 4 / -1;
    }
  }

  &.noActions {
    .cardLink .content {
      padding-bottom: 0;
    }
  }

  &.noMedia {
    a.cardLink .content,
    .footer .actions {
      grid-column: span 8;
    }
  }
`

export const cardList = css`
  padding: var(--size100) 0;
  grid-column: span 12;
  .cardWrap {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: var(--size150);
    padding-bottom: 0;
  }
  .media {
    grid-column: span 1;
  }
  .content {
    grid-column: span 11;
  }
  .title {
    margin-top: 0;
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
    padding: 0;
  }
  .excerpt {
    display: none;
  }
  .footer {
    width: initial;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    .actions {
      padding: 0;
    }
  }
`

export const cardDetail = css`
  grid-column: span 12;
  height: 155px;
  padding: 1em 0;
  border-bottom: 1px solid var(--color-dividerTertiary);

  .cardWrap {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: var(--size150);
    padding-bottom: 0;
  }

  .media {
    grid-column: span 2;
  }

  .content {
    grid-column: span 10;
    position: relative;
  }

  .title {
    margin-top: 0;
    font-size: var(--fontSize100);
    line-height: 1.286;
    width: auto;
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
    align-content: center;
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
`
