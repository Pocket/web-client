import Messages from 'containers/messages/messages'

export async function getStaticProps() {
  return { props: { authRequired: true, namespacesRequired: ['common'] } }
}

export default Messages
