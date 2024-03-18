import { css } from '@emotion/css'

export const buttonReset = css`
  input:focus,
  button:focus,
  select:focus {
    outline: 0;
  }
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: normal;
  text-align: inherit;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;
  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
  &:focus {
    outline: 1px auto var(--color-navCurrentTab);
  }
  &:hover {
    background: transparent;
  }
`
