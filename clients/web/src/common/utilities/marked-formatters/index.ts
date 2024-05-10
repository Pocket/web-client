// Override function
export const overrideDateTime = () => {
  return {
    renderer: {
      text(text: string) {
        const hasDateTime = text.includes('{: datetime=')
        return hasDateTime ? '' : false
      }
    }
  }
}

// Custom heading
export const customHeadingId = () => {
  return {
    renderer: {
      heading(text: string, level: number) {
        const headingIdRegex = /(?: +|^)\{#([a-z][\w-]*)\}(?: +|$)/i
        const hasId = headingIdRegex.exec(text)
        if (!hasId) {
          // fallback to original heading renderer
          return false
        }
        return `<h${level} id="${hasId[1]}">${text.replace(headingIdRegex, '')}</h${level}>\n`
      }
    }
  }
}
