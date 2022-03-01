import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { useDispatch, useSelector } from 'react-redux'
import { marticleDataRequest } from './read.state'

import { Loader, LoaderCentered } from 'components/loader/loader'
import { ImageAndCaption } from 'components/marticle/image-and-caption'
import { CodeBlock } from 'components/marticle/code-block'
import { BuildList } from 'components/marticle/lists'

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

      {block.text && <CodeBlock key={index} block={block} />}

      {block.rows && <BuildList key={index} block={block} />}
    </>
  ))
}
