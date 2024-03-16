import { CallOutStartLibrary } from './call-out-start-library'
import { CallOutStartLibraryExplore } from './call-out-start-library'

import { css } from '@emotion/css'

export default {
  title: 'Messaging/Start Library',
  component: CallOutStartLibrary
}

const storyWrapper = css`
  padding: 0 48px;
`

export const standard = () => {
  return (
    <div className={storyWrapper}>
      <CallOutStartLibrary onVisible={() => {}} />
    </div>
  )
}

export const ExplorePosition = () => {
  return <CallOutStartLibraryExplore handleImpression={() => {}} />
}
