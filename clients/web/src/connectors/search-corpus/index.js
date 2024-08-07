import style from './style.module.css'
import { useTranslation } from 'next-i18next'
import { useRef, useState } from 'react'
import { useRouter } from 'next/router'

export function SearchCorpus({ query = '' }) {
  const [searchQuery, setSearchQuery] = useState(query)
  const searchRef = useRef(null)
  const router = useRouter()
  const { t } = useTranslation()

  // We will get sanitization on storage, and we don't execute this query client side. The body
  // Get's JSON stringified in the request
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      router.push(`/search?q=${searchQuery}`)
    }
  }

  // For when we add a button
  // const handleSearchSubmit = () => {
  //   router.push(`/search?q=${searchQuery}`)
  // }

  return (
    <div className={style.base} data-testid="home-section-search">
      <div className={style.searchBox}>
        <input
          ref={searchRef}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          type="search"
          placeholder={t('home:search-placeholder', 'What can we help you find?')}
        />
      </div>
    </div>
  )
}
