import { css } from 'linaria'
import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { useDispatch, useSelector } from 'react-redux'
import { marticleDataRequest } from './read.state'

import { Loader, LoaderCentered } from 'components/loader/loader'

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

const ImageAndCaption = ({ block }) => {
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

export const Marticle = (itemId) => {
  const dispatch = useDispatch()
  const marticleContent = useSelector((state) => state.reader.marticleContent)

  useEffect(() => {
    dispatch(marticleDataRequest(itemId))
  }, [dispatch, itemId])

  if (!marticleContent) {
    return (
      <LoaderCentered>
        <Loader isVisible />
      </LoaderCentered>
    )
  }

  return marticleContent.map((block, index) => (
    <>
      {block.content && <ReactMarkdown key={index}>{block.content}</ReactMarkdown>}

      {block.src && <ImageAndCaption key={index} block={block} />}

      {block.text && (
        <pre key={index} className={preformattedText}>
          {block.text}
        </pre>
      )}
    </>
  ))
}
