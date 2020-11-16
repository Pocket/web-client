import TagsPage from 'containers/my-list/tags-page/tags-page'

export async function getStaticProps() {
  return { props: { namespacesRequired: ['common'] } }
}

export default TagsPage
