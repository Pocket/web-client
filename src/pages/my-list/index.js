import MyList from 'containers/my-list/my-list'

MyList.getInitialProps = async () => {
  return { namespacesRequired: ['common'] }
}

export default MyList
