// Test Utilities
import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'

// Components
import { NavTopAccountProfile as Component } from '.'

describe('renders NavTopAccountProfile', () => {
  it('with defaults', async () => {
    await act(() => {
      render(<Component />)
    })

    const renderedComponent = screen.getByTestId('nav-top-account-profile')
    expect(renderedComponent).toBeInTheDocument()
    expect(renderedComponent).toMatchSnapshot()
  })
})
