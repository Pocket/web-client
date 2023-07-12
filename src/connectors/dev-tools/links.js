import { sectionStyles } from 'components/dev-tools/tool-styles'
import Link from 'next/link'

export const Links = ({ toggleDevMode }) => {
  const links = [
    {
      title: 'Trailhead',
      src: '/trailhead',
      description: 'inaccessible canary for waypoint auth'
    },
    {
      title: 'Pocket Hits Signup',
      src: '/explore/pocket-hits-signup',
      description: 'wip migration of the discover page'
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
