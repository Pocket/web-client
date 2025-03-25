import Layout from 'layouts/main'
import { Toasts } from 'connectors/toasts/toast-list'
import { SearchSaves } from './saves/index.js'

export const Search = ({ query, locale, filter }) => {
  return (
    <Layout>
      <SearchSaves query={query} locale={locale} filter={filter} />
      <Toasts />
    </Layout>
  )
}
