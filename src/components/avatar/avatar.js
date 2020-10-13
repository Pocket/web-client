import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { css } from 'linaria'
import { testIdAttribute } from '@pocket/web-utilities/test-utils'

import { darkMode } from '@pocket/web-ui'
import { ProfileIcon } from '@pocket/web-ui'

const avatarStyle = css`
  display: block;
  overflow: hidden;
  border-radius: 50%;
  position: relative;

  &.with-image {
    &::before {
      content: '';
      display: block;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.12);
    }
  }

  &.default {
    background: var(--color-actionPrimarySubdued);
  }

  ${darkMode} {
    &.with-image {
      &::before {
        border: 1px solid rgba(255, 255, 255, 0.12);
      }
    }
  }
`

const imageStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  color: transparent;
`

const defaultStyle = css`
  height: 60%;
  position: absolute;
  margin-top: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

/**
 * Component to display an avatar image by `src`. Defaults to an icon if no `src`
 * prop is provided. Avatar image will be cropped and centered to fit size specified.
 */
const Avatar = ({ id, src, altText, size, className }) => {
  const avatarStyleVariables = {
    width: size,
    height: size
  }

  return (
    <span
      className={classnames(
        avatarStyle,
        {
          // note, these class names are depended on by AvatarButton.
          'with-image': !!src,
          default: !src
        },
        className
      )}
      style={avatarStyleVariables}>
      {src ? (
        <img
          src={src}
          alt={altText}
          className={imageStyle}
          {...testIdAttribute(`avatar-image-${id}`)}
        />
      ) : (
        <ProfileIcon
          className={defaultStyle}
          {...testIdAttribute(`avatar-default-${id}`)}
        />
      )}
    </span>
  )
}

Avatar.propTypes = {
  /**
   * Width/height of the avatar, in px or % (or other css string value). Since the
   * avatar will be square, this value is both width and height.
   */
  size: PropTypes.string.isRequired,

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
   * Alt text to include as a description of the Avatar for non-sighted users
   */
  altText: PropTypes.string,

  /**
   * Classname to be applied to the outer node that can be used to override
   * or supplement styles.
   */
  className: PropTypes.string
}

Avatar.defaultProps = {
  id: '',
  src: null,
  altText: 'Your avatar'
}

export default Avatar
