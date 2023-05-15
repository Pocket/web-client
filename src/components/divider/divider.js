import { css } from '@emotion/css'

const divideVerticalStyles = css`
  width: 1px;
  height: 24px;
  background-color: var(--color-dividerSecondary);
`
export const DivideVertical = () => <div className={divideVerticalStyles} />

const divideHorizontalStyles = css`
  height: 1px;
  background-color: var(--color-dividerSecondary);
`
export const DivideHorizontal = ({ margin }) => (
  <div className={divideHorizontalStyles} style={{ margin }} />
)

const divideDotWrapper = css`
  padding: 0 5px;
  font-size: 0.5em;
`
export const DivideDot = () => <span className={divideDotWrapper}>•</span>
