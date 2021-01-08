import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import DOMPurify from 'dompurify'
import { loadParsedImages } from './images'
import { loadParsedVideos } from './videos'
import { contentStyles, highlightStyles } from './styles'
import {
  highlightAnnotation,
  removeAllHighlights
  // removeHighlight
} from 'components/annotations/utilities'

/* EXPORTED COMPONENT
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const Content = ({
  content,
  images,
  videos,
  annotations,
  annotationsBuilt,
  onHighlightHover,
  ...args
}) => {
  const articleRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  const processAnnotations = (annotations) => {
    removeAllHighlights()
    let itemsProcessed = 0
    annotations.forEach((highlight, index, array) => {
      highlightAnnotation(
        highlight,
        onHighlightHover,
        articleRef.current,
        () => {
          itemsProcessed++
          if (itemsProcessed === array.length) {
            annotationsBuilt()
          }
        }
      )
    })
  }

  const externalizeLinks = () => {
    const links = articleRef.current.querySelectorAll('a[href]')
    links.forEach((link, index) => {
      link.setAttribute('target', '_blank')
      link.setAttribute('rel', 'noopener noreferrer')
      link.setAttribute('id', `reader.external-link.num-${index}`)
    })
  }

  useEffect(() => {
    if (content) externalizeLinks()
    if (images) loadParsedImages(images)
    if (videos) loadParsedVideos(videos)
  }, [])

  useEffect(() => {
    if (annotations) {
      let timer = !loaded ? 500 : 0
      setTimeout(() => {
        processAnnotations(annotations)
      }, timer)
    }

    setLoaded(true)
  }, [annotations.length])

  return (
    <article
      {...args}
      ref={articleRef}
      className={classNames(contentStyles, highlightStyles)}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
    />
  )
}
