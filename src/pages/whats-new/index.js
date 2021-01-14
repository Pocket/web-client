import WhatsNew from 'containers/whats-new/whats-new'

export async function getStaticProps() {
  return { props: { namespacesRequired: ['common'] } }
}

export default WhatsNew
