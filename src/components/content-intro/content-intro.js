import ReactMarkdown from 'react-markdown'
import { css } from 'linaria'

const introStyles = css`
  font-family: var(--fontSansSerif);
  font-weight: 300;
  font-size: 1.25rem;
  line-height: 140%;
  margin-bottom: 2.5rem;

  blockquote {
    color: var(--color-textSecondary);
    font-family: var(--fontSansSerif);
    padding-left: var(--spacing250);
  }
`

export const ContentIntro = function ({ intro }) {
  return (
    <div className={introStyles}>
      <ReactMarkdown>{intro}</ReactMarkdown>
    </div>
  )
}
