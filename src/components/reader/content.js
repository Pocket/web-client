/* eslint  react/jsx-no-target-blank: 0*/
import { useEffect, useRef } from 'react'
import { css } from 'linaria'
import DOMPurify from 'dompurify'
import { loadParsedImages } from './images'
import { loadParsedVideos } from './videos'
import { contentStyles } from './styles'
import {
  highlightAnnotation,
  removeAllHighlights,
  // removeHighlight
} from 'components/annotations/utilities'

const processAnnotations = (annotations, callback, element) => {
  removeAllHighlights()
  annotations.forEach(highlight => {
    highlightAnnotation(highlight, callback, element)
  })
}

const externalizeLinks = (element) => {
  const links = element.querySelectorAll('a[nodeindex]')
  links.forEach(link => {
    link.setAttribute('target', '_blank')
    link.setAttribute('rel', 'noopener noreferrer')
  })
}

/* EXPORTED COMPONENT
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const Content = ({
  content,
  images,
  videos,
  annotations,
  annotationsBuilt,
 ...args
}) => {
  const articleRef = useRef(null)

  const callback = () => annotationsBuilt()

  useEffect(() => {
    if (content) externalizeLinks(articleRef.current)
    if (images) loadParsedImages(images)
    if (videos) loadParsedVideos(videos)
  }, [])

  useEffect(() => {
    if (annotations) processAnnotations(annotations, callback, articleRef.current)
  })

  return (
    <article
      {...args}
      ref={articleRef}
      className={contentStyles}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
  )
}
