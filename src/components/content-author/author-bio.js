import ReactMarkdown from 'react-markdown'
import { getImageCacheUrl } from 'common/utilities/urls/urls'
import { css } from '@emotion/css'
import { breakpointLargeHandset } from 'common/constants'
import PropTypes from 'prop-types'

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
  const image = imageUrl.length ? getImageCacheUrl(imageUrl, { width: 200, height: 200 }) : false
  return shouldShow ? (
    <cite className={authorBioStyle}>
      {image ? <img src={image} alt="" /> : null}
      <div className="bio">
        <h4>{name}</h4>
        <ReactMarkdown>{bio}</ReactMarkdown>
      </div>
    </cite>
  ) : null
}

AuthorBio.propTypes = {
  /**
   * Name of the author to display as the header
   */
  name: PropTypes.string,
  /**
   * Biographical details about the author
   */
  bio: PropTypes.string,
  /**
   * Optional image to include along side the biogrpahical details
   */
  imageUrl: PropTypes.string
}
