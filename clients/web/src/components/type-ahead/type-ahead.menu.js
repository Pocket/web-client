import { css } from '@emotion/css'

export const typeAheadWrapper = css`
  max-height: 7rem;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid #ccc;
  outline: 0;
  transition: opacity 0.1s ease;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  box-sizing: border-box;
  position: absolute;
  left: 0;
  padding: 0.5rem 0;
  width: 100%;
  z-index: var(--zIndexTooltip);
  background-color: var(--color-popoverCanvas);
  &::-webkit-scrollbar {
    display: none;
  }
`

export const TypeAheadMenu = ({ children }) => <div className={typeAheadWrapper}>{children}</div>
