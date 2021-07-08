import renderer from 'react-test-renderer'
import { ArrowLink } from './arrow-link'

it('arrowLink renders correctly', () => {
  const args = { 
    href: 'https://getpocket.com/explore',
    target: '_blank',
    onClick: () => {},
    margin: '100px 50px'
  }
  const tree = renderer
  .create(<ArrowLink {...args}>Test Link</ArrowLink>)
  .toJSON()
  expect(tree).toMatchSnapshot()
})
