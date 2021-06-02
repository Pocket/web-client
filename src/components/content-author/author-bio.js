import ReactMarkdown from 'react-markdown'
import { getImageCacheUrl } from 'common/utilities'
import { css } from 'linaria'
import { breakpointLargeHandset } from '@pocket/web-ui'
const authorBioStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-content: center;
  font-style: normal;
  font-family: var(--fontSansSerif);
  font-weight: 300;
  padding: 1.5rem 0;

  &:first-of-type {
    border-top: 1px solid var(--color-dividerSecondary);
  }

  &:last-of-type {
    border-bottom: 1px solid var(--color-dividerSecondary);
    margin-bottom: 3rem;
  }

  p:last-of-type {
    margin: 0;
  }

  img {
    width: 200px;
    height: 200px;
    margin-right: 2rem;
    border-radius: 50%;
    border: 3px solid var(--color-canvas);
    box-shadow: 0px 0px 0px 3px var(--color-actionPrimary);
  }
  ${breakpointLargeHandset} {
    flex-direction: column;
    align-items: center;
    h4 {
      text-align: center;
    }
    img {
      margin: 0 0 1rem 0;
    }
  }
`

export function AuthorBio({ name, bio, imageUrl }) {
  const shouldShow = bio?.length
  const image = getImageCacheUrl(imageUrl, { width: 200, height: 200 })
  return shouldShow ? (
    <cite className={authorBioStyle}>
      <img src={image} alt="" />
      <div className="bio">
        <h4>{name}</h4>
        <ReactMarkdown>{bio}</ReactMarkdown>
      </div>
    </cite>
  ) : null
}
