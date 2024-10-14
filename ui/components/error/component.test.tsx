// Test Utilities
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { localeWrapper as wrapper } from '@config/jest/wrapper'

// Components
import { Error as Component } from '.'

describe('renders Error', () => {
  it('with defaults', () => {
    const rendered = render(<Component message={'Something has gone wrong'} title={'Oh no'} />, {
      wrapper
    })
    const renderedComponent = screen.getByTestId('error')
    expect(renderedComponent).toBeInTheDocument()
    expect(rendered.container).toMatchSnapshot()
  })
})
