import Discover from 'containers/discover/discover'

Discover.getInitialProps = async () => {
  return { namespacesRequired: ['common'] }
}

export default Discover
