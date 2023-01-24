import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SelectionPopover } from 'components/popover/popover-selection'
import { HighlightInlineMenu } from 'components/annotations/annotations.inline'
import { ModalLimitNotice as AnnotationsLimitModal } from 'components/annotations/annotations.limit'

import { mutationHighlightItem } from 'connectors/items/mutation-highlight.state'
import { mutationHighlightDelete } from 'connectors/items/mutation-highlight.state'

import { setHighlightList } from 'containers/read/reader.state'

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { shareAction } from 'connectors/items/mutation-share.state'
import { compileAnnotations } from 'components/annotations/utilities'
import { requestAnnotationPatch } from 'components/annotations/utilities'

export const Highlights = ({ children, id }) => {
  const dispatch = useDispatch()

  const [annotationLimitModal, setAnnotationLimitModal] = useState(false)
  const [highlight, setHighlight] = useState(null)
  const [highlightHovered, setHighlightHovered] = useState(null)

  const isPremium = useSelector((state) => state.user.premium_status === '1')
  const item = useSelector((state) => state.itemsDisplay[id])
  const savedData = useSelector((state) => state.itemsSaved[id])
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
    if (!highlight.toString()) return
    if (annotations.length === 3 && !isPremium) return setAnnotationLimitModal(true)

    dispatch(sendSnowplowEvent('reader.add-highlight', analyticsData))
    dispatch(
      mutationHighlightItem({
        id,
        patch: requestAnnotationPatch(highlight),
        quote: highlight.toString()
      })
    )
  }

  const removeAnnotation = (annotationId) => {
    dispatch(sendSnowplowEvent('reader.remove-highlight', analyticsData))
    dispatch(mutationHighlightDelete({ annotationId, savedItemId: id }))
  }

  const itemShare = ({ quote }) => {
    dispatch(sendSnowplowEvent('reader.share', analyticsData))
    dispatch(shareAction({ item, quote }))
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
