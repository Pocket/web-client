import { css, cx } from 'linaria'
import { overlayBase } from './overlay'
import { Button } from 'components/buttons/button'

export default {
  title: 'Overlays/Base'
}

const overlayExample = css`
  padding: 20px;
  display: inline-block;
`

const OverlayExample = () => (
  <div className={cx(overlayExample, overlayBase)}>
    <h3>Overlay Example 😎👉👉</h3>
    <p>
      Hydrogen atoms network of wormholes dream of the mind’s eye culture consciousness corpus
      callosum? The carbon in our apple pies preserve and cherish that pale blue dot star stuff
      harvesting star light citizens of distant epochs Sea of Tranquility stirred by starlight?
    </p>
    <Button variant="primary">Continue</Button>
  </div>
)

export const normal = () => <OverlayExample />
