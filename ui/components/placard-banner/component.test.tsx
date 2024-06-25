// Test Utilities
import { render, screen } from '@config/jest'
import '@testing-library/jest-dom'

// Components
import { PlacardBanner as Component } from '.'

describe('renders PlacardBanner', () => {
  it('with defaults', () => {
    const rendered = render(<Component/>)
    const renderedComponent = screen.getByTestId('placard-banner')
    expect(renderedComponent).toBeInTheDocument()
    expect(rendered.container).toMatchSnapshot()
  })
})
