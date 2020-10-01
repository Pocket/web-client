import { css } from 'linaria'

export const tooltipBody = css`
  top: 1px;
  white-space: nowrap;
  padding: 5px 10px 6px;
  border-radius: 4px;
  background-color: #000;
  color: #fff;
  text-align: center;
  font-size: 14px;
  line-height: 1.2;
  font-family: 'Graphik Web';

  &:before {
    position: absolute;
    top: -5px;
    width: 0;
    border-bottom: 5px solid #000;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    content: ' ';
    font-size: 0;
    line-height: 0;
  }
`

export const tooltipBase = css`
  &[data-tooltip] {
    position: relative;
    z-index: var(--zIndexTooltip);
    cursor: pointer;
  }
  &[data-tooltip]:before,
  &[data-tooltip]:after {
    position: absolute;
    pointer-events: none;
    left: 50%;
    visibility: hidden;
    opacity: 0;
    transform: translate(-50%, 14px);
    transform-style: preserve-3d;
    transition: transform 200ms 1200ms ease-in-out,
      opacity 150ms 1250ms ease-out;
    z-index: var(--zIndexTooltip);
  }
  &[data-tooltip]:before {
    font-family: 'Graphik Web';
    white-space: nowrap;
    bottom: 0;
    padding: 5px 10px 6px;
    border-radius: 4px;
    background-color: #000;
    color: #fff;
    content: attr(data-tooltip);
    text-align: center;
    font-size: 14px;
    line-height: 1.2;
  }
  &[data-tooltip]:after {
    bottom: 27px;
    width: 0;
    border-bottom: 5px solid #000;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    content: ' ';
    font-size: 0;
    line-height: 0;
  }
  &[data-tooltip]:hover:before,
  &[data-tooltip]:hover:after {
    transform: translate(-50%, 36px);
    visibility: visible;
    opacity: 1;
  }
  @media (hover: none), (hover: on-demand) {
    &[data-tooltip]:hover:before,
    &[data-tooltip]:hover:after {
      /* suppress hover effect on devices that don't support hover fully */
      transform: translate(-50%, 14px);
      visibility: hidden;
      opacity: 0;
      display: none;
    }
  }
`
