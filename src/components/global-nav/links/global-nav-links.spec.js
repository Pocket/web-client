import { render, fireEvent } from '@config/jest'
import '@testing-library/jest-dom'

import GlobalNavLinks from './global-nav-links'
const baseProps = {
  links: [
    {
      name: 'cheeses',
      label: 'Cheeses',
      url: 'https://cheese.com'
    },
    { name: 'chocolates', label: 'Chocolates', url: 'https://frans.com' }
  ]
}
const { links } = baseProps

describe('GlobalNavLinks', () => {
  it('renders the correct number of links', () => {
    const { getAllByRole } = render(<GlobalNavLinks {...baseProps} />)
    const linkAnchors = getAllByRole('link')
    expect(linkAnchors).toHaveLength(2)
  })

  it('renders the links with correct labels and urls as specified in the `links` prop', () => {
    const { getByText } = render(<GlobalNavLinks {...baseProps} />)
    links.forEach((link) => {
      expect(getByText(link.label)).toHaveAttribute('href', link.url)
    })
  })

  it('applies the "selected" link state correctly based on props.selectedLink', () => {
    const { getByText } = render(<GlobalNavLinks {...baseProps} selectedLink={links[0].name} />)

    expect(getByText(links[0].label)).toHaveClass('selected')
    expect(getByText(links[1].label)).not.toHaveClass('selected')
  })

  it('calls the onLinkClick callback with the name and url of a link when clicked', () => {
    const onLinkClick = jest.fn()
    const { getAllByRole } = render(<GlobalNavLinks {...baseProps} onLinkClick={onLinkClick} />)
    const linkAnchors = getAllByRole('link')
    fireEvent.click(linkAnchors[0])
    expect(onLinkClick).toHaveBeenCalledWith(links[0].name, links[0].url)
  })
})
