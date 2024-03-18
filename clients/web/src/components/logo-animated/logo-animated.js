import { css, cx } from '@emotion/css'
import { SaveFilledIcon } from '@ui/icons/SaveFilledIcon'

const logoWrapper = css`
  display: inline-block;
  position: relative;
  padding-top: 50px;
  color: var(--color-actionBrand);
  .save-icon {
    height: 22px;
    width: 22px;
  }
`
const triangle = css`
  position: absolute;
`
const tr1 = css`
  path {
    fill: #ef4056;
  }
  transform: translate(7px, -53px);
`
const tr2 = css`
  path {
    fill: #fcb643;
  }
  transform: translate(6px, -35px) rotate(-35deg);
`
const square = css`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 1px;
`
const sq1 = css`
  background-color: #1cb0a8;
  transform: translate(-12px, -31px);
  svg {
    background-color: red;
  }
`
const sq2 = css`
  background-color: #5fcf97;
  transform: translate(20px, -18px) rotate(-15deg);
`
const circle = css`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
`
const ci1 = css`
  background-color: #1eabf9;
  transform: translate(27px, -35px);
`
const ci2 = css`
  background-color: #a240ef;
  transform: translate(-5px, -15px);
`
const svg_triangle =
  'M3.0986 1.30323C3.68831 0.808408 4.59253 1.13752 4.7262 1.89562L5.17103 4.41839C5.30471 5.1765 4.56758 5.79502 3.84421 5.53173L1.43701 4.65558C0.71363 4.3923 0.546536 3.44467 1.13624 2.94985L3.0986 1.30323Z'

export const LogoAnimated = () => (
  <div className={logoWrapper}>
    <div className={cx(triangle, tr1)}>
      <svg width="7" height="6" viewBox="0 0 7 6">
        <path d={svg_triangle} />
      </svg>
    </div>
    <div className={cx(triangle, tr2)}>
      <svg width="7" height="6" viewBox="0 0 7 6">
        <path d={svg_triangle} />
      </svg>
    </div>
    <div className={cx(square, sq1)} />
    <div className={cx(square, sq2)} />
    <div className={cx(circle, ci1)} />
    <div className={cx(circle, ci2)} />
    <SaveFilledIcon className="save-icon" />
  </div>
)
