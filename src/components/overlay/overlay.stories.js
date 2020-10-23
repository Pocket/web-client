import { css } from 'linaria'
import classNames from 'classnames'
import { overlayBase } from './overlay'
import { Button } from '@pocket/web-ui'

export default {
  title: 'Components/OverlayBase'
}

const overlayExample = css`
  padding: 20px;
  display: inline-block;
`

const OverlayExample = () => (
  <div className={classNames(overlayExample, overlayBase)}>
    <h3>Overlay Example 😎👉👉</h3>
    <p>
      Hydrogen atoms network of wormholes dream of the mind's eye culture
      consciousness corpus callosum? The carbon in our apple pies preserve and
      cherish that pale blue dot star stuff harvesting star light citizens of
      distant epochs Sea of Tranquility stirred by starlight?
    </p>
    <Button variant="primary">Continue</Button>
  </div>
)

export const normal = () => <OverlayExample />
