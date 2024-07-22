import style from './style.module.css'
import { SectionWrapper } from 'components/section-wrapper/section-wrapper'
import { useTranslation } from 'next-i18next'
import { useRef, useState } from 'react'
import { useRouter } from 'next/router'

export function SearchCorpus() {
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef(null)
  const router = useRouter()
  const { t } = useTranslation()

  /* DO NOT PUSH WITHOUT SANITIZATION */
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      router.push(`/search?q=${searchQuery}`)
    }
  }

  const handleSearchSubmit = () => {
    router.push(`/search?q=${searchQuery}`)
  }

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
