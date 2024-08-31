// Test Utilities
import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'

// Components
import { NavTop as Component } from '.'

describe('renders NavTop', () => {
  it('with defaults', async () => {
    await act(() => {
      render(<Component />)
    })

    const renderedComponent = screen.getByTestId('nav-top')
    expect(renderedComponent).toBeInTheDocument()
    expect(renderedComponent).toMatchSnapshot()
  })
})
