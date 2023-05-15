import { css } from '@emotion/css'
import { PocketHitsIllustratedChyron } from './pocket-hits-illustrated-chyron'

export default {
  title: 'Pocket Hits/Illustrated Chyron',
  component: PocketHitsIllustratedChyron
}

const FullScreen = css`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

export const normal = () => (
  <div className={FullScreen}>
    <PocketHitsIllustratedChyron />
  </div>
)

export const isProcessing = () => (
  <div className={FullScreen}>
    <PocketHitsIllustratedChyron isProcessing />
  </div>
)

export const success = () => (
  <div className={FullScreen}>
    <PocketHitsIllustratedChyron isSuccessful />
  </div>
)
