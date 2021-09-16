import { css } from 'linaria'

export const accountStyles = css`
  h1,
  h2,
  h3,
  h4 {
    grid-column: 1/-1;
    font-family: var(--fontSansSerif);
    line-height: 1.25;
    margin-bottom: 0.5rem;
    color: var(--color-textPrimary);
  }
  h1 {
    font-size: 2.5rem;
    font-weight: 600;
  }
  h2 {
    font-size: 1.25rem;
    font-weight: 500;
  }
  h4 {
    font-size: 1.125rem;
    font-weight: 400;
    color: var(--color-textSecondary);
  }

  section {
    padding: 3rem 0;
    border-bottom: var(--dividerStyle);
    &:first-of-type {
      padding-top: 0;
    }
    &:last-of-type {
      border: none;
    }
  }
`
