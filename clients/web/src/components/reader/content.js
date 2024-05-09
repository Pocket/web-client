/* eslint-disable -- Legacy behavior -- needs to be updated */
//!! UPDATE HOOKS / REFACTOR TO TYPESCRIPT
import { useEffect, useRef, useState } from 'react'
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
  const [linkList, setLinkList] = useState([])

  const processAnnotations = (annotations) => {
    removeAllHighlights()
    let itemsProcessed = 0
    annotations.forEach((highlight, index, array) => {
      highlightAnnotation(highlight, onHighlightHover, articleRef.current, () => {
        itemsProcessed++
        if (itemsProcessed === array.length) {
          annotationsBuilt()
        }
      })
    })
  }

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

    setLinkList(links)
  }

  useEffect(() => {
    if (content) externalizeLinks()
    if (images) loadParsedImages(images)
    if (videos) loadParsedVideos(videos)

    return () => {
      linkList.forEach((link) => {
        link.removeEventListener('click', sendExternalLinkClick)
      })
    }
  }, [])

  useEffect(() => {
    if (annotations) {
      const timer = !loaded ? 500 : 0
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
      className={cx(contentStyles, highlightStyles)}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
    />
  )
}
