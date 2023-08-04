import { sectionStyles } from 'components/dev-tools/tool-styles'
import Link from 'next/link'

export const Links = ({ toggleDevMode }) => {
  const links = [
    {
      title: 'FXA Learn More',
      src: '/learn-more',
      description: 'future blockade for non-fxa users'
    }
  ]

  return links.length ? (
    <div className={sectionStyles}>
      <h6>Links in progress</h6>
      {links.map((link) => (
        <Link href={link.src} key={link.title} onClick={toggleDevMode} className="action-block">
          <div className="title">{link.title}</div>
          <div className="description">{link.description}</div>
        </Link>
      ))}
    </div>
  ) : null
}
