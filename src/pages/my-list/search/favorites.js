import SearchPage from 'containers/my-list/search-page/search-page'

export async function getStaticProps() {
  return {
    props: {
      namespacesRequired: ['common'],
      filter: 'favorites'
    }
  }
}

export default SearchPage
