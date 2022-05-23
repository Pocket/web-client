import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SelectionPopover } from 'components/popover/popover-selection'
import { HighlightInlineMenu } from 'components/annotations/annotations.inline'
import { ModalLimitNotice as AnnotationsLimitModal } from 'components/annotations/annotations.limit'
import { AnnotateItemModal } from 'components/annotations/annotate.modal'

import { saveHighlightRequest } from 'containers/read/read.state'
import { deleteHighlightRequest } from 'containers/read/read.state'
import { setHighlightList } from 'containers/read/read.state'
import { saveAnnotationRequest } from 'containers/read/read.state'
import { deleteAnnotationRequest } from 'containers/read/read.state'
import { toggleAnnotationModal } from 'containers/read/read.state'

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { shareAction } from 'connectors/share-modal/share-modal.state'
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
  const annotationsOpen = useSelector((state) => state.reader.annotationsOpen)

  const { analyticsData } = item
  const { annotations } = savedData
  const highlights = annotations?.highlights || []
  const highlightToAnnotate = highlights.filter((item) => item.id === annotationsOpen)[0]

  const buildAnnotations = () => {
    const compiled = compileAnnotations(highlights)
    dispatch(setHighlightList(compiled))
  }

  const toggleHighlight = () => {
    const selection = window.getSelection()
    if (selection.toString()) return setHighlight(selection)
    if (highlight) return setHighlight(null)
  }

  const toggleHighlightHover = (e) => {
    if (e.type === 'mouseout') return setHighlightHovered(null)

    setHighlightHovered({
      id: e.target.getAttribute('annotation_id'),
      event: e
    })
  }

  const clearSelection = () => {
    window.getSelection().removeAllRanges()
    toggleHighlight()
  }

  const addAnnotation = () => {
    if (annotations.length === 3 && !isPremium) return setAnnotationLimitModal(true)

    dispatch(sendSnowplowEvent('reader.add-highlight', analyticsData))
    dispatch(
      saveHighlightRequest({
        id,
        patch: requestAnnotationPatch(highlight),
        quote: highlight.toString()
      })
    )
  }

  const removeHighlight = (annotationId) => {
    dispatch(sendSnowplowEvent('reader.remove-highlight', analyticsData))
    dispatch(deleteHighlightRequest({ annotationId }))
  }

  const itemShare = ({ quote }) => {
    dispatch(sendSnowplowEvent('reader.share', analyticsData))
    dispatch(shareAction({ item, quote }))
  }

  const annotateItem = (id) => {
    dispatch(toggleAnnotationModal(id))
  }

  const closeAnnotationLimit = () => setAnnotationLimitModal(false)

  const closeAnnotateItem = () => dispatch(toggleAnnotationModal())

  const saveAnnotation = ({ id, input }) => {
    // dispatch(saveAnnotationRequest({ id, input }))
  }

  const deleteAnnotation = ({ id }) => {
    // dispatch(deleteAnnotationRequest({ id }))
  }

  const handleImpression = (identifier) => {
    dispatch(sendSnowplowEvent(identifier))
  }

  const passedProps = {
    annotations: highlights,
    onMouseUp: toggleHighlight,
    onHighlightHover: toggleHighlightHover,
    annotationsBuilt: buildAnnotations
  }

  console.log({ ...highlightToAnnotate })

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
          deleteHighlight={removeHighlight}
          annotateItem={annotateItem}
        />
      ) : null}

      <AnnotationsLimitModal
        showModal={annotationLimitModal}
        closeModal={closeAnnotationLimit}
        onVisible={handleImpression}
      />

      <AnnotateItemModal
        showModal={!!annotationsOpen}
        closeModal={closeAnnotateItem}
        saveAnnotation={saveAnnotation}
        deleteAnnotation={deleteAnnotation}
        {...highlightToAnnotate}
      />
    </>
  )
}
