// @refresh reset

import { useSelector } from 'react-redux'
import Layout from 'layouts/with-sidebar'
import { SideNav } from 'components/side-nav/side-nav'

export default function TagsPage(props) {
  const { metaData = {}, subset = 'active', filter } = props

  const isLoggedIn = useSelector((state) => !!state.user.auth)
  const userStatus = useSelector((state) => state.user.user_status)

  const shouldRender = userStatus !== 'pending'
  return (
    <Layout title={metaData.title} metaData={metaData}>
      <SideNav subset={subset} isLoggedIn={isLoggedIn} />

      {shouldRender ? <main className="main">TAGS FOR THE WIN!!</main> : null}
    </Layout>
  )
}
