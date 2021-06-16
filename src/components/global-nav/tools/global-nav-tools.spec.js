import { render, fireEvent } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'
import { PlayIcon, TagIcon } from '@pocket/web-ui'

import GlobalNavTools from './global-nav-tools'

// Mock modal
const setAppElementStub = jest.fn()
const ReactModalMock = ({ children }) => <div>{children}</div>
ReactModalMock.setAppElement = setAppElementStub
jest.mock('react-modal', () => ReactModalMock)

let portalRoot = document.getElementById('portal')
if (!portalRoot) {
  const portalRoot = document.createElement('div')
  portalRoot.setAttribute('id', 'root')
  document.body.appendChild(portalRoot)
}

describe('GlobalNavTools', () => {
  const baseProps = {
    tools: [
      {
        name: 'cheeses',
        label: 'Cheeses',
        icon: <PlayIcon data-cy="play-icon" />
      },
      { name: 'chocolates', label: 'Chocolates', icon: <TagIcon data-cy="tag-icon" /> }
    ]
  }

  it('renders the correct number of buttons', () => {
    const { getAllByRole } = render(<GlobalNavTools {...baseProps} />)
    expect(getAllByRole('button')).toHaveLength(2)
  })

  it('renders the buttons with correct title attributes as specified in the `tools` prop', () => {
    const { queryByLabelText } = render(<GlobalNavTools {...baseProps} />)
    expect(queryByLabelText(baseProps.tools[0].label)).toBeTruthy()
    expect(queryByLabelText(baseProps.tools[1].label)).toBeTruthy()
  })

  it('renders the buttons with correct icons as specified in the `links` prop', () => {
    const { queryByCy } = render(<GlobalNavTools {...baseProps} />)
    expect(queryByCy('play-icon')).toBeTruthy()
    expect(queryByCy('tag-icon')).toBeTruthy()
  })

  it('calls the props.onToolClick callback with the name of the tool when clicked', () => {
    const handleClick = jest.fn()
    const { getAllByRole } = render(<GlobalNavTools {...baseProps} onToolClick={handleClick} />)
    const buttons = getAllByRole('button')
    fireEvent.click(buttons[0])
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
