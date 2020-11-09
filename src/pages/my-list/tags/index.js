import TagsPage from 'containers/tags-page/tags-page'

export async function getStaticProps() {
  return { props: { namespacesRequired: ['common'] } }
}

export default TagsPage
