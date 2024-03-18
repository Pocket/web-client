import { render, fireEvent } from '@config/jest'
import '@testing-library/jest-dom'
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
    const { container } = render(<TopicsPillbox {...baseProps} alignItems="center" />)
    expect(container.firstChild).toHaveClass('align-center')
  })

  it('renders custom heading text if props.headingText is provided', () => {
    const { getByTestId } = render(<TopicsPillbox {...baseProps} headingText="Nom nom" />)
    expect(getByTestId('heading')).toHaveTextContent('Nom nom')
  })

  it('adds a custom heading css class if props.headingClassName is provided', () => {
    const { getByTestId } = render(
      <TopicsPillbox {...baseProps} headingClassName="the-sweetness" />
    )
    expect(getByTestId('heading')).toHaveClass('the-sweetness')
  })

  it('renders a pill for each topic in the topics data map', () => {
    const topicNames = Object.keys(mockTopicsData)
    const { getByTestId } = render(<TopicsPillbox {...baseProps} />)
    topicNames.forEach((topic) => expect(getByTestId(`topic-pill-${topic}`)))
  })

  it('passes the correct formatted url based on slug to each topic pill', () => {
    const topicNames = Object.keys(mockTopicsData)
    const { getByTestId } = render(<TopicsPillbox {...baseProps} />)
    topicNames.forEach((topic) => {
      expect(getByTestId(`topic-pill-${topic}`)).toHaveAttribute('href', topic.url)
    })
  })

  it('puts promoted topic items at the front of the list', () => {
    const { queryAllByTestId } = render(<TopicsPillbox {...baseProps} />)
    expect(queryAllByTestId('topic-pill', { exact: false })[0]).toHaveAttribute(
      'href',
      '/explore/superheroes'
    )
  })

  it('calls props.onTopicClick when the user clicks on a topic, passing through expected params', () => {
    const handleClick = jest.fn()
    const { queryAllByTestId } = render(<TopicsPillbox {...baseProps} onTopicClick={handleClick} />)
    const firstPill = queryAllByTestId('topic-pill', { exact: false })[0]
    fireEvent.click(firstPill)
    expect(handleClick).toBeCalledWith('superheroes', 0, 'pez-dispenser')
  })
})
