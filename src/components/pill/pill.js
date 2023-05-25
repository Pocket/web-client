import React from 'react'
import PropTypes from 'prop-types'
import { css, cx } from '@emotion/css'

const pillStyle = css`
  display: inline-block;
  padding: 1rem 0.8rem;
  background: none;
  color: var(--color-textPrimary);
  font-size: var(--fontSize085);
  font-family: var(--fontSansSerif);
  font-weight: 500;
  line-height: 1;
  text-decoration: none;
  border: 1px solid var(--color-dividerTertiary);
  border-radius: 8px;
  transition: all 0.15s ease-out;
  transition-property: border, color, background;

  &:hover {
    border-color: var(--color-actionPrimaryHover);
    background: var(--color-actionPrimarySubdued);
    color: var(--color-actionPrimaryHover);
    text-decoration: none;

    .colormode-dark & {
      border-color: var(--color-textLinkHover);
      color: var(--color-textLinkHover);
      background: none;
    }
  }

  &.promoted {
    color: var(--color-actionBrandHover);

    &:hover {
      background: var(--color-actionBrandSubdued);
      border-color: var(--color-actionBrandHover);
    }

    .colormode-dark & {
      color: var(--color-actionBrand);

      &:hover {
        border-color: var(--color-actionBrand);
        background: none;
      }
    }
  }
`
/**
 * A pill component for rendering things like clickable lists of topics or categories.
 * Pass in an `onClick` callback and handle the click yourself, or pass in an `href`
 * value and the pill will become a link to that url.
 */

export const Pill = ({ promoted = false, children, href, className, ...remaining }) => {
  const elementProps = {
    className: cx(pillStyle, className && className, promoted && 'promoted'),
    href,
    ...remaining
  } // if an href is passed, element should be an anchor (hyperlink)

  if (href) {
    return <a {...elementProps}>{children}</a> // if no href, this is a button element
  } else {
    return <button {...elementProps}>{children}</button>
  }
}

Pill.propTypes = {
  /**
   * Content of the button (e.g. button label)
   */
  children: PropTypes.node.isRequired,

  /**
   * If true, will apply a visual style that differentiates the pill from the others.
   */
  promoted: PropTypes.bool,

  /**
   * Destination url for the button - if provided, will render the button as
   * an anchor styled like a button
   */
  href: PropTypes.string,

  /**
   * CSS class name if styles need to be provided/overridden.
   */
  className: PropTypes.string
}
