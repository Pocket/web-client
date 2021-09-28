import { css } from 'linaria'

export const accountStyles = css`
  h1 {
    grid-column: 1/-1;
    font-family: 'Graphik Web';
    font-style: normal;
    font-weight: 600;
    font-size: 2.5rem;
    line-height: 1.2;
  }
  h2 {
    grid-column: 1/-1;
    font-family: var(--fontSansSerif);
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.25;
    color: var(--color-textPrimary);
    margin-bottom: 0.5rem;
  }

  h4 {
    grid-column: 1/-1;
    font-family: var(--fontSansSerif);
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 1.25;
    color: var(--color-textSecondary);
    margin-bottom: 0.5rem;
  }

  section {
    grid-template-columns: repeat(12, 1fr);
    padding: 3rem 0;
    border-bottom: var(--dividerStyle);
    &:first-of-type {
      padding-top: 0;
    }
    &:last-of-type {
      border: none;
    }
  }
  .sectionBody {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-row-gap: 0.5rem;
    grid-column-gap: 1rem;
    border-bottom: var(--dividerStyle);
    padding: 2rem 0;
    font-family: var(--fontSansSerif);
    &:last-of-type {
      border: none;
    }
  }
  label {
    font-size: 1rem;
    grid-column: 1 / span 2;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    &.full {
      justify-content: flex-start;
      grid-column: 3 / span 5;
    }
    &.flush {
      justify-content: flex-start;
      grid-column: 2 / span 6;
      margin-left: 0;
    }
  }
  .contentDisplay {
    padding: 0.5rem 0;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 1.25;
    color: var(--color-textSecondary);
    grid-column: 3 / span 5;
    max-width: 100%;
    display: flex;
    align-items: center;
    align-content: center;
  }
  .subButton {
    grid-column: span 2;
  }
  input[type='text'] {
    grid-column: 3 / span 5;
    max-width: 100%;
  }
  input[type='checkbox'] {
    margin: 0;
    &:before {
      margin-top: 2px;
    }
  }
  select {
    grid-column: 2 / span 5;
  }

  .labelWithContext {
    display: block;
  }

  .contextCopy,
  .helperText {
    font-size: 0.875rem;
    font-style: italic;
    color: var(--color-textSecondary);
  }

  .contextCopy {
    padding-top: 1rem;
    grid-column: 3 / -1;
    ul {
      margin: 0.5rem 0 0;
      font-size: 0.875em;
    }
  }

  .helperText {
    max-width: 400px;
    grid-column: 3 / span 5;
    margin-bottom: 0.5rem;
    &.full {
      grid-column: 2 / span 6;
    }
  }

  .actionBlock {
    grid-column: 3 / span 6;

    margin-top: 1rem;
    .action {
      margin-right: 1rem;
      border: 2px solid inherit;
    }
  }

  .actionInline {
    grid-column: 8 / span 2;
    white-space: nowrap;
  }

  .connectionLabel {
    justify-content: flex-start;
    grid-column: 2 / span 6;
  }
`
