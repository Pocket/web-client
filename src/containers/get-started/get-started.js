import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'

import { css } from 'linaria'
// import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const getStartedContainerStyle = css`
  max-width: 900px;
  margin: 0 auto;
  .button {
    font-family: var(--fontSansSerif);
    text-decoration: none;
    margin-left: 1rem;
  }
  .page-header {
    font-family: var(--fontSansSerif);
    font-style: normal;
    .title {
      font-weight: 600;
      font-size: 1.75rem;
      line-height: 1.825;
      margin: 0 0 10px 0;
    }
    .sub-head {
      font-weight: 400;
      font-size: 1rem;
      line-height: 1.5;
      margin: 0;
      display: flex;
      align-content: center;
      align-items: center;
      .icon {
        margin-top: 0;
        margin: 0 0.25rem;
      }
    }
  }
  .page-footer {
    margin-top: 3rem;
    padding: 1rem 0;
    border: var(--borderStyle);
    border-width: 1px 0 0;
    display: flex;
    justify-content: flex-end;
  }
`

export const GetStarted = () => {
  const router = useRouter()
  const userStatus = useSelector((state) => state.user.user_status)

  const featureState = useSelector((state) => state.features) || {}
  const settings = useSelector((state) => state.settings)
  const { settingsFetched, getStartedComplete = false } = settings

  const flagsReady = featureState.flagsReady
  const inGetStartedTest = featureFlagActive({ flag: 'getstarted', featureState })

  const experienceReady = flagsReady //&& !getStartedComplete

  const isReady = userStatus === 'valid'

  // Make sure we are all set on the user front
  if (!isReady) return null

  // Hold tight until flags are all set
  if (!experienceReady || !settingsFetched) return null

  // We are all set, but not in the get started test OR we already went through the test
  if (!inGetStartedTest || getStartedComplete) {
    router.replace('/home')
    return null
  }

  // We are all set and ready to take the tour
  router.push('/get-started/select-topics')

  return null
}

export default GetStarted
