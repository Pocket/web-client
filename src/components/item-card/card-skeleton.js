import { css, cx } from '@emotion/css'
import PropTypes from 'prop-types'
import { cardStyles } from './card-base'

const skeletonStyle = css`
  .titles {
    width: 80%;
    height: 1rem;
    margin: 0 0 1rem;
    &.smaller {
      width: 60%;
    }
  }
  .media {
    overflow: hidden;
    width: 100%;
    height: 0;
    padding-top: 66.66%;
    background-repeat: 'no-repeat';
    background-position: center;
    background-size: cover;
    transition-property: opacity;
    transition-duration: 0.2s;
    transition-timing-function: ease;
    border-radius: var(--size025);
    margin-bottom: 1rem;
  }
  .media,
  .titles {
    border-radius: 4px;
    background-color: var(--color-dividerTertiary);
  }
`

export const CardSkeleton = ({ name, showExcerpt, showMedia, cardShape, className, id }) => {
  const skeletonCardStyle = cx(
    cardStyles,
    cardShape,
    className,
    'noActions',
    !showExcerpt && 'noExcerpt',
    !showMedia && 'noMedia',
    skeletonStyle
  )

  return (
    <article key={`${name}-${id}`} className={skeletonCardStyle}>
      <div className="cardWrap">
        <div className="media" />
        <div className="content">
          <div className="titles" />
          <div className="titles smaller" />
        </div>
      </div>
    </article>
  )
}

CardSkeleton.propTypes = {
  showMedia: PropTypes.bool,
  showExcerpt: PropTypes.bool,
  cardShape: PropTypes.oneOfType([
    PropTypes.oneOf(['block', 'wide', 'list', 'detail']),
    PropTypes.arrayOf(PropTypes.string)
  ])
}

CardSkeleton.defaultProps = {
  cardShape: 'block'
}
