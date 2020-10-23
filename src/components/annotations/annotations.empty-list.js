import { css } from 'linaria'
// import { Illustration } from 'Elements/Illustrations/illustration'

const list = css`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100% - 50px);
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
      {/*<Illustration name="HighlightsAlt" size="120px" margin="0 auto" />*/}
      <h4 className={heading}>
        You haven’t highlighted anything yet {/*"annotations.infoHeading"*/}
      </h4>
      <p className={info}>
        When you select text while you’re reading, it'll appear here.{' '}
        {/*"annotations.instructions"*/}
      </p>
    </div>
  )
}
