import { render, fireEvent, mockModal } from '@config/jest'
import '@testing-library/jest-dom'
import GlobalNavMobileMenu from './global-nav-mobile-menu'

const baseProps = {
  appRootSelector: '#root',
  isOpen: true,
  links: [
    {
      name: 'cheeses',
      id: 'cheeses-id',
      label: 'Cheeses',
      url: 'https://cheese.com'
    },
    {
      name: 'chocolates',
      id: 'chocolates-id',
      label: 'Chocolates',
      url: 'https://frans.com'
    }
  ]
}

const { links } = baseProps

describe('GlobalNavMobileMenu', () => {
  mockModal()

  it('shows the menu when `isOpen` is true', () => {
    const { getByTestId } = render(<GlobalNavMobileMenu {...baseProps} isOpen={true} />)
    expect(getByTestId('mobile-menu'))
  })

  it('does not show the menu when `isOpen` is false', () => {
    // Menu is held in the drawer component
    const { queryByTestId } = render(<GlobalNavMobileMenu {...baseProps} isOpen={false} />)
    expect(queryByTestId('mobile-menu')).toBeFalsy()
  })

  it('renders a premium section only when a user is logged in, but NOT premium', () => {
    const { getByTestId } = render(
      <GlobalNavMobileMenu {...baseProps} isUserLoggedIn={true} isUserPremium={false} />
    )
    expect(getByTestId('premium-nudge-section'))
  })

  it('does not renders a premium section when a user is premium', () => {
    const { queryByTestId } = render(
      <GlobalNavMobileMenu {...baseProps} isUserLoggedIn={true} isUserPremium={true} />
    )
    expect(queryByTestId('premium-nudge-section')).toBeFalsy()
  })

  it('renders the correct number of links', () => {
    const { getAllByRole } = render(<GlobalNavMobileMenu {...baseProps} />)
    expect(getAllByRole('link')).toHaveLength(2)
  })

  it('renders the links with correct labels as specified in the `links` prop', () => {
    const { getByText } = render(<GlobalNavMobileMenu {...baseProps} />)
    links.forEach((link) => {
      expect(getByText(link.label)).toHaveAttribute('href', link.url)
    })
  })

  it('applies the "selected" link state correctly based on props.selectedLink', () => {
    const { getByText } = render(
      <GlobalNavMobileMenu {...baseProps} selectedLink={links[0].name} />
    )

    expect(getByText(links[0].label)).toHaveClass('selected')
    expect(getByText(links[1].label)).not.toHaveClass('selected')
  })

  it('calls the props.onLinkClick callback with the name and url of a link when clicked', () => {
    const onLinkClick = jest.fn()
    const { getAllByRole } = render(
      <GlobalNavMobileMenu {...baseProps} onLinkClick={onLinkClick} />
    )
    const linkAnchors = getAllByRole('link')
    fireEvent.click(linkAnchors[0])
    expect(onLinkClick).toHaveBeenCalledWith(links[0].name, links[0].url)
  })
})
