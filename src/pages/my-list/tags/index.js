import TagsPage from 'containers/my-list/tags-page/tags-page'

export async function getStaticProps() {
  return { props: { authRequired: true, namespacesRequired: ['common'] } }
}

export default TagsPage
