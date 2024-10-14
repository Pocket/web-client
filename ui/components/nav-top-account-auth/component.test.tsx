// Test Utilities
import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'

import { localeWrapper as wrapper } from '@config/jest/wrapper'

// Components
import { NavTopAccountAuth as Component } from '.'

describe('renders NavTopAccountAuth', () => {
  it('with defaults', async () => {
    await act(() => {
      render(<Component />, { wrapper })
    })

    const renderedComponent = screen.getByTestId('nav-top-account-auth')
    expect(renderedComponent).toBeInTheDocument()
    expect(renderedComponent).toMatchSnapshot()
  })
})
