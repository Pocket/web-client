import Main from 'containers/home/home'

export async function getStaticProps() {
  return { props: { namespacesRequired: ['common'] } }
}

export default Main
