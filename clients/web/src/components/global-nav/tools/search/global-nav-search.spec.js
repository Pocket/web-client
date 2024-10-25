import { render, mockModal } from '@config/jest'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import GlobalNavSearch from './global-nav-search'

const baseProps = {
  onSubmit: () => {},
  placeholder: 'Storybook placeholder text'
}

jest.mock('next/router', () => jest.requireActual('next-router-mock'))

describe('GlobalNavSearch', () => {
  mockModal()
  it('applies the `placeholder` prop value correctly to the input', () => {
    const { getByPlaceholderText } = render(<GlobalNavSearch {...baseProps} />)
    expect(getByPlaceholderText(baseProps.placeholder))
  })

  it('calls the onSubmit callback when the form is submitted', async () => {
    const mockSubmit = jest.fn()
    const { getByTestId } = render(
      <GlobalNavSearch {...baseProps} onSubmit={mockSubmit} value="for a moment like this" />
    )
    await userEvent.click(getByTestId('search-submit'))
    expect(mockSubmit).toHaveBeenCalledWith('for a moment like this')
  })

  it('does not render a close button when no onClose is provided', () => {
    const { queryByTestId } = render(<GlobalNavSearch {...baseProps} />)
    expect(queryByTestId('search-close')).toBeFalsy()
  })

  it('calls the onClose callback when the Close button is clicked', async () => {
    const mockClose = jest.fn()
    const { getByTestId } = render(<GlobalNavSearch {...baseProps} onClose={mockClose} />)
    await userEvent.click(getByTestId('search-cancel'))
    expect(mockClose).toHaveBeenCalled()
  })

  it('calls the onFocus callback when the search input is focused, passing the Event object', () => {
    const mockFocus = jest.fn()
    render(<GlobalNavSearch {...baseProps} onFocus={mockFocus} />)

    userEvent.tab()
    expect(mockFocus).toHaveBeenCalled()
  })

  it('calls the onBlur callback when the search input is blurred, passing the Event object', () => {
    const mockBlur = jest.fn()
    render(<GlobalNavSearch {...baseProps} onFocus={mockBlur} />)

    userEvent.tab()
    userEvent.tab()
    expect(mockBlur).toHaveBeenCalled()
  })

  it('supplies the search input with a value if a `value` prop was passed in', () => {
    const { getByTestId } = render(
      <GlobalNavSearch {...baseProps} value="for a moment like this" />
    )
    expect(getByTestId('search-input').value).toBe('for a moment like this')
  })
})
