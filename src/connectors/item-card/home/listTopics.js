import { HomeSectionHeader } from 'components/headers/home-header'
import { useSelector } from 'react-redux'
import { css } from 'linaria'
import { ItemCard } from './cardTopic'
import { cardGrid } from 'components/items-layout/virtualized-list'
import classnames from 'classnames'

const topicRowStyles = css`
  margin-bottom: 1.5rem;
`

const cardRowStyles = css`
  margin-bottom: var(--spacing100);
  padding-bottom: 2rem;
  border-bottom: var(--dividerStyle);
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

export const HomeTopicsList = ({
  display_name,
  topic_slug,
  topic,
  saveAction,
  unSaveAction
}) => {
  const topicItems = useSelector((state) => state.home[`${topic}Topic`])
  const displayItems = topicItems?.slice(0, 3)

  return (
    <div className={topicRowStyles}>
      <HomeSectionHeader
        sectionTitle={display_name}
        topicSlug={topic_slug}
        sectionDescription={
          topicSubheadings[topic] ||
          'We need something better here, curated by our editors.'
        }
      />
      <section className={classnames(cardGrid, cardRowStyles)}>
        {displayItems?.length
          ? displayItems.map((id, index) => (
              <ItemCard
                key={id}
                id={id}
                topic={topic}
                saveAction={saveAction}
                unSaveAction={unSaveAction}
                position={index}
              />
            ))
          : null}
      </section>
    </div>
  )
}
