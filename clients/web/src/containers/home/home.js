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
  if (isAuthenticated) {
    const shouldRender = isAuthenticated && userStatus !== 'pending'
    if (!shouldRender) return null
  }

  return (
    <Layout metaData={metaData} isFullWidthLayout={true} noContainer={true}>
      {isAuthenticated ? <SuccessFXA type="home" /> : null}
      {isAuthenticated ? <HomeSetup /> : null}
      <HomeGreeting />
      {isAuthenticated ? <HomeRecentSaves /> : null}
      <HomeContent />
      <SharedItemInterstitial />
      <Toasts surface="home" />
    </Layout>
  )
}
