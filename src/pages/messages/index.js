import Messages from 'containers/messages/messages'

export async function getStaticProps() {
  return { props: { namespacesRequired: ['common'] } }
}

export default Messages
