import { render } from '@config/jest'
import '@testing-library/jest-dom'
import { useIntersectionObserver } from 'common/utilities/intersection/intersection'
import { SideNav } from './side-nav'

jest.mock('common/utilities/intersection/intersection')
const mockEntry = { isIntersecting: true }

describe('SideNav', () => {
  const handleClick = () => {}

  const baseProps = {
    isDisabled: false,
    subset: 'tag',
    isLoggedIn: true,
    pinned: ['home', 'space'],
    tag: '_untagged_',
    flagsReady: true,
    trackMenuClick: handleClick
  }

  it('renders the Saves side nav and shows tags', () => {
    useIntersectionObserver.mockReturnValue(mockEntry)

    const { queryByTestId, queryAllByTestId } = render(<SideNav type="saves" {...baseProps} />)

    // Main section
    expect(queryByTestId('side-nav-home')).toBeInTheDocument()
    expect(queryByTestId('side-nav-saves')).toBeInTheDocument()
    expect(queryByTestId('side-nav-discover')).toBeInTheDocument()
    expect(queryByTestId('side-nav-collections')).toBeInTheDocument()

    // Filters section
    expect(queryByTestId('side-nav-archive')).toBeInTheDocument()
    expect(queryByTestId('side-nav-favorites')).toBeInTheDocument()
    expect(queryByTestId('side-nav-highlights')).toBeInTheDocument()
    expect(queryByTestId('side-nav-articles')).toBeInTheDocument()
    expect(queryByTestId('side-nav-videos')).toBeInTheDocument()

    // Tags section
    expect(queryByTestId('side-nav-all-tags')).toBeInTheDocument()
    expect(queryAllByTestId(/side-nav-tags-(.+)/)).toHaveLength(2)

    // Snapshot
    expect(queryByTestId('side-nav')).toMatchSnapshot()
  })

  it('renders the Account side nav', () => {
    const { queryByTestId } = render(<SideNav type="account" />)

    // Main section
    expect(queryByTestId('side-nav-home')).toBeInTheDocument()
    expect(queryByTestId('side-nav-saves')).toBeInTheDocument()
    expect(queryByTestId('side-nav-discover')).toBeInTheDocument()
    expect(queryByTestId('side-nav-collections')).toBeInTheDocument()

    // Filters section
    expect(queryByTestId('side-nav-archive')).not.toBeInTheDocument()
    expect(queryByTestId('side-nav-favorites')).not.toBeInTheDocument()
    expect(queryByTestId('side-nav-highlights')).not.toBeInTheDocument()
    expect(queryByTestId('side-nav-articles')).not.toBeInTheDocument()
    expect(queryByTestId('side-nav-videos')).not.toBeInTheDocument()

    // Tags section
    expect(queryByTestId('side-nav-all-tags')).not.toBeInTheDocument()

    // Placeholder for when we might add more to the account sidebar
    expect(queryByTestId('side-nav-account')).toBeInTheDocument()

    // Snapshot
    expect(queryByTestId('side-nav')).toMatchSnapshot()
  })
})
