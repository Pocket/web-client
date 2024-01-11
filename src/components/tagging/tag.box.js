import { css } from '@emotion/css'

export const tagWrapper = css`
  font-size: 12px;
  border-radius: 4px;
  display: block;
  border: 1px solid var(--color-formFieldBorder);
  padding: 0.7em 0.7em 0;
  min-height: 2em;
  width: 100%;
  position: relative;
`

export function TagBox({ children, onClick = () => {} }) {
  return (
    <div className={tagWrapper} onClick={onClick}>
      {children}
    </div>
  )
}
