// Test Utilities
import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'

// Components
import { NavTopAccount as Component } from '.'

describe('renders NavTopAccount', () => {
  it('with defaults', async () => {
    await act(() => {
      render(<Component />)
    })

    const renderedComponent = screen.getByTestId('nav-top-account')
    expect(renderedComponent).toBeInTheDocument()
    expect(renderedComponent).toMatchSnapshot()
  })
})
