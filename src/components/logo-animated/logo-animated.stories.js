import { LogoAnimated } from './logo-animated'
import { css } from 'linaria'

export default {
  title: 'Components/LogoAnimated'
}

const logoWrapper = css`
  margin: 50px;
  display: inline-block;
`

export const normal = () => <div className={logoWrapper}><LogoAnimated /></div>
