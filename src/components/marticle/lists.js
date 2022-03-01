import ReactMarkdown from 'react-markdown'

const ListItem = ({ listItem }) => {
  return (
    <li>
      <ReactMarkdown>{listItem.content}</ReactMarkdown>
    </li>
  )
}

const BulletedList = ({ block }) => {
  let currentLevel = 0
  const rows = block.rows

  let html = `<ul>`

  for (const row of rows) {
    if (row.level === currentLevel) {
      html += `
      <li>
        <ReactMarkdown>{listItem.content}</ReactMarkdown>
      </li>`
    }

    if (row.level > currentLevel) {
      html += `<ul>`
    }

    if (row.level < currentLevel) {
      html += `</ul>`
    }

    currentLevel = row.level
  }

  html += `</ul>`
  return html
}

const OrderedList = ({ block }) => {
  return (
    <ol>
      {block.rows.map((row, index) => {
        return <ListItem key={index} listItem={row} />
      })}
    </ol>
  )
}

export const BuildList = ({ block }) => {
  const useOrderedList = block.rows.some((item) => item.index !== undefined)

  if (useOrderedList) {
    return <OrderedList block={block} />
  } else {
    return <BulletedList block={block} />
  }
}
