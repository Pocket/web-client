import ReactMarkdown from 'react-markdown'
import { css } from '@emotion/css'

const introStyles = css`
  font-family: var(--fontSansSerif);
  font-weight: 300;
  font-size: 1.25rem;
  line-height: 140%;
  margin-bottom: 2.5rem;

  blockquote {
    color: var(--color-textSecondary);
    font-family: var(--fontSansSerif);
    padding-left: 2.5rem;
  }
`

export const ContentIntro = function ({ intro }) {
  return (
    <div className={introStyles}>
      <ReactMarkdown>{intro}</ReactMarkdown>
    </div>
  )
}
