import { HomeSectionHeader } from 'components/headers/home-header'
import { useDispatch, useSelector } from 'react-redux'
import { css } from 'linaria'
import { ItemCard } from './card'
import { cardGrid } from 'components/items-layout/virtualized-list'
import { Button } from '@pocket/web-ui'
import classnames from 'classnames'

const topicRowStyles = css`
  margin-bottom: 3.5rem;
`

const cardRowStyles = css`
  margin-bottom: var(--spacing100);
`

const topicSubheadings = {
  business: false,
  career: false,
  education: false,
  entertainment: false,
  food: "Stories to fuel your body, curated by our editors.",
  gaming: false,
  health: false,
  parenting: false,
  'personal-finance': false,
  politics: false,
  science: false,
  'self-improvement': "Stories to level up your life, curated by our editors.",
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
  const topicData = useSelector((state) => state.home.topics[topic])
  const topicItems = topicData?.items

  return (
    <div className={topicRowStyles}>
      <HomeSectionHeader
        sectionTitle={display_name}
        sectionDescription={topicSubheadings[topic] || "We need something better here, curated by our editors."}
      />
      <section className={classnames(cardGrid, cardRowStyles)}>
        {topicItems ? topicItems.map((id, index) => (
          <ItemCard
            key={id}
            id={id}
            topic={topic}
            saveAction={saveAction}
            unSaveAction={unSaveAction}
            position={index}
          />
        )) : null }
      </section>
      <Button href={`/discover/${topic_slug}`} target="_blank">
        Discover {display_name}
      </Button>
    </div>
  )
}
