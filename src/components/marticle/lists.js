import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

export const BuildList = ({ block }) => {
  let currentLevel = 0
  const rows = block.rows

  // if index is present, it is an ordered list
  const isOrderedList = block.rows.some((item) => item.index !== undefined)
  const outerTag = isOrderedList ? 'ol' : 'ul'
  let html = `<${outerTag}>`

  for (const item of rows) {
    // check for index again to build inner tag since we can have an ordered
    // list nested inside an unordered list and vice versa
    const innerTag = item.index !== undefined ? 'ol' : 'ul'

    // if this item is a level below the previous item
    // start a new list and set the current level
    if (item.level > currentLevel) {
      html += `<${innerTag}>`
      currentLevel = item.level
    }

    // if this item is in the current level
    // render new list item
    if (item.level === currentLevel) {
      // this indentation and whitespace is IMPORTANT!! Be wary when changing
      // see the note in https://github.com/remarkjs/react-markdown#appendix-a-html-in-markdown
      html += `<li>

${item.content}

</li>`
    }

    // if this item is in previous level of the list
    // render closing list tag
    if (item.level < currentLevel) {
      html += `</${innerTag}>`
    }

    currentLevel = item.level
  }

  html += `</${outerTag}>`
  return <ReactMarkdown rehypePlugins={[rehypeRaw]}>{html}</ReactMarkdown>
}
