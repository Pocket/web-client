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

const topicSubheadings = {
  business: false,
  career: false,
  education: false,
  entertainment: false,
  food: 'Stories to fuel your body, curated by our editors.',
  gaming: false,
  health: false,
  parenting: false,
  'personal-finance': false,
  politics: false,
  science: false,
  'self-improvement': 'Stories to level up your life, curated by our editors.',
  sports: false,
  technology: false,
  travel: false
}

export const HomeTopicsRow = ({ display_name, topic_slug, topic }) => {
  const topicItems = useSelector((state) => state.home[`${topic}Topic`])
  const displayItems = topicItems?.slice(0, 3)

  return (
    <div className={topicRowStyles}>
      <HomeTopicHeader
        sectionTitle={display_name}
        topicSlug={topic_slug}
        sectionDescription={
          topicSubheadings[topic] ||
          'We need something better here, curated by our editors.'
        }
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
