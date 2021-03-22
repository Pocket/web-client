import { css, cx } from 'linaria'
import PropTypes from 'prop-types'
import { cardStyles } from './card-base'
import { cardBlock } from './card-base'
import { cardWide } from './card-base'
import { cardList } from './card-base'
import { cardDetail } from './card-base'

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
    margin-bottom: 1rem;
  }
  .media,
  .titles {
    border-radius: 4px;
    background-color: var(--color-dividerTertiary);
  }
`

export const CardSkeleton = ({
  name,
  showExcerpt,
  showMedia,
  cardShape,
  count
}) => {
  const card = (index) => {
    const shape = typeof cardShape === 'string' ? cardShape : cardShape[index]
    return cx(
      cardStyles,
      shape === 'block' && `${cardBlock} block`,
      shape === 'wide' && `${cardWide} wide`,
      shape === 'list' && `${cardList} list`,
      shape === 'detail' && `${cardDetail} detail`,
      'noActions',
      !showExcerpt && 'noExcerpt',
      !showMedia && 'noMedia',
      skeletonStyle
    )
  }

  return (
    <>
      {Array.from({ length: count }, (x, index) => (
        <article key={`${name}-${index}`} className={card(index)}>
          <div className="cardLink">
            <div className="media" />
            <div className="content">
              <div className="titles" />
              <div className="titles smaller" />
            </div>
          </div>
        </article>
      ))}
    </>
  )
}

CardSkeleton.propTypes = {
  showExcerpt: PropTypes.bool,
  itemType: PropTypes.oneOf(['display', 'myList', 'discover', 'message']),
  cardShape: PropTypes.oneOfType([
    PropTypes.oneOf(['block', 'wide', 'list', 'detail']),
    PropTypes.arrayOf(PropTypes.string)
  ])
}

CardSkeleton.defaultProps = {
  cardShape: 'block'
}
