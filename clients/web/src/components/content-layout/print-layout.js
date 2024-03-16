import { css } from '@emotion/css'

export const printLayout = css`
  @media print {
    display: block;
    padding: 0;

    & > div {
      padding: 0;
      margin: 0;
      max-width: unset;
    }

    .content-section {
      display: block;
    }

    .left-aside,
    .right-aside,
    .save-article,
    .pocket-recs,
    .cardTopicsNav {
      display: none;
    }

    img {
      max-width: 500px;
    }

    :after {
      margin-top: 1rem;
      content: 'Printed with ❤️ from Pocket';
    }
  }
`
