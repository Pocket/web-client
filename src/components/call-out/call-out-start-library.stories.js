import {
  CallOutStartLibrary,
  CallOutStartLibraryExplore
} from './call-out-start-library'
import { css } from 'linaria'

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
      <CallOutStartLibrary />
    </div>
  )
}

export const ExplorePosition = () => {
  return <CallOutStartLibraryExplore />
}
