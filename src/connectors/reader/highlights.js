import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SelectionPopover } from 'components/popover/popover-selection'
import { HighlightInlineMenu } from 'components/annotations/annotations.inline'
import { ModalLimitNotice as AnnotationsLimitModal } from 'components/annotations/annotations.limit'

import { saveHighlightRequest } from 'containers/read/read.state'
import { deleteHighlightRequest } from 'containers/read/read.state'
import { setHighlightList } from 'containers/read/read.state'

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { compileAnnotations } from 'components/annotations/utilities'
import { requestAnnotationPatch } from 'components/annotations/utilities'

export const Highlights = ({ children, id }) => {
  const dispatch = useDispatch()

  const [annotationLimitModal, setAnnotationLimitModal] = useState(false)
  const [highlight, setHighlight] = useState(null)
  const [highlightHovered, setHighlightHovered] = useState(null)

  const isPremium = useSelector((state) => state.user.premium_status === '1')
  const item = useSelector((state) => state.reader.articleItem)
  const savedData = useSelector((state) => state.reader.savedData)
  const highlightList = useSelector((state) => state.reader.highlightList)

  const { analyticsData } = item
  const { annotations } = savedData
  const highlights = annotations?.highlights || []

  const buildAnnotations = () => {
    const compiled = compileAnnotations(highlights)
    dispatch(setHighlightList(compiled))
  }

  const toggleHighlight = () => {
    const selection = window.getSelection()
    if (selection.toString()) {
      setHighlight(selection)
    } else if (highlight) {
      setHighlight(null)
    }
  }

  const toggleHighlightHover = (e) => {
    if (e.type === 'mouseout') {
      setHighlightHovered(null)
    } else {
      setHighlightHovered({
        id: e.target.getAttribute('annotation_id'),
        event: e
      })
    }
  }

  const clearSelection = () => {
    window.getSelection().removeAllRanges()
    toggleHighlight()
  }

  const addAnnotation = () => {
    if (annotations.length === 3 && !isPremium) {
      setAnnotationLimitModal(true)
    } else {
      dispatch(sendSnowplowEvent('reader.add-highlight', analyticsData))
      dispatch(
        saveHighlightRequest({
          id,
          patch: requestAnnotationPatch(highlight),
          quote: highlight.toString()
        })
      )
    }
  }

  const removeAnnotation = (annotationId) => {
    dispatch(sendSnowplowEvent('reader.remove-highlight', analyticsData))
    dispatch(deleteHighlightRequest({ annotationId }))
  }

  const itemShare = ({ quote }) => {
    dispatch(sendSnowplowEvent('reader.share', analyticsData))
    // dispatch(itemsShareAction({ id, quote }))
  }

  const closeAnnotationLimit = () => setAnnotationLimitModal(false)

  const handleImpression = (identifier) => {
    dispatch(sendSnowplowEvent(identifier))
  }

  const passedProps = {
    annotations: highlights,
    onMouseUp: toggleHighlight,
    onHighlightHover: toggleHighlightHover,
    annotationsBuilt: buildAnnotations
  }

  return (
    <>
      {React.cloneElement(children, passedProps)}
      {highlight ? (
        <SelectionPopover
          anchor={highlight}
          disablePopup={clearSelection}
          addAnnotation={addAnnotation}
          shareItem={itemShare}
        />
      ) : null}
      {highlightList ? (
        <HighlightInlineMenu
          highlightList={highlightList}
          highlightHovered={highlightHovered}
          annotationCount={highlights.length}
          shareItem={itemShare}
          isPremium={isPremium}
          deleteAnnotation={removeAnnotation}
        />
      ) : null}

      <AnnotationsLimitModal
        showModal={annotationLimitModal}
        closeModal={closeAnnotationLimit}
        onVisible={handleImpression}
      />
    </>
  )
}
