import { sectionStyles } from 'components/dev-tools/tool-styles'
import { useSelector } from 'react-redux'
import Link from 'next/link'

export const Links = ({ toggleDevMode }) => {
  const userId = useSelector((state) => state?.user?.user_id)

  const links = [
    {
      src: `/profile/${userId}?src=navbar`,
      title: 'Profile',
      description: 'Articles you Recommended'
    },
    {
      src: `/saves`,
      title: 'Saves',
      description: 'Temporary; remove after My List to Saves goes live'
    }
  ]

  return links.length ? (
    <div className={sectionStyles}>
      <h6>Links in progress</h6>
      {links.map((link) => (
        <Link href={link.src} key={link.title}>
          <a onClick={toggleDevMode} className="action-block">
            <div className="title">{link.title}</div>
            <div className="description">{link.description}</div>
          </a>
        </Link>
      ))}
    </div>
  ) : null
}
