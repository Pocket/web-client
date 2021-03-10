import { HomeTopicHeader } from 'components/headers/home-header'
import { useSelector } from 'react-redux'
import { css } from 'linaria'
import { ItemCard } from 'connectors/item-card/home/cardTopic'
import { cardGrid } from 'components/items-layout/virtualized-list'
import classnames from 'classnames'
import { Skeleton } from 'components/item-card/home/skeleton'

const topicRowStyles = css`
  margin-bottom: 1.5rem;
  &:last-of-type {
    margin-bottom: 4rem;
  }
`

const cardRowStyles = css`
  margin-bottom: var(--spacing100);
  padding-bottom: 2rem;
`

//prettier-ignore
export const topicHeadings = {
  business: {
    title: 'Business',
    subtitle: 'The latest industry insights and fascinating stories. '
  },
  career: {
    title: 'Career',
    subtitle: 'Thoughtful advice and insights on making the most of your 9-to-5 — and beyond.'
  },
  education: {
    title: 'Education & History',
    subtitle: 'Learn something new, dive into the past, and explore the wide world of education.'
  },
  entertainment: {
    title: 'Entertainment',
    subtitle: 'Irresistible reads on film, music, TV, art, and design — as well as high- and low-brow delights. '
  },
  food: {
    title: 'Food',
   subtitle: 'Recipes, ruminations, and everything in between. Hungry yet?'
  },
  gaming: {
    title: 'Gaming',
    subtitle: 'Insider takes and captivating reads on the gaming industry.'
  },
  health: {
    title: 'Health & Fitness',
    subtitle: 'Fascinating stories about physical, emotional, and mental health. '
  },
  parenting: {
    title: 'Parenting & Relationships',
    subtitle: 'Helpful advice and intriguing stories about caring for children and connecting with others.'
  },
  'personal-finance': {
    title: 'Personal Finance',
    subtitle: 'Expert tips and thoughtful reads on retirement, investing, and more.'
  },
  politics: {
    title: 'Politics & Law',
    subtitle: 'Thoughtful analysis and helpful explainers on the world of politics, law, and crime.'
  },
  science: {
    title: 'Science',
    subtitle: 'Illuminating reads on the latest from top labs and the world around us.'
  },
  'self-improvement': {
    title: 'Self Improvement',
    subtitle: 'Practical tips and mindful reflections for a better life.'
  },
  sports: {
    title: 'Sports',
    subtitle: 'Gripping stories about sports and their impact on the greater culture. '
  },
  technology: {
    title: 'Technology',
    subtitle: 'The latest tech news and compelling stories about the digital world.'
  },
  travel: {
    title: 'Travel & Exploration',
    subtitle: 'Inspiring and informative stories about the places you’ll go.'
  }
}

export const HomeTopicsRow = ({ topic_slug, topic }) => {
  const topicItems = useSelector((state) => state.home[`${topic}Topic`])
  const displayItems = topicItems?.slice(0, 3)

  return (
    <div className={topicRowStyles}>
      <HomeTopicHeader
        sectionTitle={topicHeadings[topic]?.title}
        topicSlug={topic_slug}
        sectionDescription={topicHeadings[topic]?.subtitle}
      />
      <section className={classnames(cardGrid, cardRowStyles)}>
        {displayItems?.length ? (
          displayItems.map((id, index) => (
            <ItemCard key={id} id={id} topic={topic} position={index} />
          ))
        ) : (
          <Skeleton type="grid" name={`${topic_slug}Skeleton`} count={3} />
        )}
      </section>
    </div>
  )
}

export const HomeTopicsList = () => {
  const topicSections = useSelector((state) => state.home.topicSections)

  return topicSections?.length
    ? topicSections.map((topic) => (
        <HomeTopicsRow key={topic.display_name} {...topic} />
      ))
    : null
}
