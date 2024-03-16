import { css } from '@emotion/css'
import { breakpointLargeHandset } from 'common/constants'
import { breakpointSmallTablet } from 'common/constants'
import { breakpointTinyTablet } from 'common/constants'
import { breakpointMediumHandset } from 'common/constants'

export const itemStyles = css`
  // Where does the footer sit?  Stacked default
  --footer-column: initial;
  --footer-column-template: minmax(0, 1fr) auto;
  --footer-column-gap: 1rem;
  --footer-height: 52px;

  // Generally these are consistent styles
  --card-padding: 1rem;

  --media-radius: 1rem 1rem 0 0;
  --media-margin: 0 0 0 0;
  --media-aspect: 56.25%;

  --card-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  --card-hover-shadow: 0 0 18px rgba(0, 0, 0, 0.25);
  --tag-box-shadow: 0 -2px 18px rgba(0, 0, 0, 0.25);

  --overline-display: block;

  --title-line-height: 1.25em;
  --title-margin: 1rem 0 0.5rem;
  --title-size: 1rem;
  --title-lines: 3;

  --excerpt-display: initial;
  --excerpt-size: 0.875rem;
  --excerpt-margin: 0 0 1rem;
  --excerpt-lines: 3;
  --excerpt-line-height: 1.35em;

  --details-size: 0.875rem;
  --details-column: initial;
  --details-row: initial;

  --logo-display: block;
  --overflow-transform: translate(-10%, 10%);

  .colormode-dark & {
    --card-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
    --card-hover-shadow: 0 0 18px rgba(0, 0, 0, 0.9);
  }

  // Baseline Card Styles
  font-family: var(--fontSansSerif);
  font-weight: 400;
  position: relative;
  z-index: 0;
  background-color: var(--color-canvas);
  box-shadow: var(--card-shadow);
  border-radius: 1rem;
  transition: all 150ms ease-in;
  height: 100%;
  width: 100%;
  margin: 0;

  // Inner grid used to lay out the card components
  display: grid;

  // In a vertical card everything is stacked
  grid-template-columns: 1fr;
  grid-column-gap: 0;
  grid-template-rows: auto minmax(0, 1fr) auto;

  // What happens when we hover over the main card
  &:hover {
    z-index: 1;
    box-shadow: var(--card-hover-shadow);

    // We show a view original to help the user realize they may be leaving the pocket experience
    // ?? There may be a more elegant solution here
    .view-original {
      opacity: 1;
      transition: opacity 300ms ease-in-out;
    }
  }

  // Standard link behavior throughout the card
  a {
    text-decoration: none;
    &:focus {
      outline: none;
    }
    &:hover {
      color: var(--color-textPrimary);
    }
  }

  // What does the main image look like?
  .media-block {
    margin: var(--media-margin);
    position: relative;
    overflow: hidden;
    .media {
      border-radius: var(--media-radius);
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

    ${breakpointSmallTablet} {
      display: none;
    }

    .view-original-text + .icon {
      margin-left: 0.25rem;
      margin-top: 0;
    }
  }

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
    bottom: 1rem;
    left: 1rem;
    text-transform: capitalize;
    min-height: 32px;
    display: flex;
    align-items: center;
  }

  .user-list {
    background: rgba(255, 255, 255, 0.9);
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.25rem;
    border-radius: 4px;
    color: var(--color-grey10);
    position: absolute;
    padding: 0.125rem 0.5rem;
    z-index: 10;
    bottom: 1rem;
    left: 1rem;
  }

  // What does the main content (title/excerpt) look like?
  .content-block {
    display: block;
    padding: 0 var(--card-padding);
    grid-column: var(--content-column);
  }

  .overline {
    display: var(--overline-display);
    position: absolute;
    background-color: var(--color-canvas);
    color: var(--color-textSecondary);
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 0.014em;
    line-height: 1.25;
    transform: translate(-1rem, -100%);
    padding: 0.5rem 1rem 1rem 1rem;
    z-index: 12;
    border-radius: 0 1rem 0 0;
  }

  .title {
    font-weight: 500;
    font-size: var(--title-size);
    margin: var(--title-margin);
    line-height: var(--title-line-height);

    &.withTopDetails {
      margin-top: 0;
    }

    &.open-external {
      .mobile-view-original {
        display: none;
      }
      ${breakpointSmallTablet} {
        .text {
          display: inline-block;
          margin-right: 0.5rem;
        }
        .mobile-view-original {
          display: inline-block;
        }
      }
    }
  }

  .excerpt {
    display: var(--excerpt-display);
    p {
      font-size: var(--excerpt-size);
      overflow: hidden;
      text-overflow: ellipsis;
      margin: var(--excerpt-margin);
      line-height: var(--excerpt-line-height);
    }
  }

  &.clamped {
    .title {
      max-height: calc(var(--title-line-height) * var(--title-lines));
      overflow: hidden;
      text-overflow: ellipsis;
      overflow-wrap: anywhere;
      display: -webkit-box;
      -webkit-line-clamp: var(--title-lines);
      -webkit-box-orient: vertical;
    }
    .excerpt p {
      max-height: calc(var(--excerpt-line-height) * var(--excerpt-lines));
      overflow: hidden;
      text-overflow: ellipsis;
      overflow-wrap: anywhere;
      display: -webkit-box;
      -webkit-line-clamp: var(--excerpt-lines);
      -webkit-box-orient: vertical;
    }
  }

  .listStatus {
    padding: 0 var(--card-padding);
    margin-bottom: 0.5rem;
  }

  .footer {
    padding: 0 var(--card-padding) var(--card-padding);
    display: grid;
    grid-column: var(--footer-column);
    grid-template-columns: var(--footer-column-template);
    grid-column-gap: var(--footer-column-gap);
    line-height: 1.25;
    padding-bottom: 0.725rem;
    &.signaled {
      grid-column-gap: 0;

      .save {
        padding: 0 0.5rem;

        .copy {
          color: var(--color-textPrimary);
        }
        &:hover .copy {
          color: var(--color-actionBrand);
        }
      }
    }
  }

  .details {
    display: flex;
    overflow: hidden;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    font-style: normal;
    font-size: var(--details-size);
    font-weight: 500;
    line-height: 1.25;
    color: var(--color-textSecondary);
  }

  .report {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(26, 26, 26, 0.8);
    font-size: 1.5rem;
    line-height: 1em;
    color: var(--color-white100);
    width: 32px;
    height: 32px;
    padding: 0;
    .icon {
      margin-top: 0;
    }
  }

  .signals {
    button .icon {
      margin-top: 0;
    }
    .promoted {
      color: var(--color-actionPrimary);
      opacity: 1;
    }
  }

  @keyframes fadeAndDrop {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    90% {
      opacity: 0;
    }
    100% {
      transform: scale(0.8);
      opacity: 0;
    }
  }

  &.demoted {
    animation: fadeAndDrop 150ms;
  }

  .topDetails {
    display: flex;
    overflow: hidden;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    font-style: normal;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.25;
    color: var(--color-textPrimary);
    height: 32px;
    padding: 1.5rem 1rem 1rem;
  }

  .context {
    display: flex;
    justify-content: flex-start;
    font-weight: 400;
    & > div {
      padding-right: 0.5rem;
      & ~ div:before {
        color: var(--color-textSecondary);
        position: relative;
        font-size: 0.875rem;
        content: '•';
        margin-right: 0.5rem;
      }
    }

    .user-list-context {
      display: none;
    }
  }

  .footer-actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .publisherLogo {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    display: var(--logo-display);
  }

  .publisher {
    overflow: hidden;
    text-decoration: none;
    font-size: 0.875rem;
  }

  .syndicated .icon {
    display: inline-block;
    margin: -0.25rem 0 0 0.25rem;
    font-size: 1rem;
    height: 1rem;
  }

  .tags-container {
    display: none;
    padding: var(--card-padding);

    align-items: center;
    margin-right: 2rem;
    padding: var(--card-padding);
    border-radius: 1rem;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: var(--color-popoverCanvas);
    z-index: var(--zIndexTooltip);
    box-shadow: var(--tag-box-shadow);

    .icon {
      height: 24px;
      width: 24px;
    }

    .tags-list {
      padding-left: 1rem;
      display: flex;
      flex-flow: wrap;
      width: 100%;
    }
    .tag {
      margin: 0 0.5rem 0.5rem 0;
      a {
        text-decoration: none;
        cursor: pointer;
        &:hover {
          background-color: var(--color-checkboxBackgroundSelected);
        }
      }
    }
  }

  .show-tags .tags-container {
    display: flex;
  }

  &.bulkEdit {
    cursor: pointer;
    user-select: none;
    a,
    .actions {
      pointer-events: none;
    }
    &:hover .view-original {
      opacity: 0;
    }
    &.selected {
      background-color: var(--color-navCurrentTab);
    }
  }

  &.selected,
  &.bulkCurrent,
  &.bulkCurrent:focus-within {
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.5);
    .colormode-dark & {
      outline: 3px solid #000;
      transition: none;
    }
  }

  // SAVED CARD TYPES (special since they don't live in a grid)
  &.detail {
    --media-radius: 1rem;
    grid-column: span 8;
    width: 100%;
    .media-block {
      margin: 0.5rem;
      width: 280px;
      grid-row: span 2;
    }
    grid-template-rows: auto var(--footer-height);
    grid-template-columns: auto minmax(0, 1fr);
    --title-lines: 2;
    --excerpt-lines: 2;
    --footer-column-template: minmax(0, 1fr) auto;
    --title-margin: 1rem 0 0.5rem 0;
    --excerpt-margin: 0.5rem 0;
    .card-tags {
      display: block;
    }

    ${breakpointSmallTablet} {
      grid-template-rows: auto minmax(0, 1fr);
      --footer-column-template: minmax(0, 1fr) auto;
      .media-block {
        margin: 0.5rem;
        width: 170px;
        grid-row: span 1;
      }
      .footer {
        grid-column: span 2;
      }
    }
    ${breakpointMediumHandset} {
      .media-block {
        margin: 0.5rem;
        width: 120px;
        grid-row: span 1;
      }
    }
  }

  &.list {
    --title-lines: 1;
    --title-size: 1rem;
    --title-margin: 0.5rem 0;
    --excerpt-display: none;
    --footer-column-template: minmax(0, 1fr) auto;
    grid-template-rows: auto minmax(0, 1fr);

    .media-block {
      display: none;
    }

    .details {
      flex-direction: row;
      justify-content: flex-start;
      .time-to-read {
        padding-left: 0.5rem;
      }
    }

    .user-list-context {
      display: inline-block;
      margin-left: 16px;
    }

    ${breakpointMediumHandset} {
      --footer-column-template: 1fr;
    }
  }

  &.grid {
    --excerpt-display: none;
    ${breakpointLargeHandset} {
      grid-template-columns: auto minmax(0, 1fr);
      grid-template-rows: auto minmax(0, 1fr);
      --footer-column-template: minmax(0, 1fr) auto;
      .media-block {
        margin: 0.5rem;
        width: 170px;
        grid-row: span 1;
      }
      .footer {
        grid-column: span 2;
      }
    }
  }

  &.list-item {
    footer {
      grid-column-start: 2;
    }

    ${breakpointTinyTablet} {
      .media-block,
      .item-links,
      footer {
        grid-column: span 12;
      }
    }
  }
`
