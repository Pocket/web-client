import { css } from 'linaria'
import { Button } from 'components/buttons/button'
import Link from 'next/link'

const linkStyles = css`
  h6 {
    padding-top: 2rem;
    font-weight: 600;
  }
  .link {
    border-radius: var(--borderRadius);
    border: 1px solid var(--color-calloutBackgroundPrimary);
    background-color: var(--color-calloutBackgroundPrimary);
    display: flex;
    padding: 0.5rem;
    text-decoration: none;
    &:hover {
      color: var(--color-textPrimary);
      border-color: var(--color-formFieldBorder);
    }
  }
  .title {
    font-weight: 500;
    padding-right: 1rem;
  }
  .description {
    color: var(--color-textSecondary);
  }
`

export const Links = ({ toggleDevMode }) => {
  const links = []

  return links.length ? (
    <div className={linkStyles}>
      <h6>Links in progress</h6>
      {links.map((link) => (
        <Link href={link.src} key={link.title}>
          <a onClick={toggleDevMode} className="link">
            <div className="title">{link.title}</div>
            <div className="description">{link.description}</div>
          </a>
        </Link>
      ))}
    </div>
  ) : null
}
