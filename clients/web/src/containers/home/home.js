import style from './style.module.css'

import Layout from 'layouts/main'
import { useSelector } from 'react-redux'
import { HomeRecentSaves } from 'containers/home/recent-saves/recent-saves'
import { HomeSetup } from './setup/setup'
import { HomeContent } from './content'
import { SuccessFXA } from 'components/snackbar/success-fxa'
import { HomeGreeting } from './recent-saves/greeting'
import { SharedItemInterstitial } from './sharedItem/sharedItem'
import { Toasts } from 'connectors/toasts/toast-list'

export const Home = ({ metaData }) => {
  const userStatus = useSelector((state) => state.user.user_status)
  const isAuthenticated = useSelector((state) => state.user.auth)

  const shouldRender = userStatus !== 'pending'

  return (
    <Layout
      metaData={metaData}
      isFullWidthLayout={true}
      noContainer={true}
      className={style.spacer}>
      {!shouldRender ? null : (
        <>
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
