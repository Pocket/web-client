// Test Utilities
import '@testing-library/jest-dom'
import { localeWrapper as wrapper } from '@config/jest/wrapper'
import { act, render, screen } from '@testing-library/react'

// Components
import { NavTopAccount as Component } from '.'

describe('renders NavTopAccount', () => {
  it('with defaults', async () => {
    await act(() => {
      render(<Component />, { wrapper })
    })

    const renderedComponent = screen.getByTestId('nav-top-account')
    expect(renderedComponent).toBeInTheDocument()
    expect(renderedComponent).toMatchSnapshot()
  })
})
