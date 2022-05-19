import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { css, cx } from 'linaria'

const buttonStyles = css`
  display: inline-block;
  position: relative;
  font-family: var(--fontSansSerif);
  font-size: 1rem;
  line-height: 110%;
  border: none;
  border-radius: 0.25rem;
  padding: 0.75rem;
  transition: all 0.15s ease-out;
  text-decoration: none;
  cursor: pointer;

  &.disabled {
    pointer-events: none;
    cursor: default;
    opacity: 0.5;
  }

  &:focus {
    outline: none;

    &::before {
      content: '';
      position: absolute;
      border: 2px solid var(--color-actionFocus);
      top: -4px;
      bottom: -4px;
      left: -4px;
      right: -4px;
      border-radius: 0.5rem;
    }
  }

  &:hover {
    text-decoration: none;

    &::before {
      display: none;
    }
  }

  &:active {
    &::before {
      display: none;
    }
  }

  &.primary {
    background-color: var(--color-actionPrimary);
    color: var(--color-actionPrimaryText);

    &:hover {
      background-color: var(--color-actionPrimaryHover);
    }
  }

  &.secondary {
    background: none;
    border: 2px solid var(--color-actionSecondary);
    color: var(--color-actionSecondaryText);

    &:focus {
      &::before {
        /* offsets adjusted for space taken by outline */
        top: -6px;
        bottom: -6px;
        left: -6px;
        right: -6px;
      }
    }
    &:hover {
      background-color: var(--color-actionSecondaryHover);
      color: var(--color-actionSecondaryHoverText);
    }
  }

  &.emphasized,
  &.brand {
    background-color: var(--color-actionBrand);
    color: var(--color-actionBrandText);

    &:hover {
      background-color: var(--color-actionBrandHover);
    }

    &:active {
      background-color: var(--color-actionBrandHover);
    }
  }

  &.inline {
    display: inline;
    background: none;
    padding: 0;
    color: var(--color-textPrimary);
    text-decoration: underline;
    font-family: inherit;
    font-size: inherit;

    &:focus {
      outline: inherit;

      &::before {
        display: none;
      }
    }

    &:hover {
      color: var(--color-textLinkHover);
    }
  }

  &.large {
    font-size: 1.25rem;
    padding: 100rem;
  }

  &.small {
    font-size: 0.85rem;
    padding: 0.75rem;
  }
`

/**
 * The standard button component. Provides a few different stylistic treatments
 * per design standards. By default, returns a `<button>` element, but if an `href`
 * value is passed in as a prop, the element will be an anchor/link pointing
 * to that url.
 *
 * return (
 *  <div>
 *    <Button onClick={myCallback}>I am a button. I call myCallback when clicked.</Button>
 *    <Button href="http://google.com">I link to Google</Button>
 *  </div>
 * )
 * ```
 */
export const Button = forwardRef(function Button(
  { children, variant = 'primary', size, href, disabled, className: passedClassName, ...remaining },
  ref
) {
  const className = cx(buttonStyles, passedClassName, variant, size, disabled && 'disabled')
  const elementProps = { className, href, disabled, ref, ...remaining }

  // If an href is passed, element should be an anchor (hyperlink)
  if (href) return <a {...elementProps}>{children}</a>

  // It's a button
  return <button {...elementProps}>{children}</button>
})

Button.propTypes = {
  // Content of the button (e.g. button label)
  children: PropTypes.node.isRequired,
  // Visual variant of the button, from design standards
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'brand', 'emphasized', 'inline']),
  // Size of the button
  size: PropTypes.oneOf(['normal', 'large', 'small']),
  // Destination url for the button - if provided, will render the button as an anchor styled like a button
  href: PropTypes.string,
  // CSS class name if styles need to be provided/overridden.
  className: PropTypes.string
}

Button.defaultProps = {
  variant: 'primary',
  size: 'normal',
  href: undefined,
  className: null
}
