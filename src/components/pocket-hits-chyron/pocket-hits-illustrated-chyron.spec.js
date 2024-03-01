import { render } from '@config/jest'
import '@testing-library/jest-dom'
import { PocketHitsIllustratedChyron } from './pocket-hits-illustrated-chyron'

jest.mock('static/images/pocket-hits-chyron/border.svg', () => 'svg')
jest.mock('static/images/pocket-hits-chyron/envelope-green.svg', () => 'svg')
jest.mock('static/images/pocket-hits-chyron/envelope-red.svg', () => 'svg')

describe('PocketHitsIllustratedChyron', () => {
  it('shows the form and hides the success message by default', () => {
    const { queryByTestId, getByTestId } = render(<PocketHitsIllustratedChyron />)
    expect(getByTestId('pocket-hits-chyron'))
    expect(queryByTestId('pocket-hits-chyron-success')).toBeFalsy()
  })

  it('shows the success message and hides the form when isSuccessful', () => {
    const { queryByTestId, getByTestId } = render(<PocketHitsIllustratedChyron isSuccessful />)
    expect(queryByTestId('pocket-hits-chyron')).toBeFalsy()
    expect(getByTestId('pocket-hits-chyron-success'))
  })
})
