import { wrappedRender, mockModal } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

import GlobalNavSearch from './global-nav-search'

const baseProps = {
  onSubmit: () => {},
  placeholder: 'Storybook placeholder text'
}

describe('GlobalNavSearch', () => {
  mockModal()
  it('applies the `placeholder` prop value correctly to the input', () => {
    const { getByPlaceholderText } = wrappedRender(<GlobalNavSearch {...baseProps} />)
    expect(getByPlaceholderText(baseProps.placeholder))
  })

  it('calls the onSubmit callback when the form is submitted', async () => {
    const user = userEvent.setup()
    const mockSubmit = jest.fn()
    const { getByCy } = wrappedRender(
      <GlobalNavSearch {...baseProps} onSubmit={mockSubmit} value="for a moment like this" />
    )
    await user.click(getByCy('search-submit'))
    expect(mockSubmit).toHaveBeenCalledWith('for a moment like this')
  })

  it('does not render a close button when no onClose is provided', async () => {
    const { queryByCy } = wrappedRender(<GlobalNavSearch {...baseProps} />)
    expect(queryByCy('search-close')).toBeFalsy()
  })

  it('calls the onClose callback when the Close button is clicked', async () => {
    const user = userEvent.setup()
    const mockClose = jest.fn()
    const { getByCy } = wrappedRender(<GlobalNavSearch {...baseProps} onClose={mockClose} />)
    await user.click(getByCy('search-cancel'))
    expect(mockClose).toHaveBeenCalled()
  })

  it('calls the onFocus callback when the search input is focused, passing the Event object', async () => {
    const mockFocus = jest.fn()
    const user = userEvent.setup()
    wrappedRender(<GlobalNavSearch {...baseProps} onFocus={mockFocus} />)

    await user.tab()
    expect(mockFocus).toHaveBeenCalled()
  })

  it('calls the onBlur callback when the search input is blurred, passing the Event object', async () => {
    const mockBlur = jest.fn()
    const user = userEvent.setup()
    wrappedRender(<GlobalNavSearch {...baseProps} onFocus={mockBlur} />)

    await user.tab()
    await user.tab()
    expect(mockBlur).toHaveBeenCalled()
  })

  it('supplies the search input with a value if a `value` prop was passed in', () => {
    const { getByCy } = wrappedRender(
      <GlobalNavSearch {...baseProps} value="for a moment like this" />
    )
    expect(getByCy('search-input').value).toBe('for a moment like this')
  })
})
