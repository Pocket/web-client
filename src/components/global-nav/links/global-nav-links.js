import React from 'react'
import PropTypes from 'prop-types'
import { css, cx } from 'linaria'
import { Trans } from 'react-i18next'

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
`

/**
 * Component to render navigational links in the GlobalNav. Accepts a list of links
 * to render so that links may be customized per page context.
 */
const GlobalNavLinks = ({
  links,
  selectedLink,
  onLinkClick,
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
            <a
              id={link.id}
              className={isSelected ? 'selected' : ''}
              href={link.url}
              onClick={(event) => {
                handleClick(event, link.name, link.url)
              }}>
              {link.label}
            </a>
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
      label: PropTypes.string,
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

GlobalNavLinks.defaultProps = {
  links: [
    {
      name: 'discover',
      id: 'discover',
      label: <Trans i18nKey="discover">Discover</Trans>,
      url: 'https://getpocket.com/explore?src=navbar'
    },
    {
      name: 'my-list',
      id: 'my-list',
      label: <Trans i18nKey="my-list">My List</Trans>,
      url: 'https://app.getpocket.com?src=navbar'
    }
  ],
  selectedLink: null,
  onLinkClick(event, linkName, linkUrl) {}
}

export default GlobalNavLinks
