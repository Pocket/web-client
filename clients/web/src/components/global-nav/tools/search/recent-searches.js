import { css } from '@emotion/css'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { breakpointMediumHandset } from 'common/constants'
import Link from 'next/link'

const recentSearchStyle = css`
  width: 100%;
  margin-right: var(--spacing050);
  position: relative;
  position: absolute;
  width: 100%;
  top: 100%;
  left: 0;
  padding: 0.5em 0 1em;
  background-color: var(--color-canvas);
  color: var(--color-primary);
  border: var(--borderStyle);
  border-radius: 0 0 var(--borderRadius) var(--borderRadius);
  box-shadow: var(--raisedCanvas);
  border-top: 0;
  margin-top: -1px;

  ${breakpointMediumHandset} {
    padding-right: 0;
  }

  .title {
    font-size: var(--fontSize085);
    margin-bottom: 0;
    color: var(--color-textSecondary);
    font-weight: 400;
    padding: 1rem 0.75rem 0.75rem;
    text-transform: uppercase;
  }

  a {
    width: 100%;
    display: block;
    padding: 0 0.75rem;
    cursor: pointer;
    font-size: 1rem;
    text-decoration: none;
    border: 1px solid transparent;
    border-width: 1px 0;
    &:focus {
      outline: none;
      background: var(--color-actionPrimarySubdued);
      border-color: var(--color-actionPrimary);
    }
  }
`

export function RecentSearches({ searchTerms = [], isFocused }) {
  const { t } = useTranslation()
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const showModule = (isFocused || isHovered) && searchTerms.length

  return showModule ? (
    <div
      className={recentSearchStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <h4 className="title">{t('search:recent-searches', 'Recent Searches')}</h4>

      {searchTerms.map((search) => (
        <div key={search}>
          <Link href={`/saves/search?query=${encodeURIComponent(search)}`} tabIndex={0}>
            {search}
          </Link>
        </div>
      ))}
    </div>
  ) : null
}
