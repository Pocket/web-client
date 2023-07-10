import PropTypes from 'prop-types'
import { css } from '@emotion/css'
// import { darkMode } from '@pocket/web-ui'
import { breakpointLargeHandset, breakpointMediumHandset } from 'common/constants'

const publisherGrid = css`
  display: grid;
  grid-template-columns: repeat(4, 110px);
  grid-row-gap: var(--spacing250);
  justify-content: space-between;
  justify-items: center;
  margin: 0 0 var(--spacing400) 0;

  img {
    max-width: 110px;

    // @TODO assuming for now this work automatically
    .colormode-dark {
      filter: invert(1);
    }
  }

  ${breakpointLargeHandset} {
    grid-template-columns: repeat(3, 110px);
  }

  ${breakpointMediumHandset} {
    grid-template-columns: repeat(2, 110px);
    justify-content: space-around;
  }
`

/**
 * Renders a grid of Publisher logos with their names as the alt attribute
 */
function PublisherGrid({ publishers }) {
  return (
    <div className={publisherGrid}>
      {publishers.map((publisher) => (
        <img src={publisher.path} alt={publisher.name} key={`publisher-logo-${publisher.name}`} />
      ))}
    </div>
  )
}

PublisherGrid.propTypes = {
  /**
   * Array of objects with path to image and name of publisher
   */
  publishers: PropTypes.array.isRequired
}

export default PublisherGrid
