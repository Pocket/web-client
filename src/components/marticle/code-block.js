import { css } from 'linaria'

const preformattedText = css`
  white-space: normal;
`

export const CodeBlock = ({ block }) => {
  return (
    <pre className={preformattedText}>
      <code>{block.text}</code>
    </pre>
  )
}
