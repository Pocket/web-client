import { sectionStyles } from 'components/dev-tools/tool-styles'
import Link from 'next/link'

export const Links = ({ toggleDevMode }) => {
  const links = [{
    title: 'All Lists',
    src: '/lists',
    description: 'Link to the All Lists page'
  },{
    title: 'Individual List',
    src: '/lists/the-cosmos-awaits-12345',
    description: 'Link to an Individual List page'
  },{
    title: 'Public List',
    src: '/@luigimario/list/the-cosmos-awaits-12345',
    description: 'Link to a Public page'
  }]

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
