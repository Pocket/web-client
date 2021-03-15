import MyList from 'containers/my-list/my-list'

export async function getStaticProps() {
  return {
    props: {
      authRequired: true,
      namespacesRequired: ['common'],
      subset: 'favorites'
    }
  }
}

export default MyList
