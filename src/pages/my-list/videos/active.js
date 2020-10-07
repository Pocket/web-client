import MyList from 'containers/my-list/my-list'

export async function getStaticProps() {
  return {
    props: {
      namespacesRequired: ['common'],
      subset: 'videos',
      filter: 'active'
    }
  }
}

export default MyList
