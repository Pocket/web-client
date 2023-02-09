import { css } from 'linaria'
import {
  breakpointLargeHandset,
  breakpointLargeTablet,
  breakpointMediumTablet,
  breakpointSmallTablet,
  breakpointTinyTablet
} from 'common/constants'
import { breakpointMediumHandset } from 'common/constants'

export const itemStyles = css`
  // This is can be used in layouts
  --card-column: span 4;
  --card-row: span 1;

  // We lay out the card in it's own grid (independent of containing layout)
  --card-column-template: 1fr;
  --card-column-gap: 0;

  // Where does the media sit?  Stacked default
  --media-column: initial;
  --media-row: initial;

  // Where does the content sit?  Stacked default
  --content-column: initial;
  --content-row: initial;

  // Where does the footer sit?  Stacked default
  --footer-column: initial;
  --footer-column-template: auto 42px;
  --footer-column-gap: 1rem;

  // Generally these are consistent styles
  --card-padding: 1rem;

  --media-radius: 1rem 1rem 0 0;
  --media-margin: 0 0 0 0;
  --media-aspect: 56.25%;

  --card-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  --card-hover-shadow: 0 0 18px rgba(0, 0, 0, 0.25);
  --card-border-radius: 1rem;
  --card-transition: all 150ms ease-in;

  --overline-display: block;

  --title-line-height: 1.25em;
  --title-margin: 1rem 0;
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

  // Container card styles
  font-family: var(--fontSansSerif);
  font-weight: 400;
  position: relative;
  z-index: 0;
  grid-column: var(--card-column);
  grid-row: var(--card-row);

  background-color: var(--color-canvas);
  box-shadow: var(--card-shadow);
  border-radius: var(--card-border-radius);
  transition: var(--card-transition);

  // Inner grid
  display: grid;

  grid-template-columns: var(--card-column-template);
  grid-column-gap: var(--card-column-gap);
  grid-template-rows: auto minmax(0, 1fr) 48px;

  // Lets the cards fill their container
  height: 100%;
  width: 100%;

  // What happens when we hover over the main card
  &:hover {
    box-shadow: var(--card-hover-shadow);
    .view-original {
      opacity: 1;
      transition: opacity 300ms ease-in-out;
    }
  }

  & > a {
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
    position: relative;
    grid-column: var(--media-column);
    grid-row: var(--media-row);
    border-radius: var(--media-radius);
    overflow: hidden;
    .media {
      margin: var(--media-margin);
      padding-bottom: 0; // This is an overide and should be removed from the media element
    }
    span,
    img {
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
    bottom: 2rem;
    left: 1rem;
    text-transform: capitalize;
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

    border-radius: 0 1rem 0 0;
  }

  .title {
    font-weight: 500;
    font-size: var(--title-size);
    margin: var(--title-margin);
    line-height: var(--title-line-height);

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

  &.clamped .title {
    max-height: calc(var(--title-line-height) * var(--title-lines));
    overflow: hidden;
    text-overflow: ellipsis;
    overflow-wrap: anywhere;
    display: -webkit-box;
    -webkit-line-clamp: var(--title-lines);
    -webkit-box-orient: vertical;
  }

  .excerpt {
    display: none;
    p {
      font-size: var(--excerpt-size);
      overflow: hidden;
      text-overflow: ellipsis;
      margin: var(--excerpt-margin);
      line-height: var(--excerpt-line-height);
    }
  }

  &.showExcerpt .excerpt {
    display: block;
  }

  &.clamped .excerpt p {
    max-height: calc(var(--excerpt-line-height) * var(--excerpt-lines));
    overflow: hidden;
    text-overflow: ellipsis;
    overflow-wrap: anywhere;
    display: -webkit-box;
    -webkit-line-clamp: var(--excerpt-lines);
    -webkit-box-orient: vertical;
  }

  .footer {
    padding: 0 var(--card-padding) var(--card-padding);
    display: grid;
    grid-column: var(--footer-column);
    grid-template-columns: var(--footer-column-template);
    grid-column-gap: var(--footer-column-gap);
    line-height: 1.25;
    padding-bottom: 0.725rem;
  }

  cite.details {
    display: flex;
    overflow: hidden;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    font-style: normal;
    font-size: var(--details-size);
    line-height: 1.25;
    color: var(--color-textSecondary);
  }

  .time-to-read {
    font-weight: 300;
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
    font-weight: 400;
    overflow: hidden;
    text-decoration: none;
    font-size: 0.875rem;
  }

  .syndicated .icon {
    display: inline-block;
    margin: -0.25rem 0 0 0.25rem;
    font-size: 1rem;
  }

  .tags {
    display: none;
    padding: 0 0 var(--card-padding) 0;
    grid-column: 1/-1;
    flex-flow: wrap;
    span {
      margin: 0 0.5rem 0.5rem 0;
      a {
        text-decoration: none;
        cursor: pointer;
        &:hover {
          background-color: var(--color-checkboxBackgroundSelected);
        }
      }
    }

    .showTags & {
      display: flex;
    }
  }

  // This view is very flawed.  It seems built to address aribrary existing layout
  // but I tried to get a consistent information hierarchy into it
  &.side-by-side {
    --card-column: span 4;
    --card-row: span 1;

    // We lay out the card in it's own grid (independent of containing layout)
    --card-column-template: 120px auto;
    --card-column-gap: 0.5rem;

    // Where does the media sit?  Stacked default
    --media-column: 1;
    --media-row: span 2;

    // Where does the content sit?  Stacked default
    --content-column: 2/-1;
    --content-row: initial;

    --card-padding: 0.875rem;
    --overline-display: none;
    --title-size: 1rem;
    --title-margin: 0.875rem 0 0.5rem;
    --media-radius: 0.5rem;
    --media-margin: 0.875rem 0 0.875rem 0.875rem;
    --excerpt-display: none;
    --logo-display: none;
    --overflow-transform: translate(15%, -15%);
  }

  .lockup-hero & {
    --card-column: span 3;
    --card-row: span 1;

    &.showExcerpt .excerpt {
      display: none;
    }
    ${breakpointSmallTablet} {
      --card-column: span 6;
      --card-row: span 1;
    }
  }

  &.hero-left {
    --card-column: 1 / span 6;
    --card-row: span 2;
    --title-size: 1.5rem;
    &.showExcerpt .excerpt {
      display: block;
      p {
        font-size: 1.125rem;
      }
    }
    ${breakpointSmallTablet} {
      --card-column: 1 / span 12;
      --card-row: span 1;
    }
  }

  .horizontal-items & {
    --media-radius: 1rem;
    grid-column: span 8;
    width: 100%;
    .media-block {
      margin: 0.5rem;
      width: 280px;
      grid-row: span 2;
    }
    grid-template-rows: auto 42px;
    grid-template-columns: auto minmax(0, 1fr);
    ${breakpointLargeTablet} {
      grid-column: span 12;
      &.showExcerpt .excerpt {
        display: block;
      }
    }
    ${breakpointTinyTablet} {
      .media-block {
        margin: 0.5rem;
        width: 140px;
        grid-row: span 2;
      }
    }
  }

  &.detail {
    --media-radius: 1rem;
    grid-column: span 8;
    width: 100%;
    .media-block {
      margin: 0.5rem;
      width: 280px;
      grid-row: span 2;
    }
    grid-template-rows: auto 42px;
    grid-template-columns: auto minmax(0, 1fr);
    --title-lines: 2;
    --excerpt-lines: 2;
    --footer-column-template: minmax(0, 1fr) auto;
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
  .smallCards & {
    grid-column: span 3;
  }

  &.list {
    --title-lines: 1;
    --title-size: 1rem;
    --title-margin: 0.5rem 0;
    grid-template-rows: auto minmax(0, 1fr);
    --footer-column-template: minmax(0, 1fr) auto;
    .media-block {
      display: none;
    }
    &.showExcerpt .excerpt {
      display: none;
    }

    cite.details {
      flex-direction: row;
      justify-content: flex-start;
      .time-to-read {
        padding-left: 0.5rem;
      }
    }

    ${breakpointMediumHandset} {
      --footer-column-template: 1fr;
    }
  }

  &.grid {
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
  .recentCards & {
    --media-radius: 0.5rem;
    --title-size: 0.825rem;
    --title-margin: 0.5rem 0;

    .media-block {
      margin: 0.5rem;
      width: 100%;
      grid-row: span 2;
    }
    &.showExcerpt .excerpt {
      display: none;
    }
    grid-column-gap: 0.5rem;
    grid-template-rows: minmax(0, 1fr) 32px;
    grid-template-columns: 156px minmax(0, 1fr);

    cite.details {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
    }
    .footer {
      grid-template-columns: 1fr;
    }
    .footer-actions {
      display: none;
    }
  }
`
