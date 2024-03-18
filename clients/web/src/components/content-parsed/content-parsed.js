import { css } from '@emotion/css'
import {
  breakpointSmallTablet,
  breakpointMediumTablet,
  breakpointTinyTablet,
  breakpointLargeHandset,
  breakpointTinyHandset
} from 'common/constants'

const resetWrapper = css`
  font-size: initial;
  * {
    font-size: unset;
  }
`

const contentWrapper = css`
  color: var(--color-textPrimary);
  font-size: var(--fontSize150);
  font-family: var(--fontSerif);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-decoration-skip-ink: auto;

  h2 {
    font-size: var(--fontSize175);
    line-height: 112%;
    margin-bottom: var(--spacing100);
  }

  h3,
  h4,
  h5,
  h6 {
    font-size: var(--fontSize150);
    line-height: 114%;
    margin-bottom: var(--spacing100);
  }

  p {
    line-height: 160%;
    margin-bottom: var(--spacing150);

    &:empty {
      display: none;
    }
  }

  p + h2,
  p + h3,
  p + h4,
  p + h5,
  p + h6 {
    margin-top: 1.7em;
  }

  pre,
  blockquote,
  q {
    color: var(--color-textSecondary);
    font-family: var(--fontSansSerif);
    line-height: 200%;
    padding-left: var(--spacing250);
  }

  q {
    display: block;
    margin-bottom: 2rem;
  }

  /* prevent sup and sub from breaking line-height */
  sup,
  sub {
    vertical-align: baseline;
    position: relative;
    top: -0.4em;
  }
  sub {
    top: 0.4em;
  }

  br {
    line-height: 0;
  }

  img {
    box-sizing: border-box;
    border: 1px solid rgba(224, 224, 224, 0.4);
    object-fit: cover;
    width: 100%;
    margin-bottom: var(--spacing100);
  }

  ul,
  ol {
    margin-left: var(--spacing250);
    padding-left: var(--spacing100);

    li {
      padding-left: var(--spacing075);
      margin-bottom: 1.25rem;

      p,
      span {
        margin-bottom: var(--spacing100);
      }
    }
  }

  ol li::marker {
    font-size: var(--fontSize125);
  }

  .RIL_video {
    position: relative;
    padding-top: 56.25%;
    margin-bottom: 2rem;

    .player,
    object {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
      border-radius: 8px;
      overflow: hidden;
    }
    embed {
      width: 100%;
      height: 100%;
    }
  }

  .description,
  .ril_caption_content,
  .credit_content,
  .ril_caption,
  figcaption {
    color: var(--color-textSecondary);
    font-family: var(--fontSansSerif);
    font-size: 0.696em;
    font-style: italic;
    line-height: 150%;
    margin-bottom: 2rem;
  }

  .split .story-image {
    width: 420px;
    float: left;
    margin-right: 2rem;
  }

  hr {
    margin: 1.5em auto;
    position: relative;
    height: 9px;
    width: 9px;
    border: transparent;
    overflow: visible;
    background-image: url('data:image/svg+xml;utf8,<svg width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><rect x="0.75" y="0.5" width="8" height="8" rx="4" fill="%231CB0A8" /></svg>');

    &:before {
      position: absolute;
      height: 9px;
      width: 10px;
      content: '';
      background-image: url('data:image/svg+xml;utf8,<svg width="10" height="9" viewBox="0 0 10 9" xmlns="http://www.w3.org/2000/svg"><path d="M3.91043 1.29752C4.30449 0.688518 5.19551 0.688519 5.58957 1.29752L9.25143 6.95675C9.68196 7.62211 9.20436 8.5 8.41186 8.5H1.08814C0.29564 8.5 -0.181954 7.62211 0.248574 6.95675L3.91043 1.29752Z" fill="%23FCB643" /></svg>');
      left: -18px;
    }

    &:after {
      position: absolute;
      height: 9px;
      width: 9px;
      content: '';
      background-image: url('data:image/svg+xml;utf8,<svg width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><rect x="0.75" y="0.5" width="8" height="8" rx="1" fill="%23EF4056" /></svg>');
      right: -18px;
    }
  }

  & > *:last-child {
    display: inline-block;
    & *:last-child:not(li) {
      display: inline;
    }
  }
  & > *:last-child:after {
    display: inline-block;
    position: relative;
    margin-left: var(--spacing025);
    top: -0.125rem;
    height: var(--size075);
    width: var(--size075);
    content: ' ';
    background-image: url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M1.643 2h20.714C23.264 2 24 2.715 24 3.597v7.736C24 17.777 18.628 23 12 23S0 17.777 0 11.333V3.597C0 2.715.736 2 1.643 2zm14.306 6.43L12 12.304 8.05 8.429a1.5 1.5 0 0 0-2.1 2.142l5 4.906a1.5 1.5 0 0 0 2.1 0l5-4.906a1.5 1.5 0 0 0-2.1-2.142z" fill-rule="evenodd"/></svg>');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;

    .colormode-dark & {
      background-image: url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M1.643 2h20.714C23.264 2 24 2.715 24 3.597v7.736C24 17.777 18.628 23 12 23S0 17.777 0 11.333V3.597C0 2.715.736 2 1.643 2zm14.306 6.43L12 12.304 8.05 8.429a1.5 1.5 0 0 0-2.1 2.142l5 4.906a1.5 1.5 0 0 0 2.1 0l5-4.906a1.5 1.5 0 0 0-2.1-2.142z" fill="%23f2f2f2"/></svg>');
    }
  }
  & > .article-card:last-of-type:after {
    display: none;
  }
  & > .RIL_video:last-child {
    display: block;
  }

  .article-card {
    display: flex;
    flex-direction: row;
    border-top: 1px solid var(--color-dividerTertiary);
    padding-top: var(--spacing150);
    margin: var(--spacing150) 0;

    .article-card-image {
      width: 100%;
      flex-grow: 3;
      flex-basis: 43%;
      margin-right: var(--spacing150);
      img {
        border-radius: 4px;
      }
    }

    .article-card-aside {
      flex-grow: 4;
      flex-basis: 57%;
      margin-left: var(--spacing200);
      font-family: var(--fontSansSerif);
    }

    h3 {
      margin: 0;
      line-height: 122%;
      font-weight: 600;
      font-size: var(--fontSize150);
      a {
        text-decoration: none;
        color: var(--color-textPrimary);
        &:hover {
          text-decoration: underline;
        }
      }
    }

    span {
      display: inline-block;
      margin-bottom: var(--spacing050);
      color: var(--color-textSecondary);
      font-size: var(--fontSize100);
    }

    .article-card-author {
      &:after {
        content: '·';
        padding: 0 var(--spacing050) 0 0.4rem;
      }
    }

    .article-card-publisher {
      font-style: italic;
    }

    .article-card-excerpt {
      line-height: 150%;
      font-size: var(--fontSize100);
      margin-bottom: var(--spacing100);
    }

    .article-card-save {
      display: inline-block;
      position: relative;
      color: var(--color-textSecondary);
      font-size: var(--fontSize100);
      text-decoration: none;

      &:before {
        display: inline-block;
        position: relative;
        content: '';
        margin-right: var(--spacing050);
        top: 0.35rem;
        height: var(--size150);
        width: var(--size150);
        background-image: url('data:image/svg+xml;utf8,<svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5059 2C2.22885 2 2 2.23116 2 2.52111V8.88889C2 14.4755 6.47925 19 12 19C17.5208 19 22 14.4755 22 8.88889V2.52111C22 2.23116 21.7712 2 21.4941 2H2.5059ZM2.5059 0H21.4941C22.8802 0 24 1.13106 24 2.52111V8.88889C24 15.5756 18.6298 21 12 21C5.37015 21 0 15.5756 0 8.88889V2.52111C0 1.13106 1.11975 0 2.5059 0ZM16.2996 6.78625C16.6938 6.39943 17.3269 6.40541 17.7138 6.7996C18.1006 7.19379 18.0946 7.82693 17.7004 8.21375L12.7004 13.1202C12.3115 13.5019 11.6885 13.5019 11.2996 13.1202L6.2996 8.21375C5.90541 7.82693 5.89943 7.19379 6.28625 6.7996C6.67307 6.40541 7.30621 6.39943 7.7004 6.78625L12 11.0054L16.2996 6.78625Z" fill="%23404040"/></svg>');
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
      }

      .colormode-dark & {
        font-weight: 500;

        &:before {
          background-image: url('data:image/svg+xml;utf8,<svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5059 2C2.22885 2 2 2.23116 2 2.52111V8.88889C2 14.4755 6.47925 19 12 19C17.5208 19 22 14.4755 22 8.88889V2.52111C22 2.23116 21.7712 2 21.4941 2H2.5059ZM2.5059 0H21.4941C22.8802 0 24 1.13106 24 2.52111V8.88889C24 15.5756 18.6298 21 12 21C5.37015 21 0 15.5756 0 8.88889V2.52111C0 1.13106 1.11975 0 2.5059 0ZM16.2996 6.78625C16.6938 6.39943 17.3269 6.40541 17.7138 6.7996C18.1006 7.19379 18.0946 7.82693 17.7004 8.21375L12.7004 13.1202C12.3115 13.5019 11.6885 13.5019 11.2996 13.1202L6.2996 8.21375C5.90541 7.82693 5.89943 7.19379 6.28625 6.7996C6.67307 6.40541 7.30621 6.39943 7.7004 6.78625L12 11.0054L16.2996 6.78625Z" fill="%238c8c8c"/></svg>');
        }
      }

      &:hover:before {
        background-image: url('data:image/svg+xml;utf8,<svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5059 2C2.22885 2 2 2.23116 2 2.52111V8.88889C2 14.4755 6.47925 19 12 19C17.5208 19 22 14.4755 22 8.88889V2.52111C22 2.23116 21.7712 2 21.4941 2H2.5059ZM2.5059 0H21.4941C22.8802 0 24 1.13106 24 2.52111V8.88889C24 15.5756 18.6298 21 12 21C5.37015 21 0 15.5756 0 8.88889V2.52111C0 1.13106 1.11975 0 2.5059 0ZM16.2996 6.78625C16.6938 6.39943 17.3269 6.40541 17.7138 6.7996C18.1006 7.19379 18.0946 7.82693 17.7004 8.21375L12.7004 13.1202C12.3115 13.5019 11.6885 13.5019 11.2996 13.1202L6.2996 8.21375C5.90541 7.82693 5.89943 7.19379 6.28625 6.7996C6.67307 6.40541 7.30621 6.39943 7.7004 6.78625L12 11.0054L16.2996 6.78625Z" fill="%23EF4056"/></svg>');
      }
    }

    ${breakpointMediumTablet} {
      flex-direction: column;
    }

    ${breakpointSmallTablet} {
      flex-direction: row;
      .article-card-image {
        flex-grow: 4;
        flex-basis: 40%;
        margin-right: 1.375rem;
      }
      .article-card-aside {
        flex-grow: 6;
        flex-basis: 60%;
      }
    }

    ${breakpointTinyTablet} {
      .article-card-image {
        flex-grow: 2;
        flex-basis: 33.33%;
        margin-right: var(--spacing100);
      }
      .article-card-aside {
        flex-grow: 4;
        flex-basis: 66.66%;
      }
    }

    ${breakpointLargeHandset} {
      flex-direction: column;

      .article-card-image {
        margin-right: 0;
      }
    }

    ${breakpointTinyHandset} {
      h3 {
        font-size: var(--fontSize125);
      }
    }
  }

  ${breakpointMediumTablet} {
    .split .story-image {
      width: 50%;
    }
  }

  ${breakpointTinyTablet} {
    .split .story-image {
      width: 100%;
      float: none;
      margin-right: 0;
    }
  }

  ${breakpointLargeHandset} {
    font-size: 1.25em;
    h2 {
      font-size: var(--fontSize150);
      line-height: 123%;
    }

    h3,
    h4,
    h5,
    h6 {
      font-size: 1.63em;
      line-height: 125%;
    }

    blockquote,
    q {
      padding-left: var(--spacing100);
    }
  }
`

const articleWrapper = css`
  grid-column-end: span 7;

  ${breakpointMediumTablet} {
    grid-column-end: span 6;
  }

  ${breakpointSmallTablet} {
    grid-column-end: span 11;
  }

  ${breakpointTinyTablet} {
    grid-column-end: span 12;
  }
`

export function ContentParsed({ content }) {
  return (
    <article className={articleWrapper}>
      <div className={resetWrapper} data-testid="parsed-content">
        <section className={contentWrapper} dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </article>
  )
}
