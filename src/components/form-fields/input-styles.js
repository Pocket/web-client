import { css } from '@emotion/css'

export const inputWrapper = css`
  display: inline-block;
  width: 100%;
  position: relative;
  /* top margin is calculated as half of the size of the label font, so that the
  label can visually overlay the input border aligned to the middle of the text.
  Using a calculated value ensures this looks right as font sizes change with breakpoints.
  Generous bottom padding is also added to provide space for error/helper messages. */
  margin: calc(0.75rem / 2) 0 1.5rem 0;
  transform: translateZ(1px);

  &.disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  .label-wrapper {
    pointer-events: none;
    display: block;
    padding: 0.75rem;
    position: absolute;
    top: 0;
    left: 0;
    line-height: 110%;
  }

  label {
    display: inline-block;
    font-family: var(--fontSansSerif);
    color: var(--color-textSecondary);
    will-change: transform;
    transform: translate3d(0, 0, 0);
    transform-origin: left top;
    backface-visibility: hidden;
    transition: transform 0.1s ease-out;
  }

  input,
  textarea {
    &:disabled {
      opacity: 1;
    }
  }

  input,
  textarea {
    &:hover:enabled + .label-wrapper label {
      color: var(--color-textPrimary);
    }
  }

  input:focus:enabled + .label-wrapper label,
  textarea:focus:enabled + .label-wrapper label,
  .label-wrapper.has-value label {
    /* adjust label up by half of current font size, padding size, and minus 1 additional px to
      compensate for input border in order to place the label halfway at the input border */
    transform: translate3d(0, calc((1em / -2) - 0.75rem - 1px), 0) scale(0.75);
    background-color: var(--color-canvas);
    line-height: 1;
    border-left: 3px solid var(--color-canvas);
    border-right: 3px solid var(--color-canvas);
    margin-left: -3px; /* compensate for border add */
  }

  input,
  textarea {
    &:focus:enabled + .label-wrapper label {
      color: var(--color-formFieldFocusLabel);
    }
  }

  &.invalid {
    input,
    input:hover:enabled,
    input:focus:enabled,
    textarea,
    textarea:hover:enabled,
    textarea:focus:enabled {
      box-shadow: 0px 0px 0px 2px var(--color-error);
    }

    input:enabled + .label-wrapper label,
    input:focus:enabled + .label-wrapper label,
    textarea:enabled + .label-wrapper label,
    textarea:focus:enabled + .label-wrapper label {
      color: var(--color-error);
    }

    &::before {
      content: '!';
      height: 1.5rem;
      width: 1.5rem;
      border-radius: calc(1.5rem / 2);
      display: block;
      position: absolute;
      /* these position values attempts to play nice with password manager icon position */
      top: 0.55rem;
      right: 0.55rem;
      background: var(--color-error);
      color: var(--color-canvas);
      font-family: var(--fontSerifAlt);
      text-align: center;
      /* extra 0.2em on line height to center the exclamation vertically */
      line-height: calc(1.5rem + 0.2em);
      font-size: 0.85rem;
    }
  }
`
export const helperTextStyle = css`
  display: inline-block;
  position: absolute;
  /* Font size is added in to top position since we're calculating
  distance from the bottom of the text element. */
  bottom: calc((0.75rem + 0.5rem) * -1);
  left: 0.75rem;
  color: var(--color-textSecondary);
  font-family: var(--fontSansSerif);
  font-size: var(--fontSize075);
  line-height: 1;
`
export const errorMessageStyle = css`
  color: var(--color-error);

  &.inline-error {
    display: block;
    position: static;
    margin: 0.5rem 0 0 0.75rem;
  }
`
