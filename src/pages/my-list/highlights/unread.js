import MyList from 'containers/my-list/my-list'

export async function getStaticProps() {
  return {
    props: {
      namespacesRequired: ['common'],
      subset: 'highlights',
      filter: 'unread'
    }
  }
}

export default MyList
