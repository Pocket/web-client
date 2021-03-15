import Main from 'containers/home/home'

export async function getStaticProps() {
  return { props: { authRequired: true, namespacesRequired: ['common'] } }
}

export default Main
