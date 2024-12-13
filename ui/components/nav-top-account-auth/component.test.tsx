// Test Utilities
import '@testing-library/jest-dom'
import { localeWrapper as wrapper } from '@config/jest/wrapper'
import { render, screen } from '@testing-library/react'

// Components
import { NavTopAccountAuth as Component } from '.'

describe('renders NavTopAccountAuth', () => {
  it('with defaults', async () => {
    render(<Component />, { wrapper })

    const renderedComponent = await screen.findByTestId('nav-top-account-auth')
    expect(renderedComponent).toBeInTheDocument()
    expect(renderedComponent).toMatchSnapshot()
  })
})
