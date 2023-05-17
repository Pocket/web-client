import { wrappedRender } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'
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

    const { queryByCy, queryAllByCy } = wrappedRender(<SideNav type="saves" {...baseProps} />)

    // Main section
    expect(queryByCy('side-nav-home')).toBeInTheDocument()
    expect(queryByCy('side-nav-saves')).toBeInTheDocument()
    expect(queryByCy('side-nav-discover')).toBeInTheDocument()
    expect(queryByCy('side-nav-collections')).toBeInTheDocument()

    // Filters section
    expect(queryByCy('side-nav-archive')).toBeInTheDocument()
    expect(queryByCy('side-nav-favorites')).toBeInTheDocument()
    expect(queryByCy('side-nav-highlights')).toBeInTheDocument()
    expect(queryByCy('side-nav-articles')).toBeInTheDocument()
    expect(queryByCy('side-nav-videos')).toBeInTheDocument()

    // Tags section
    expect(queryByCy('side-nav-all-tags')).toBeInTheDocument()
    expect(queryAllByCy(/side-nav-tags-(.+)/)).toHaveLength(2)

    // Snapshot
    expect(queryByCy('side-nav')).toMatchSnapshot()
  })

  it('renders the Account side nav', () => {
    const { queryByCy } = wrappedRender(<SideNav type="account" />)

    // Main section
    expect(queryByCy('side-nav-home')).toBeInTheDocument()
    expect(queryByCy('side-nav-saves')).toBeInTheDocument()
    expect(queryByCy('side-nav-discover')).toBeInTheDocument()
    expect(queryByCy('side-nav-collections')).toBeInTheDocument()

    // Filters section
    expect(queryByCy('side-nav-archive')).not.toBeInTheDocument()
    expect(queryByCy('side-nav-favorites')).not.toBeInTheDocument()
    expect(queryByCy('side-nav-highlights')).not.toBeInTheDocument()
    expect(queryByCy('side-nav-articles')).not.toBeInTheDocument()
    expect(queryByCy('side-nav-videos')).not.toBeInTheDocument()

    // Tags section
    expect(queryByCy('side-nav-all-tags')).not.toBeInTheDocument()

    // Placeholder for when we might add more to the account sidebar
    expect(queryByCy('side-nav-account')).toBeInTheDocument()

    // Snapshot
    expect(queryByCy('side-nav')).toMatchSnapshot()
  })
})
