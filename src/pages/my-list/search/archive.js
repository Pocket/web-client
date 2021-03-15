import SearchPage from 'containers/my-list/search-page/search-page'

export async function getStaticProps() {
  return {
    props: {
      authRequired: true,
      namespacesRequired: ['common'],
      filter: 'archive'
    }
  }
}

export default SearchPage
