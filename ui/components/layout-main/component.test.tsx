// Test Utilities
import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'

// Components
import { LayoutMain as Component } from '.'

describe('renders LayoutMain', () => {
  it('with defaults', async () => {
    await act(() => {
      render(<Component />)
    })

    const renderedComponent = screen.getByTestId('layout-main')
    expect(renderedComponent).toBeInTheDocument()
    expect(renderedComponent).toMatchSnapshot()
  })
})
