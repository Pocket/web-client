import React from 'react'
import assert from 'assert'
import { shallow } from 'enzyme'
import { testIdSelector } from '@pocket/web-utilities/test-utils'
import { PocketHitsIllustratedChyron } from './pocket-hits-illustrated-chyron'

describe('PocketHitsIllustratedChyron', () => {
  it('shows the form and hides the success message by default', () => {
    const element = shallow(<PocketHitsIllustratedChyron />)
    let form = element.find(testIdSelector('pocket-hits-chyron'))
    let successMessage = element.find(
      testIdSelector('pocket-hits-chyron-success')
    )
    assert(form.exists())
    assert(!successMessage.exists())
  })

  it('shows the success message and hides the form when isSuccessful', () => {
    const element = shallow(<PocketHitsIllustratedChyron isSuccessful />)
    let form = element.find(testIdSelector('pocket-hits-chyron'))
    let successMessage = element.find(
      testIdSelector('pocket-hits-chyron-success')
    )
    assert(!form.exists())
    assert(successMessage.exists())
  })
})
