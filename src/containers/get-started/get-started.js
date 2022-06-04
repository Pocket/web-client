import Layout from 'layouts/main'
import { useDispatch, useSelector } from 'react-redux'
import { SelectTopics } from './select-topics'
import { SelectArticle } from './select-article'
import { SaveConfirm } from './save-confirm'
import { css } from 'linaria'
// import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

const getStartdContainerStyle = css`
  max-width: 900px;
  margin: 0 auto;
  .button {
    font-family: var(--fontSansSerif);
    text-decoration: none;
  }
  .page-header {
    font-family: var(--fontSansSerif);
    font-style: normal;
    .title {
      font-weight: 600;
      font-size: 28px;
      line-height: 36px;
      margin: 0 0 10px 0;
    }
    .sub-head {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      margin: 0;
      display: flex;
      align-content: center;
      align-items: center;
      .icon {
        margin-top: 0;
        margin: 0 0.25rem;
      }
    }
  }
  .page-footer {
    margin-top: 3rem;
    padding: 1rem 0;
    border: var(--borderStyle);
    border-width: 1px 0 0;
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
  }
`

export const GetStarted = ({ metaData }) => {
  const dispatch = useDispatch()

  const positionInFlow = useSelector((state) => state.getStarted.positionInFlow)
  const componentSteps = {
    0: SelectTopics,
    1: SelectArticle
  }

  const ComponentToRender = componentSteps[positionInFlow]
  return (
    <Layout metaData={metaData} className={getStartdContainerStyle} noNav={true}>
      <ComponentToRender />
      <SaveConfirm />
    </Layout>
  )
}

export default GetStarted
