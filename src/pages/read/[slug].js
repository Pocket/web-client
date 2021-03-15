import Reader from 'containers/read/read'

export async function getServerSideProps(context) {
  return {
    props: { authRequired: true, namespacesRequired: ['common'] } // will be passed to the page component as props
  }
}

export default Reader
