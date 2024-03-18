import { css, cx } from '@emotion/css'

export const horizontalAnimation = `
  @keyframes tooltipFadeawayHorizontal {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }
    9%,
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`

export const tooltipStyles = css`
  display: inline-block;
  position: relative;

  &[data-tooltip] {
    position: relative;
  }

  /* tooltip arrow AND body */
  &[data-tooltip]:before,
  &[data-tooltip]:after {
    line-height: 1;
    user-select: none;
    pointer-events: none;
    position: absolute;
    opacity: 0;
  }

  /* tooltip arrow */
  &[data-tooltip]:before {
    content: '';
    z-index: var(--zIndexTooltip);
    border: 4px solid transparent;
  }

  /* tooltip body */
  &[data-tooltip]:after {
    content: attr(data-tooltip); /* get text value from markup */
    font-size: var(--fontSize085);
    z-index: var(--zIndexTooltip);
    font-family: var(--fontSansSerif);
    text-align: center;
    width: 0;

    /* Constrain edge case sizes */
    min-width: 3rem;
    max-width: 20rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    line-height: 143%;
    padding: var(--spacing025) var(--spacing050);
    border-radius: 4px;

    background-color: var(--color-tooltipCanvas);
    color: var(--color-tooltipText);
  }

  &[data-tooltip]:hover:after {
    width: unset;
  }

  /* Shared animation styles for both tooltip arrow and body on hover */
  &[data-tooltip]:hover:before,
  &[data-tooltip]:hover:after {
    animation-duration: calc(var(--dialogsDurationEnterMS) + 1500ms + var(--dialogsDurationExitMS));
    animation-timing-function: var(--easingAccelerate);
    animation-direction: normal;
    animation-fill-mode: forwards;
  }

  /* Safari focus/active styles are super buggy
   * and show focus outline around pseudo elements.
   * Hide tooltip if button has focus/active */
  &[data-tooltip]:active:before,
  &[data-tooltip]:active:after,
  &[data-tooltip]:focus:before,
  &[data-tooltip]:focus:after {
    display: none;
  }

  /* Re-show tooltip if hovering over focused element */
  &[data-tooltip]:focus:hover:before,
  &[data-tooltip]:focus:hover:after {
    display: inline-block;
  }
`

export const placementBottom = css`
  @keyframes tooltipFadeawayBottom {
    0% {
      opacity: 0;
      transform: translate(-50%, 0.2em) scale(0.8);
    }
    9%,
    100% {
      opacity: 1;
      transform: translate(-50%, 0) scale(1);
    }
  }

  &[data-tooltip]:before,
  &[data-tooltip]:after {
    left: 50%;
    transform: translate(-50%, 0);
  }

  /* tooltip arrow */
  &[data-tooltip]:before {
    top: calc(100% + var(--spacing050));
    border-top-width: 0;
    border-bottom-color: var(--color-tooltipCanvas);
  }

  /* tooltip body */
  &[data-tooltip]:after {
    top: calc(100% + 3px + var(--spacing050));
  }

  &[data-tooltip]:hover:before,
  &[data-tooltip]:hover:after {
    transform-origin: top;
    animation-name: tooltipFadeawayBottom;
  }
`

export const placementTop = css`
  @keyframes tooltipFadeawayTop {
    0% {
      opacity: 0;
      transform: translate(-50%, -0.2em) scale(0.8);
    }
    9%,
    100% {
      opacity: 1;
      transform: translate(-50%, 0) scale(1);
    }
  }

  &[data-tooltip]:before,
  &[data-tooltip]:after {
    left: 50%;
    transform: translate(-50%, 0);
  }

  /* tooltip arrow */
  &[data-tooltip]:before {
    bottom: calc(100% + var(--spacing050));
    border-bottom-width: 0;
    border-top-color: var(--color-tooltipCanvas);
  }

  /* tooltip body */
  &[data-tooltip]:after {
    bottom: calc(100% + 3px + var(--spacing050));
  }

  &[data-tooltip]:hover:before,
  &[data-tooltip]:hover:after {
    transform-origin: bottom;
    animation-name: tooltipFadeawayTop;
  }
`

export const placementRight = css`
  ${horizontalAnimation};

  /* tooltip arrow */
  &[data-tooltip]:before {
    bottom: 5px;
    left: calc(100% - 1px + var(--spacing075));
    border-left-width: 0;
    border-right-color: var(--color-tooltipCanvas);
  }

  /* tooltip body */
  &[data-tooltip]:after {
    bottom: -5px;
    left: calc(100% - 1px + var(--spacing100));
  }

  &[data-tooltip]:hover:before,
  &[data-tooltip]:hover:after {
    transform-origin: left;
    animation-name: tooltipFadeawayHorizontal;
  }
`

export const placementLeft = css`
  ${horizontalAnimation};

  /* tooltip arrow */
  &[data-tooltip]:before {
    bottom: 5px;
    right: calc(100% + 1px + var(--spacing050));
    border-right-width: 0;
    border-left-color: var(--color-tooltipCanvas);
  }

  /* tooltip body */
  &[data-tooltip]:after {
    bottom: -5px;
    right: calc(100% + var(--spacing075));
  }

  &[data-tooltip]:hover:before,
  &[data-tooltip]:hover:after {
    transform-origin: right;
    animation-name: tooltipFadeawayHorizontal;
  }
`

export const delayStyle = css`
  &[data-tooltip]:hover:before,
  &[data-tooltip]:hover:after {
    animation-delay: 1s;
  }
`

export const bottomTooltip = cx(tooltipStyles, placementBottom)
export const bottomTooltipDelayed = cx(tooltipStyles, placementBottom, delayStyle)

export const topTooltip = cx(tooltipStyles, placementTop)
export const topTooltipDelayed = cx(tooltipStyles, placementTop, delayStyle)

export const rightTooltip = cx(tooltipStyles, placementRight)
export const rightTooltipDelayed = cx(tooltipStyles, placementRight, delayStyle)

export const leftTooltip = cx(tooltipStyles, placementLeft)
export const leftTooltipDelayed = cx(tooltipStyles, placementLeft, delayStyle)
