import Layout from 'layouts/main'
import { useSelector } from 'react-redux'
import { HomeRecentSaves } from 'containers/home/recent-saves/recent-saves'
import { HomeContent } from './content'
import { SuccessFXA } from 'components/snackbar/success-fxa'
import { HomeSetup } from './setup/setup'
import { HomeGreeting } from './recent-saves/greeting'


export const Home = ({ metaData }) => {
  const userStatus = useSelector((state) => state.user.user_status)
  const shouldRender = userStatus !== 'pending'
  if (!shouldRender) return null

  return (
    <Layout metaData={metaData} isFullWidthLayout={true} noContainer={true}>
      <SuccessFXA type="home" />

      <HomeSetup />
      <HomeGreeting />
      <HomeRecentSaves />
      <HomeContent />
    </Layout>
  )
}
