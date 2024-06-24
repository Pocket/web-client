// Override function
export const overrideDateTime = {
  renderer: {
    text(text) {
      const hasDateTime = text.includes('{: datetime=')
      return hasDateTime ? '' : false
    }
  }
}

// Custom heading
const headingIdRegex = /(?: +|^)\{#([a-z][\w-]*)\}(?: +|$)/i

export const customHeadingId = {
  renderer: {
    heading(text, level) {
      const hasId = headingIdRegex.exec(text)
      if (!hasId) {
        // fallback to original heading renderer
        return false
      }
      return `<h${level} id="${hasId[1]}">${text.replace(headingIdRegex, '')}</h${level}>\n`
    }
  }
}
