// Test Utilities
import { render, screen } from '@config/jest'
import '@testing-library/jest-dom'

// Components
import { Placard as Component } from '.'

describe('renders Placard', () => {
  it('with defaults', () => {
    const rendered = render(<Component/>)
    const renderedComponent = screen.getByTestId('placard')
    expect(renderedComponent).toBeInTheDocument()
    expect(rendered.container).toMatchSnapshot()
  })
})
