import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'linaria'
import { darkMode, sepiaMode } from '@pocket/web-ui'
import classnames from 'classnames'
import { testIdAttribute } from '@pocket/web-utilities/test-utils'

const themedImg = css`
  &.light {
    ${darkMode} {
      display: none;
    }
    ${sepiaMode} {
      display: none;
    }
  }

  &.dark {
    display: none;

    ${darkMode} {
      display: inherit;
    }

    ${sepiaMode} {
      display: none;
    }
  }

  &.sepia {
    display: none;

    ${darkMode} {
      display: none;
    }

    ${sepiaMode} {
      display: inherit;
    }
  }
`

/**
 * This component returns images that will hide or show based on the
 * selected color mode.
 */
const ThemedImg = React.forwardRef(
  (
    { srcLight, srcDark, srcSepia, alt, useWrapper, className, ...remaining },
    ref
  ) => {
    const srcSet = { light: srcLight, dark: srcDark, sepia: srcSepia }

    const images = Object.entries(srcSet).map(([mode, path]) =>
      path ? (
        <img
          src={path}
          alt={alt}
          className={classnames(themedImg, className, mode)}
          key={`themed-img-${mode}`}
          ref={ref}
          {...remaining}
          {...testIdAttribute(`themed-img-${mode}`)}
        />
      ) : null
    )

    return useWrapper ? (
      <figure role="group" {...testIdAttribute('figure-wrapper')}>
        {images}
      </figure>
    ) : (
      images
    )
  }
)

ThemedImg.propTypes = {
  /**
   * Src path for light version of image
   */
  srcLight: function (props, propName, componentName) {
    PropTypes.oneOfType([PropTypes.string, PropTypes.object])

    // One of these props is required: srcLight, srcDark, or srcSepia
    if (!props.srcLight && !props.srcDark && !props.srcSepia) {
      return new Error(
        `Please provide a value for '${propName}', 'srcDark', or 'srcSepia' to ${componentName}.`
      )
    }
  },

  /**
   * Src path for dark version of image
   */
  srcDark: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  /**
   * Src path for sepia version of image
   */
  srcSepia: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  /**
   * Alt tag for this image
   */
  alt: PropTypes.string,

  /**
   * Set to false to disable wrapping all the images in a `<figure>` element
   */
  useWrapper: PropTypes.bool,

  /**
   * CSS class name if styles need to be provided/overridden.
   */
  className: PropTypes.string
}

ThemedImg.defaultProps = {
  srcLight: null,
  srcDark: null,
  srcSepia: null,
  alt: '',
  useWrapper: true,
  className: null
}

export default ThemedImg
