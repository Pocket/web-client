import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { css, cx } from '@emotion/css'
import { Trans } from 'next-i18next'
import { DiscoverIcon } from 'components/icons/DiscoverIcon'
import { ListViewIcon } from 'components/icons/ListViewIcon'

export const DEFAULT_LINKS = [
  {
    name: 'discover',
    id: 'global-nav-discover-link',
    label: <Trans i18nKey="nav:discover">Discover</Trans>,
    url: 'https://getpocket.com/explore?src=navbar',
    icon: <DiscoverIcon />
  },
  {
    name: 'saves',
    id: 'global-nav-saves-link',
    label: <Trans i18nKey="nav:saves">Saves</Trans>,
    url: 'https://getpocket.com/saves?src=navbar',
    icon: <ListViewIcon />
  }
]

const listStyle = css`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  font-family: var(--fontSansSerif);
  font-size: var(--fontSize100);
  font-weight: 500;

  li {
    padding: 0;
    margin: 0;
  }

  a {
    display: inline-block;
    padding: 1.25rem;
    text-decoration: none;
    position: relative;

    &:focus {
      outline: 0;

      &::before {
        content: '';
        display: block;
        box-sizing: border-box;
        position: absolute;
        left: var(--spacing025);
        right: var(--spacing025);
        top: var(--spacing050);
        bottom: var(--spacing050);
        border: 2px solid var(--color-actionPrimary);
        border-radius: 4px;
      }
    }

    &:hover {
      &::before {
        display: none;
      }
    }

    &:active {
      color: var(--color-actionPrimaryHover);

      &::before {
        display: none;
      }
    }

    &.selected {
      &::after {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        left: 0.625rem;
        right: 0.625rem;
        height: 4px;
        background-color: var(--color-actionPrimary);
      }

      &:active::after {
        background-color: var(--color-actionPrimaryHover);
      }
    }
  }

  .beta {
    margin-left: 0.5rem;
  }
`

/**
 * Component to render navigational links in the GlobalNav. Accepts a list of links
 * to render so that links may be customized per page context.
 */
const GlobalNavLinks = ({
  links = DEFAULT_LINKS,
  selectedLink = null,
  onLinkClick = () => {},
  className,
  ...remaining
}) => {
  function handleClick(event, linkName, linkUrl) {
    onLinkClick(linkName, linkUrl)
  }

  return (
    <ul className={cx(listStyle, className)} {...remaining}>
      {links.map((link) => {
        const isSelected = link.name === selectedLink
        return (
          <li key={`global-nav-link-${link.name}`}>
            <Link
              href={link.url}
              id={link.id}
              data-testid={link.id}
              className={isSelected ? 'selected' : ''}
              onClick={(event) => {
                handleClick(event, link.name, link.url)
              }}>
              {link.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

GlobalNavLinks.propTypes = {
  /**
   * Links to display. Accepted as a prop so that links can be customized per page
   * context via the GlobalNav parent. Each link should have a name (id), label
   * (for display), and url. Each link will be rendered as an anchor in a list.
   */
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.node,
      url: PropTypes.string
    })
  ),

  /**
   * Name of a link that is selected, if any. Should match the name of one of the
   * links passed in with props. If a link matches this name, it will have an
   * "selected" style applied.
   */
  selectedLink: PropTypes.string,

  /**
   * Callback function called when any link is clicked. Gets passed the name and
   * url of that link.
   */
  onLinkClick: PropTypes.func
}

export default GlobalNavLinks
