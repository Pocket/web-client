import { css } from '@emotion/css'

export const READER_PADDING = 40

export const contentStyles = css`
  position: relative;

  #RIL_domain,
  #RIL_header,
  #RIL_ARTICLE_NOTE {
    display: none;
  }

  #RIL_media {
    text-align: center;

    object,
    embed,
    img {
      margin-bottom: 15px;
    }
  }

  h1,
  h2 {
    line-height: 1.3em;
    font-size: 25px;
    font-size: 1.4em;
    margin: 0 0px 0.7em 0px;
  }
  h3 {
    line-height: 1.3em;
    font-size: 1.3em;
    margin: 0 0px 0.5em 0px;
  }
  h4 {
    line-height: 1.3em;
    font-size: 1.2em;
    margin: 0 0px 0.5em 0px;
  }
  h5,
  h6 {
    font-size: 1.1em;
    font-weight: bold;
    margin: 0 0px 0.4em 0px;
  }

  h3 + .RIL_IMG,
  h4 + .RIL_IMG,
  h5 + .RIL_IMG,
  h6 + .RIL_IMG,
  h3 + .RIL_VIDEO,
  h4 + .RIL_VIDEO,
  h5 + .RIL_VIDEO,
  h6 + .RIL_VIDEO {
    margin-top: 1.1em !important;
  }

  p {
    margin: 0 0 1em 0px;
    text-align: left;
  }
  .hyphenate *[lang] p,
  .hyphenate p[lang] {
    text-align: justify;
    -webkit-hyphens: auto;
  }
  .force_left *[lang] p,
  .force_left p[lang] {
    text-align: left;
  }
  li {
    text-align: left;
  }

  ul,
  ol {
    margin: 1.5em 0px 1.5em 2em;
  }
  li {
    margin: 0px 0px 0.4em 0px;
  }
  ul ul,
  ol ol {
    margin: 0.75em 0 1em 2em;
    min-width: 250px;
  }

  p + h2,
  p + h3,
  p + h4,
  p + h5,
  p + h6 {
    margin-top: 1.7em;
  }

  /* spacing of headers of lists */
  h3 + ul,
  h3 + ol,
  h4 + ul,
  h4 + ol {
    margin-top: 1.1em;
  }

  /* spacing of headers of lists */
  h5 + ul,
  h5 + ol,
  h6 + ul,
  h6 + ol {
    margin-top: 0.8em;
  }

  pre,
  blockquote {
    display: block;
    margin: 1.5em 7% 1.5em 7%;
  }

  pre {
    box-sizing: border-box;
    margin: 15px -5%;
    padding: 10px;
    font-size: 0.8em;
    width: 110%;
    overflow: auto;
    background-color: var(--color-textSecondary);
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

  blockquote,
  aside {
    padding: var(--spacing250);
  }

  a {
    cursor: pointer;
    color: var(--color-textPrimary);
    text-decoration: none;
    position: relative;
    text-shadow:
      -1px -1px 0 var(--color-canvas),
      1px -1px 0 var(--color-canvas),
      -1px 1px 0 var(--color-canvas),
      1px 1px 0 var(--color-canvas);
    background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0) 1px,
      var(--color-textPrimary) 1px,
      var(--color-textPrimary) 2px,
      rgba(0, 0, 0, 0) 2px
    );

    &:hover {
      color: var(--color-textLinkHover);
      background-image: linear-gradient(
        to top,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0) 1px,
        var(--color-textLinkHover) 1px,
        var(--color-textLinkHover) 2px,
        rgba(0, 0, 0, 0) 2px
      );
    }
  }

  hr {
    margin: 1em 0px;
    border: 0px;
    padding: 0px;
    height: 1px;
    background: var(--color-dividerPrimary);
  }

  figure {
    width: 110%;
    margin: 0 -5%;
    padding-bottom: 1.667em;

    figcaption {
      width: 100%;
      box-sizing: border-box;
      padding: 1.25em 0 0;
      font-size: 0.583em;
      line-height: 1.643;
      color: var(--color-textSecondary);
    }
  }

  .RIL_IMG {
    position: relative;
    margin: 0;
    text-align: center;

    &:after {
      content: '.';
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }

    img {
      max-width: 100%;
      border-radius: 8px;
      margin: 0 auto;
    }
    cite {
      width: 100%;
      box-sizing: border-box;
      display: none;
      clear: both;
    }

    a {
      display: block;
      margin: 0px auto;
      border: 0px !important;
      text-decoration: none !important;
      position: relative;
    }
  }

  .RIL_VIDEO {
    width: 110%;
    margin: 0 -5% 1.5em;
  }

  table.ril_dataTable,
  table.ril_layoutTable {
    border-collapse: collapse;
    width: 100%;
    margin: 20px 0;
  }
  table.ril_dataTable td,
  table.ril_layoutTable td {
    width: auto;
    text-align: left;
    padding: 0;
    background: none;
    border: 0;
  }

  .ril_layoutTable td,
  .ril_layoutTable tr,
  .ril_layoutTable th {
    display: block;
  }

  table.ril_dataTable {
    margin: 1.5em 0;
  }
  table.ril_dataTable th {
    font-weight: 600;
    border: 0;
    padding: 0 5px 0.3em !important;
    border-bottom: 2px solid var(--color-dividerPrimary);
    text-align: left;
  }
  table.ril_dataTable td {
    border: 0;
    border-bottom: 1px solid var(--color-dividerPrimary);
    padding: 0.3em 5px !important;
    vertical-align: top;
    font-size: 0.8em;
  }

  div:empty,
  section:empty,
  aside:empty,
  p:empty,
  li:empty {
    display: none;
  }
`

export const highlightStyles = css`
  *::selection {
    background-color: #e5f2f1 !important;
    color: #333333 !important;
  }

  .highlight {
    position: relative;
    background-color: #fee8c3;
    color: #333333;
  }
  a .highlight,
  a.highlight {
    text-shadow:
      -1px -1px 0 #fee8c3,
      1px -1px 0 #fee8c3,
      -1px 1px 0 #fee8c3,
      1px 1px 0 #fee8c3 !important;
    background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0) 1px,
      #333333 1px,
      #333333 2px,
      rgba(0, 0, 0, 0) 2px
    );
  }

  .colormode-dark & {
    *::selection {
      background-color: rgb(0, 73, 69, 0.99) !important;
      color: #e0e0e0 !important;
    }

    .highlight {
      position: relative;
      background-color: #fee8c3;
      color: var(--color-grey10);
    }
    a .highlight,
    a.highlight {
      text-shadow:
        -1px -1px 0 #fee8c3,
        1px -1px 0 #fee8c3,
        -1px 1px 0 #fee8c3,
        1px 1px 0 #fee8c3 !important;
      background-image: linear-gradient(
        to top,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0) 1px,
        var(--color-grey10) 1px,
        var(--color-grey10) 2px,
        rgba(0, 0, 0, 0) 2px
      );
    }
  }

  .colormode-sepia & {
    *::selection {
      background-color: #dde2d2 !important;
      color: #3b3934 !important;
    }

    .highlight {
      position: relative;
      background-color: #fedda7;
      color: #3b3934;
    }
    a .highlight,
    a.highlight {
      text-shadow:
        -1px -1px 0 #fedda7,
        1px -1px 0 #fedda7,
        -1px 1px 0 #fedda7,
        1px 1px 0 #fedda7 !important;
      background-image: linear-gradient(
        to top,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0) 1px,
        #3b3934 1px,
        #3b3934 2px,
        rgba(0, 0, 0, 0) 2px
      );
    }
  }
`
