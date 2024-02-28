import { wrappedRender, mockModal } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

import GlobalNavSearch from './global-nav-search'

const baseProps = {
  onSubmit: () => {},
  placeholder: 'Storybook placeholder text'
}

jest.mock('next/router', () => require('next-router-mock'))

describe('GlobalNavSearch', () => {
  mockModal()
  it('applies the `placeholder` prop value correctly to the input', () => {
    const { getByPlaceholderText } = wrappedRender(<GlobalNavSearch {...baseProps} />)
    expect(getByPlaceholderText(baseProps.placeholder))
  })

  it('calls the onSubmit callback when the form is submitted', async () => {
    const mockSubmit = jest.fn()
    const { getByCy } = wrappedRender(
      <GlobalNavSearch {...baseProps} onSubmit={mockSubmit} value="for a moment like this" />
    )
    await userEvent.click(getByCy('search-submit'))
    expect(mockSubmit).toHaveBeenCalledWith('for a moment like this')
  })

  it('does not render a close button when no onClose is provided', () => {
    const { queryByCy } = wrappedRender(<GlobalNavSearch {...baseProps} />)
    expect(queryByCy('search-close')).toBeFalsy()
  })

  it('calls the onClose callback when the Close button is clicked', async () => {
    const mockClose = jest.fn()
    const { getByCy } = wrappedRender(<GlobalNavSearch {...baseProps} onClose={mockClose} />)
    await userEvent.click(getByCy('search-cancel'))
    expect(mockClose).toHaveBeenCalled()
  })

  it('calls the onFocus callback when the search input is focused, passing the Event object', () => {
    const mockFocus = jest.fn()
    wrappedRender(<GlobalNavSearch {...baseProps} onFocus={mockFocus} />)

    userEvent.tab()
    expect(mockFocus).toHaveBeenCalled()
  })

  it('calls the onBlur callback when the search input is blurred, passing the Event object', () => {
    const mockBlur = jest.fn()
    wrappedRender(<GlobalNavSearch {...baseProps} onFocus={mockBlur} />)

    userEvent.tab()
    userEvent.tab()
    expect(mockBlur).toHaveBeenCalled()
  })

  it('supplies the search input with a value if a `value` prop was passed in', () => {
    const { getByCy } = wrappedRender(
      <GlobalNavSearch {...baseProps} value="for a moment like this" />
    )
    expect(getByCy('search-input').value).toBe('for a moment like this')
  })
})
