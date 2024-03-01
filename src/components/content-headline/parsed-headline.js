import { css } from '@emotion/css'
import { breakpointLargeHandset } from 'common/constants'
import ReactMarkdown from 'react-markdown'

const Headline = css`
  color: var(--color-textPrimary);
  font-family: var(--fontSerif);
  font-size: 2.625em;
  line-height: 121.4%;
  margin-bottom: var(--spacing100);

  ${breakpointLargeHandset} {
    font-size: 1.9375em;
    line-height: 116%;
  }
`

const Description = css`
  color: var(--color-textTertiary);
  font-family: var(--fontSansSerif);
  font-weight: 300;
  font-size: 1.25em;
  line-height: 140%;
  margin-bottom: 1rem;
`

/**
 * Pulls the headline from the ‘Title’ field in the admin editor tool,
 * and the description uses the content from the “Excerpt” field in the admin tool.
 *
 * Editors look at the syndicated stories so they adjust headlines and dek in the
 * admin tool if it is too long or more than than 3 lines
 */
export function ParsedHeadline({ title, description, useMarkdown }) {
  return (
    <>
      <h1 className={Headline} data-testid="parsed-headline">
        {title}
      </h1>
      <h2 className={Description}>
        {useMarkdown ? (
          <ReactMarkdown skipHtml={true} unwrapDisallowed={true} allowedElements={['strong', 'em']}>
            {description}
          </ReactMarkdown>
        ) : (
          <p>{description}</p>
        )}
      </h2>
    </>
  )
}
