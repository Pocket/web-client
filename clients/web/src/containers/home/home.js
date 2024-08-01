import style from './style.module.css'

import Layout from 'layouts/main'
import { useSelector } from 'react-redux'
import { HomeRecentSaves } from 'containers/home/recent-saves/recent-saves'
import { HomeSetup } from './setup/setup'
import { HomeContent } from './content'
import { SuccessFXA } from 'components/snackbar/success-fxa'
import { HomeSignUpCTA } from './sign-up-cta'
import { SearchCorpus } from '../../connectors/search-corpus'
import { HomeGreeting } from './recent-saves/greeting'
import { SharedItemInterstitial } from './sharedItem/sharedItem'
import { Toasts } from 'connectors/toasts/toast-list'
import { SectionWrapper } from 'components/section-wrapper/section-wrapper'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'

export const Home = ({ metaData }) => {
  const userStatus = useSelector((state) => state.user.user_status)
  const isAuthenticated = useSelector((state) => state.user.auth)
  const featureState = useSelector((state) => state.features) || {}

  const featureSearch = featureFlagActive({ flag: 'corpus.search', featureState })
  const flagsReady = featureState.flagsReady
  const showSearch = featureSearch && flagsReady

  const shouldRender = userStatus !== 'pending'

  return (
    <Layout
      metaData={metaData}
      isFullWidthLayout={true}
      noContainer={true}
      className={style.spacer}>
      {showSearch ? (
        <SectionWrapper className={`${style.search}`}>
          <SearchCorpus />
        </SectionWrapper>
      ) : null}

      {!shouldRender ? null : (
        <>
          {isAuthenticated ? null : <HomeSignUpCTA topBorder={showSearch} />}

          {isAuthenticated ? (
            <>
              <SuccessFXA type="home" />
              <HomeSetup />
              <HomeGreeting />
            </>
          ) : null}

          {isAuthenticated ? <HomeRecentSaves /> : null}

          <SharedItemInterstitial />
        </>
      )}
      <HomeContent />
      <Toasts surface="home" />
    </Layout>
  )
}
