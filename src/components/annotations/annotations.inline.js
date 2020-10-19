import { AnnotationMenu } from 'components/annotations/annotations.menu'


export const HighlightInlineMenu = ({ isPremium, highlightList = [], highlightHovered, shareItem, shareData }) => {
  const inlineMenus = []

  highlightList.forEach(highlight => {
    const el = document.querySelector(`[annotation_id="${highlight.annotation_id}"]`)

    if (el) {
      const { x, y } = el.getBoundingClientRect()
      inlineMenus.push(
        <AnnotationMenu
          isPremium={isPremium}
          key={highlight.annotation_id}
          id={highlight.annotation_id}
          visible={highlightHovered?.id === highlight.annotation_id}
          top={Math.round(y + window.pageYOffset)}
          left={x + el.offsetLeft}
          shareItem={shareItem}
          shareData={shareData}
          quote={highlight.quote}
        />
      )
    }
  })

  return inlineMenus
}
