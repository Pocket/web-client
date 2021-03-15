import WhatsNew from 'containers/whats-new/whats-new'

export async function getStaticProps() {
  return { props: { authRequired: true, namespacesRequired: ['common'] } }
}

export default WhatsNew
