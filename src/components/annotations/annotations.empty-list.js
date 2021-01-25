import { css } from 'linaria'
import { Trans } from 'react-i18next'
import HighlightDark from 'static/images/reader-upsells/HighlightsAlt-dark.svg'
import HighlightLight from 'static/images/reader-upsells/HighlightsAlt-light.svg'
import HighlightSepia from 'static/images/reader-upsells/HighlightsAlt-sepia.svg'

const list = css`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100% - 50px);
`

const imageWrapper = css`
  margin: 20px auto;

  img {
    display: none;
    max-width: 120px;
  }
  .colormode-light & {
    img.light { display: block; }
  }
  .colormode-dark & {
    img.dark { display: block; }
  }
  .colormode-sepia & {
    img.sepia { display: block; }
  }
`

const heading = css`
  font-family: 'Graphik Web';
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
  margin: 0 0 4px;
  padding: 0 20px;
`

const info = css`
  font-family: 'Graphik Web';
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  margin: 0;
  padding: 0 20px;
`

export const EmptyList = () => {
  return (
    <div className={list}>
      <div className={imageWrapper}>
        <img aria-hidden="true" className='dark' src={HighlightDark} />
        <img aria-hidden="true" className='light' src={HighlightLight} />
        <img aria-hidden="true" className='sepia' src={HighlightSepia} />
      </div>
      <h4 className={heading}>
        <Trans>You haven’t highlighted anything yet</Trans>
      </h4>
      <p className={info}>
        <Trans>When you select text while you’re reading, it'll appear here.</Trans>
      </p>
    </div>
  )
}
