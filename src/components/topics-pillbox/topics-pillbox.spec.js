import React from 'react'
import assert from 'assert'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { mockEvent } from '@pocket/web-utilities/test-utils'

import TopicsPillbox from './topics-pillbox'

const mockTopicsData = {
  classics: {
    curator_label: 'Classics',
    display_name: 'Classics',
    is_promoted: false,
    page_type: 'topic_page',
    topic: 'classics',
    topic_slug: 'classics'
  },
  superheroes: {
    curator_label: 'Superheroes',
    display_name: 'Superheroes',
    is_promoted: true,
    page_type: 'topic_page',
    topic: 'superheroes',
    topic_slug: 'superheroes'
  },
  looneyTunes: {
    curator_label: 'Looney Tunes',
    display_name: 'Looney Tunes',
    is_promoted: false,
    page_type: 'topic_page',
    topic: 'looneyTunes',
    topic_slug: 'looneyTunes'
  }
}

const baseProps = {
  id: 'pez-dispenser',
  topicsMap: mockTopicsData
}

describe('TopicsPillbox', () => {
  it('applies the center alignment css class if props.alignItems="center"', () => {
    const pillbox = shallow(
      <TopicsPillbox {...baseProps} alignItems="center" />
    )

    assert(pillbox.hasClass('align-center'))
  })

  it('renders custom heading text if props.headingText is provided', () => {
    const pillbox1 = shallow(<TopicsPillbox {...baseProps} />)
    const pillbox2 = shallow(
      <TopicsPillbox {...baseProps} headingText="Nom nom nom" />
    )
    const heading1 = pillbox1.find("[data-cy='heading']")
    const heading2 = pillbox2.find("[data-cy='heading']")

    assert.equal(heading1.text(), TopicsPillbox.defaultProps.headingText)
    assert.equal(heading2.text(), 'Nom nom nom')
  })

  it('adds a custom heading css class if props.headingClassName is provided', () => {
    const pillbox = shallow(
      <TopicsPillbox {...baseProps} headingClassName="the-sweetness" />
    )
    const heading = pillbox.find("[data-cy='heading']")

    assert(heading.hasClass('the-sweetness'))
  })

  it('renders a pill for each topic in the topics data map', () => {
    const pillbox = shallow(
      <TopicsPillbox {...baseProps} headingClassName="the-sweetness" />
    )
    const pills = pillbox.find("[data-cy^='topic-pill']")

    assert.equal(pills.length, 3)
  })

  it('passes the correct formatted url based on slug to each topic pill', () => {
    const pillbox = shallow(
      <TopicsPillbox
        {...baseProps}
        topicsMap={{ classics: mockTopicsData.classics }}
        headingClassName="the-sweetness"
      />
    )
    const pill = pillbox.find("[data-cy^='topic-pill']").first()

    assert.equal(pill.prop('href'), '/discover/classics')
  })

  it('puts promoted topic items at the front of the list', () => {
    const pillbox = shallow(
      <TopicsPillbox {...baseProps} headingClassName="the-sweetness" />
    )
    const pill = pillbox.find("[data-cy^='topic-pill']").first()

    assert.equal(pill.prop('promoted'), true)
    assert.equal(pill.prop('href'), '/discover/superheroes')
  })

  it('calls props.onTopicClick when the user clicks on a topic, passing through expected params', () => {
    const spy = sinon.spy()
    const pillbox = shallow(<TopicsPillbox {...baseProps} onTopicClick={spy} />)
    const pill = pillbox.find("[data-cy^='topic-pill']").first()

    pill.simulate('click', mockEvent)

    // superheroes is promoted so it should be the first topic
    assert(spy.calledWith('superheroes', 0, 'pez-dispenser'))
  })
})
