import Reader from 'containers/read/read'

Reader.getInitialProps = async ({ query }) => {
  const { slug } = query

  return {
    namespacesRequired: ['common'],
    appRootSelector: '#__next',
    itemId: slug
  }
}

export default Reader
