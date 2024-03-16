import PropTypes from 'prop-types'
import Link from 'next/link'
import { css } from '@emotion/css'

const BylineWrapper = css`
  font-family: var(--fontSansSerif);
  font-style: normal;
  display: block;
  line-height: 143%;
  color: var(--textPrimary);
  margin-bottom: var(--spacing150);

  a {
    font-weight: 600;
    text-decoration: none;
    color: var(--textPrimary);
    font-size: 0.875em;

    &:hover {
      color: var(--color-actionPrimary);
    }
    &:active {
      color: var(--color-actionPrimaryHover);
    }
  }

  ul:before {
    content: '|';
    padding: 0 10px;
    font-size: 0.875em;
  }
  ul {
    font-size: var(--fontSize100);
    list-style: none;
    padding: 0;
  }
  ul,
  li {
    display: inline;
  }
  li {
    font-size: 0.875em;
  }
  li:after {
    content: ', ';
  }
  li:last-child:after {
    content: none;
  }
  li:last-child:before {
    content: 'and ';
  }
  li:nth-last-child(2):after {
    content: ' ';
  }
  li:first-child:before {
    content: none;
  }
`

function Authors({ authors }) {
  return (
    <ul>
      {authors.map((author) => (
        <li key={`author-byline-${author}`} itemProp="author" data-testid="author">
          {author}
        </li>
      ))}
    </ul>
  )
}

/**
 * `url`, `name`, and `authorNames` are required props for this component.
 * `authorNames` must be passed in as an Array
 *
 * `showAuthors` is a bool that defines whether to display the author list alongside
 * the publisher. This value is set in the curation tool.
 */
function AuthorByline({ url, name, showAuthors, authorNames }) {
  return (
    <cite className={BylineWrapper}>
      <Link href={url} data-testid="author-url">
        {name}
      </Link>
      {showAuthors ? <Authors authors={authorNames} /> : null}
    </cite>
  )
}

AuthorByline.propTypes = {
  /**
   * Url links to the publisher's website
   */
  url: PropTypes.string.isRequired,
  /**
   * Name of the publisher
   */
  name: PropTypes.string.isRequired,
  /**
   * Array of the list of authors
   */
  authorNames: PropTypes.array.isRequired,
  /**
   * Determines whether to show or hide the list of authors
   */
  showAuthors: PropTypes.bool
}

export { AuthorByline }
