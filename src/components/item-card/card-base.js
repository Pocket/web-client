import { css } from 'linaria'

// !! Caution
// Changes to this file will change ALL cards across the app.
// The goal of these styles is to provide a baseline of styles which should/
// be overridden for specific card types
export const cardStyles = css`
  width: 100%;
  height: 100%;
  padding: var(--spacing150) 0;
  font-family: var(--fontSansSerif);
  font-weight: 400;
  color: var(--color-textPrimary);
  position: relative;
  border-bottom: 1px solid var(--color-dividerTertiary);

  a.cardLink {
    position: relative;
    display: block;
    height: 100%;
    width: 100%;
    text-decoration: none;
    padding-bottom: 2.5rem;
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
    font-weight: 600;
    font-size: 1.1875em;
    line-height: 1.212;
    padding: 0;
    margin: var(--spacing150) 0 0;
    max-height: 3.6em;
    overflow: hidden;
  }

  .details {
    font-style: normal;
    padding: var(--size050) 0;
    display: block;
    color: var(--color-textSecondary);
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
    bottom: 0.75rem;
  }

  .actions {
    padding: var(--size100) 0 var(--size025);
    display: flex;
    justify-content: space-between;
  }

  &.noActions a.cardLink {
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
  }
`
