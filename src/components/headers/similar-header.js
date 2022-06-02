import { css, cx } from 'linaria'
import { CrossIcon } from 'components/icons/CrossIcon'

const cardPageHeaderStyle = css`
  margin-bottom: 1rem;

  h3 {
    font-family: 'Graphik Web';
    font-style: normal;
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 1.2;
    margin-bottom: 0.5rem;
  }

  p {
    font-weight: 300;
    font-family: 'Graphik Web';
    font-style: normal;
    font-size: 1rem;
    color: var(--color-textSecondary);
  }
`

const cardPageSimilarStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0;
  .sectionSubTitle {
    margin: 0;
  }
  .close {
    cursor: pointer;
    font-size: 1.5rem;
    margin-top: 0;
  }
`

export const SimilarHeader = ({ sectionTitle, sectionDescription, closeAction = () => { } }) => {
  return sectionTitle ? (
    <header className={cx(cardPageHeaderStyle, cardPageSimilarStyle)}>
      <div>
        <h3 className="sectionTitle">{sectionTitle}</h3>
        {sectionDescription ? <p className="sectionSubTitle">{sectionDescription}</p> : null}
      </div>
      <CrossIcon className="close" data-cy="close-similar" onClick={closeAction} />
    </header>
  ) : null
}
