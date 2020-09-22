import Main from 'containers/home/home'

Main.getInitialProps = async () => {
  return { namespacesRequired: ['save-to-pocket'] }
}

export default Main
