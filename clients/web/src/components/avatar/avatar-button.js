import React from 'react'
import PropTypes from 'prop-types'
import { css, cx } from '@emotion/css'

import Avatar from './avatar'

const buttonStyles = css`
  background: var(--color-actionPrimarySubdued);
  border-radius: 50%;
  margin: 0;
  padding: 0;
  color: var(--color-textPrimary);
  position: relative;

  span.default {
    transition: all 0.1s ease-out;
  }

  span.with-image {
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      transition: all 0.1s ease-out;
      opacity: 0;
    }
  }

  &:focus {
    outline: none;
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: -4px;
      bottom: -4px;
      left: -4px;
      right: -4px;
      border-radius: 50%;
      border: 2px solid var(--color-actionPrimary);
    }
  }

  &:hover {
    background: none;

    & span.default {
      color: var(--color-textLinkHover);
    }

    & span.with-image {
      &::after {
        background-color: var(--color-actionPrimary);
        opacity: 0.38;
      }
    }
  }

  &:active {
    & span.default {
      color: var(--color-textLinkPressed);
    }

    & span.with-image {
      &::after {
        background-color: var(--color-actionPrimaryHover);
        opacity: 38%;
      }
    }
  }
`

/**
 * Component that wraps the avatar component in a <button> and handles the interaction
 * styles of that button.
 */
// eslint-disable-next-line react/display-name
export const AvatarButton = React.forwardRef(
  (
    { id = '', label = '', src = null, onClick = () => {}, className = null, size, ...rest },
    ref
  ) => {
    return (
      <button
        type="button"
        className={cx(buttonStyles, className && className)}
        title={label}
        onClick={onClick}
        {...rest}
        ref={ref}>
        <Avatar size={size} src={src} altText={label} data-testid={`avatar-button-avatar-${id}`} />
      </button>
    )
  }
)

AvatarButton.propTypes = {
  /**
   * Width/height of the avatar. Since the avatar will be square, this value is
   * both width and height.
   */
  size: PropTypes.string.isRequired,

  /**
   * Alt text to include as the button label of the Avatar for non-sighted users
   */
  label: PropTypes.string,

  /**
   * Provide an id if you have multiple instances per page and need unique
   * identifiers for tests.
   */
  id: PropTypes.string,

  /**
   * The src/url for the avatar image
   */
  src: PropTypes.string,

  /**
   * Callback called when the button is clicked.
   */
  onClick: PropTypes.func,

  /**
   * Classname to be applied to the outer node that can be used to override
   * or supplement styles.
   */
  className: PropTypes.string
}
