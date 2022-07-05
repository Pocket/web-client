import { css } from 'linaria'

/**
 * Typography *
 * These styles define baseline/root font sizing and aid in the basic styling of
 * standard text tags such as headings, paragraphs, and lists.
 */

export const Typography = css`
  :global() {
    :root {
      font-size: var(--fontSizeRoot);
    }

    body {
      font-family: var(--fontSerif);
      color: var(--color-textPrimary);
      background-color: var(--color-canvas);
    }

    h1,
    .h1 {
      font-size: 3rem;
      line-height: 125%;
      margin: 0 0 2.5rem 0;
    }

    h2,
    .h2 {
      font-size: 2.5rem;
      line-height: 120%;
      margin: 0 0 1.5rem 0;
    }

    h3,
    .h3 {
      font-size: 2rem;
      line-height: 120%;
      margin: 0 0 1.5rem 0;
    }

    h4,
    .h4 {
      font-size: 1.75rem;
      line-height: 128%;
      margin: 0 0 1.5rem 0;
    }

    h5,
    .h5 {
      font-size: 1.5rem;
      line-height: 122%;
      margin: 0 0 1rem 0;
    }

    h6,
    .h6 {
      font-size: 1.25rem;
      line-height: 126%;
      margin: 0 0 1rem 0;
    }

    p {
      font-size: 1.25rem;
      margin: 0 0 1.5rem 0;
    }

    ul,
    ol {
      font-size: 1.25rem;
      /* padding uses 'em' to be relative to the list's font size */
      padding: 0 0 0 1.5em;
      margin: 0 0 1.5rem 0;
    }
  }
`
