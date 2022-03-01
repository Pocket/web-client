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

export const ImageAndCaption = ({ block }) => {
  return (
    <figure className={figure}>
      <img src={block.src} alt="" />
      {block.caption && (
        <figcaption>
          <ReactMarkdown>{block.caption}</ReactMarkdown>
        </figcaption>
      )}
    </figure>
  )
}
