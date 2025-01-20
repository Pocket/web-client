import { useCallback, useEffect, useRef } from 'react'
import { cx } from '@emotion/css'
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
  annotations = [],
  onHighlightHover,
  externalLinkClick = () => {},
  ...args
}) => {
  const articleRef = useRef(null)

  const highlightHover = useCallback(() => onHighlightHover, [])

  useEffect(() => {
    const sendExternalLinkClick = (e) => {
      const link = e.target.closest('a[href]')
      const href = link.getAttribute('href')

      externalLinkClick(href)
    }

    const externalizeLinks = () => {
      const links = articleRef.current.querySelectorAll('a[href]')
      links.forEach((link, index) => {
        link.setAttribute('target', '_blank')
        link.setAttribute('rel', 'noopener')
        link.setAttribute('id', `reader.external-link.num-${index}`)
        link.addEventListener('click', sendExternalLinkClick)
      })
    }

    const processAnnotations = (annotations) => {
      removeAllHighlights()
      annotations.forEach((highlight) => {
        highlightAnnotation(highlight, highlightHover, articleRef.current)
      })
    }

    if (content) externalizeLinks()
    if (images) loadParsedImages(images)
    if (videos) loadParsedVideos(videos)
    if (annotations) processAnnotations(annotations)

    const cleanupRef = articleRef.current
    return () => {
      const links = cleanupRef.querySelectorAll('a[href]')
      links.forEach((link) => {
        link.removeEventListener('click', sendExternalLinkClick)
      })
    }
  }, [annotations, content, externalLinkClick, highlightHover, images, videos])

  return (
    <article
      {...args}
      ref={articleRef}
      className={cx(contentStyles, highlightStyles)}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
    />
  )
}
