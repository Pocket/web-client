import { HomeTopicHeader } from 'components/headers/home-header'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { css } from 'linaria'
import { CardTopic } from 'connectors/item-card/home/card-topic'
import { cardGrid } from 'components/items-layout/base'
import classnames from 'classnames'
import { CardSkeleton } from 'components/item-card/card-skeleton'
import { breakpointLargeHandset } from '@pocket/web-ui'
import { trackEngagement } from 'connectors/snowplow/snowplow.state'
import { ENGAGEMENT_TYPE_GENERAL } from 'connectors/snowplow/events'
import { UI_COMPONENT_LINK } from 'connectors/snowplow/entities'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'

/* Analytics Event */
export const sendEngagementEvent = (topic) =>
  trackEngagement(
    ENGAGEMENT_TYPE_GENERAL,
    UI_COMPONENT_LINK,
    0, // position in list (zero since it's not in list)
    'home.topic.view-more',
    topic
  )

const topicRowStyles = css`
  margin-bottom: 1.5rem;
  &:last-of-type {
    margin-bottom: 4rem;
  }
`

const cardRowStyles = css`
  margin-bottom: var(--spacing100);
  padding-bottom: 2rem;
  ${breakpointLargeHandset} {
    article {
      border-bottom: none;
      margin-bottom: 1rem;
    }
    article .actions {
      justify-content: flex-end;
    }
  }
`

//prettier-ignore
export const topicHeadings = {
  business: {
    title: 'Business',
    subtitle: 'Wall Street, market trends, economy, and the media.'
  },
  career: {
    title: 'Career',
    subtitle: 'Productivity tips, professional development, and the future of work.'
  },
  education: {
    title: 'Education & History',
    subtitle: 'Academia, schools, and lifelong learning.'
  },
  entertainment: {
    title: 'Entertainment',
    subtitle: 'Movies, music, books, TV, art, and design.'
  },
  food: {
    title: 'Food',
   subtitle: 'Time-tested recipes, kitchen tips, and why we eat the way we do.'
  },
  gaming: {
    title: 'Gaming',
    subtitle: 'Video games, board games, and the players who play them.'
  },
  health: {
    title: 'Health & Fitness',
    subtitle: 'Wellness, exercise, and self-care.'
  },
  parenting: {
    title: 'Parenting & Relationships',
    subtitle: 'Family guidance, advice, and personal stories.'
  },
  'personal-finance': {
    title: 'Personal Finance',
    subtitle: 'Saving, spending, and retirement planning.'
  },
  politics: {
    title: 'Politics & Law',
    subtitle: 'Policy, government, and important debates.'
  },
  science: {
    title: 'Science',
    subtitle: 'Exploring nature, the cosmos, and the human body.'
  },
  'self-improvement': {
    title: 'Self Improvement',
    subtitle: 'Smarter living, better habits, and lasting happiness.'
  },
  sports: {
    title: 'Sports',
    subtitle: 'Slam dunks, corner goals, home runs, touchdowns and more.'
  },
  technology: {
    title: 'Technology',
    subtitle: 'Gadgets, the internet, and digital life.'
  },
  travel: {
    title: 'Travel & Exploration',
    subtitle: 'What to pack and where to go.'
  }
}

export const HomeTopicsRow = ({ topic_slug, topic, count = 3 }) => {
  const dispatch = useDispatch()

  const featureState = useSelector((state) => state.features)
  const showLab = featureFlagActive({ flag: 'lab', featureState })

  const topicItems = useSelector((state) => state.home[`${topic}Topic`])
  const displayItems = topicItems?.slice(0, count)
  const skeletonArray = [0, 1, 2, 3, 4, 5]
  const displaySkeleton = skeletonArray.slice(0, count)

  const clickEvent = () => {
    dispatch(sendEngagementEvent(topic_slug))
  }

  return (
    <div className={topicRowStyles} data-cy={`topic-row-${topic}`}>
      <HomeTopicHeader
        sectionTitle={topicHeadings[topic]?.title}
        topicSlug={topic_slug}
        sectionDescription={topicHeadings[topic]?.subtitle}
        clickEvent={clickEvent}
        showLab={showLab}
      />
      <section className={classnames(cardGrid, cardRowStyles)}>
        {displayItems?.length
          ? displayItems.map((id, index) => (
              <CardTopic key={id} id={id} topic={topic} position={index} />
            ))
          : displaySkeleton.map((id, index) => (
              <CardSkeleton key={id + index} id={id} type="grid" name={`${topic_slug}Skeleton`} />
            ))}
      </section>
    </div>
  )
}

export const HomeTopicsList = ({ count }) => {
  const topicSections = useSelector((state) => state.home.topicSections)

  return topicSections?.length
    ? topicSections.map((topic) => <HomeTopicsRow key={topic.display_name} count={count} {...topic} />)
    : null
}
