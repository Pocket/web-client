import { css, cx } from '@emotion/css'

const logoDarkImg =
  'https://assets.getpocket.com/web-ui/assets/pocket-logo-dark-mode.a24d9ec3c81b642354a61fe27ae9edfb.svg'
const logoLightImg =
  'https://assets.getpocket.com/web-ui/assets/pocket-logo-light-mode.9a20614bbcbaf69b221df81a80daa73d.svg'
const logoMarkImg =
  'https://assets.getpocket.com/web-ui/assets/pocket-logo-mark.dd8dec213208a4fbf2bff946d112aec3.svg'

const logoStyle = css`
  background: no-repeat url(${logoLightImg});
  background-size: contain;
  width: 94px;
  height: 24px;

  .colormode-dark & {
    background-image: url(${logoDarkImg});
  }
`
const logoMarkStyle = css`
  background: no-repeat url(${logoMarkImg});
  background-size: contain;
  width: 24px;
  height: 24px;
`

const logoLabelStyle = css`
  border: 0;
  clip-path: polygon(0px 0px, 0px 0px, 0px 0px);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
`
const Logo = ({ className }) => {
  return (
    <div className={cx(logoStyle, className)}>
      <span className={logoLabelStyle}>Pocket</span>
    </div>
  )
}

const LogoMark = ({ className }) => {
  return (
    <div className={cx(logoMarkStyle, className)}>
      <span className={logoLabelStyle}>Pocket</span>
    </div>
  )
}

export { LogoMark, Logo }
