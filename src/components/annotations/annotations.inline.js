import { AnnotationMenu } from 'components/annotations/annotations.menu'

export const HighlightInlineMenu = ({
  isPremium,
  highlightList = [],
  highlightHovered,
  annotationCount,
  shareItem,
  deleteAnnotation
}) => {
  const inlineMenus = []

  if (annotationCount === 0) return null

  highlightList.forEach((highlight) => {
    const id = highlight.annotation_id || highlight.id
    const el = document.querySelector(
      `[annotation_id="${id}"]`
    )

    if (el) {
      const { x, y } = el.getBoundingClientRect()

      inlineMenus.push(
        <AnnotationMenu
          isPremium={isPremium}
          key={id}
          id={id}
          visible={highlightHovered?.id === id}
          top={Math.round(y + window.pageYOffset)}
          left={x}
          shareItem={shareItem}
          quote={highlight.quote}
          deleteAnnotation={deleteAnnotation}
          floating={true}
        />
      )
    }
  })

  return inlineMenus
}
