import MyList from 'containers/my-list/my-list'

export async function getServerSideProps(context) {
  return {
    props: { authRequired: true, namespacesRequired: ['common'] } // will be passed to the page component as props
  }
}

export default MyList
