import Layout from 'layouts/main'
import { Toasts } from 'connectors/toasts/toast-list'
import { SearchCorpus } from './corpus/index.js'
import { SearchSaves } from './saves/index.js'

import { useSelector } from 'react-redux'

export const Search = ({ query, locale, searchType, filter }) => {
  const appMode = useSelector((state) => state.app.mode)
  const searchTypeFromAppMode = appMode === 'discovery' ? 'all' : 'saves'
  const pageToShow = searchType ? searchType : searchTypeFromAppMode

  const disallowCorpusSearch = ['es', 'es-ES'].includes(locale)
  return (
    <Layout>
      {pageToShow === 'all' && !disallowCorpusSearch ? (
        <SearchCorpus query={query} locale={locale} />
      ) : (
        <SearchSaves query={query} locale={locale} filter={filter} />
      )}
      <Toasts />
    </Layout>
  )
}
