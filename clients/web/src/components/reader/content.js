import { useCallback, useEffect, useRef, useState } from 'react'
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
  annotationsBuilt = () => {},
  onHighlightHover,
  externalLinkClick = () => {},
  ...args
}) => {
  const articleRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  // Anti-Pattern that kinda locks these functions in place
  const buildAnnotations = useCallback(() => {
    annotationsBuilt()
  }, [])
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

    if (content) externalizeLinks()
    if (images) loadParsedImages(images)
    if (videos) loadParsedVideos(videos)

    const cleanupRef = articleRef.current
    return () => {
      const links = cleanupRef.querySelectorAll('a[href]')
      links.forEach((link) => {
        link.removeEventListener('click', sendExternalLinkClick)
      })
    }
  }, [content, externalLinkClick, images, videos])

  useEffect(() => {
    if (annotations) {
      const timer = !loaded ? 500 : 0
      setTimeout(() => {
        processAnnotations(annotations)
      }, timer)
    }

    const processAnnotations = (annotations) => {
      removeAllHighlights()
      annotations.forEach((highlight) => {
        highlightAnnotation(highlight, highlightHover, articleRef.current)
      })
    }

    setLoaded(true)
  }, [annotations, loaded, buildAnnotations, highlightHover])

  return (
    <article
      {...args}
      ref={articleRef}
      className={cx(contentStyles, highlightStyles)}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
    />
  )
}
