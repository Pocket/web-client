// Override function
const dateTimeRegex = /\{: datetime=/i
export const overrideDateTime = {
  renderer: {
    text({ text }) {
      const hasDateTime = dateTimeRegex.exec(text)
      return hasDateTime ? '' : false
    }
  }
}

// Custom heading
const headingIdRegex = /(?: +|^)\{#([a-z][\w-]*)\}(?: +|$)/i

export const customHeadingId = {
  renderer: {
    heading({ text, depth }) {
      const hasId = headingIdRegex.exec(text)
      if (!hasId) return false
      return `<h${depth} id="${hasId[1]}">${text.replace(headingIdRegex, '')}</h${depth}>\n`
    }
  }
}
