import { css } from '@emotion/css'
export const sectionStyles = css`
  padding: 0 0 1rem 0;
  h6 {
    font-weight: 600;
  }

  .flags {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 1rem;
    padding-bottom: 1rem;
  }

  section,
  .action-block,
  .link {
    cursor: pointer;
    border-radius: var(--borderRadius);
    border: 1px solid var(--color-calloutBackgroundPrimary);
    background-color: var(--color-calloutBackgroundPrimary);
    display: flex;
    padding: 0.5rem;
    text-decoration: none;
    margin-bottom: 1rem;
    &:hover {
      color: var(--color-textPrimary);
      border-color: var(--color-formFieldBorder);
    }

    &.error {
      background-color: var(--color-error);
      color: white;
    }

    &.stacked {
      flex-direction: column;
    }
  }

  & + section {
    margin-top: 1rem;
  }

  &.error {
    background-color: var(--color-error);
    color: white;
  }

  .title {
    font-weight: 500;
    padding-right: 1rem;
  }
  .link-block {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 1rem;
    .link {
      justify-content: center;
      align-items: center;
    }
    .icon {
      margin-right: 0.725rem;
      height: 24px;
    }
  }
  .description {
    color: var(--color-textSecondary);
    word-break: break-all;
  }
`
