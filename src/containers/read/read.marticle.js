import ReactMarkdown from 'react-markdown'
import { css } from 'linaria'

const figure = css`
  width: 110%;
  margin: 0 -5%;
  padding-bottom: 1.667em;
  text-align: center;

  img {
    max-width: 100%;
    border-radius: 8px;
    margin: 0 auto;
  }
`

const preformattedText = css`
  white-space: normal;
`

const ImageAndCaption = ({block}) => {
  return (
    <figure className={figure}>
      <img src={block.src} />
      {block.caption && (
        <figcaption>
          <ReactMarkdown>{block.caption}</ReactMarkdown>
        </figcaption>
      )}
    </figure>
  )
}

export const Marticle = ({marticleContent}) => {
  return marticleContent.map((block, index) => (
    <>
      {block.content && <ReactMarkdown key={index}>{block.content}</ReactMarkdown> }

      {block.src && <ImageAndCaption block={block} /> }

      {block.text && (
        <pre className={preformattedText}>
          {block.text}
        </pre>
      )}
    </>
  ))
}
