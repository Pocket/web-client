import React from 'react'
import { css } from 'linaria'
import { underliner } from './underliner'

const underlineHeadingContainer = css`
  max-width: 400px;
  a {
    font-family: 'Graphik Web';
    font-weight: 600;
    padding: var(--size100) 0 0;
    display: block;
    text-decoration: none;

    .title {
      margin: 0;
    }
    .title span {
      ${underliner};
    }

    &:hover {
      color: var(--color-textPrimary);
      .title span {
        transition: background-color 300ms ease-in-out;
        background-color: var(--color-textPrimary);
      }
    }
  }
`
const UnderlineHeadings = () => {
  return (
    <div className={underlineHeadingContainer}>
      <a href="#">
        <h1 className="title">
          <span>
            Pack my box; I need five dozen liquor jugs. Only go when the quick
            brown fox jumps over the lazy brown dog.
          </span>
        </h1>
      </a>
      <a href="#">
        <h2 className="title">
          <span>
            Pack my box; I need five dozen liquor jugs. Only go when the quick
            brown fox jumps over the lazy brown dog.
          </span>
        </h2>
      </a>
      <a href="#">
        <h3 className="title">
          <span>
            Pack my box; I need five dozen liquor jugs. Only go when the quick
            brown fox jumps over the lazy brown dog.
          </span>
        </h3>
      </a>
      <a href="#">
        <h4 className="title">
          <span>
            Pack my box; I need five dozen liquor jugs. Only go when the quick
            brown fox jumps over the lazy brown dog.
          </span>
        </h4>
      </a>
      <a href="#">
        <h5 className="title">
          <span>
            Pack my box; I need five dozen liquor jugs. Only go when the quick
            brown fox jumps over the lazy brown dog.
          </span>
        </h5>
      </a>
      <a href="#">
        <h6 className="title">
          <span>
            Pack my box; I need five dozen liquor jugs. Only go when the quick
            brown fox jumps over the lazy brown dog.
          </span>
        </h6>
      </a>
    </div>
  )
}

export default {
  title: 'Components/Underliner'
}

export const Headings = () => {
  return <UnderlineHeadings />
}
