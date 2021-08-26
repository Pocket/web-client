import { HomeTopicHeader } from 'components/headers/home-header'
import { useSelector, useDispatch } from 'react-redux'
import { css } from 'linaria'
import { CardTopic } from 'connectors/item-card/home/card-topic'
import { cardGrid } from 'components/items-layout/base'
import classnames from 'classnames'
import { CardSkeleton } from 'components/item-card/card-skeleton'
import { breakpointLargeHandset } from '@pocket/web-ui'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { TopicHeadings } from 'connectors/topic-list/topic-headings'

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

export const HomeTopicsRow = ({ topic_slug, topic, count = 6 }) => {
  const dispatch = useDispatch()

  const topicItems = useSelector((state) => state.home[`${topic}Topic`])
  const displayItems = topicItems?.slice(0, count)
  const skeletonArray = [0, 1, 2, 3, 4, 5]
  const displaySkeleton = skeletonArray.slice(0, count)

  const title = <TopicHeadings topic={topic} type="title" />
  const description = <TopicHeadings topic={topic} type="subtitle" />

  const clickEvent = () => dispatch(sendSnowplowEvent('home.topic.view-more', { label: topic_slug }))

  return (
    <div className={topicRowStyles} data-cy={`topic-row-${topic}`}>
      <HomeTopicHeader
        sectionTitle={title}
        topicSlug={topic_slug}
        sectionDescription={description}
        clickEvent={clickEvent}
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

export const HomeTopicsList = () => {
  const pinnedTopics = useSelector((state) => state.settings.pinnedTopics)

  return pinnedTopics?.length
    ? pinnedTopics.map((topic) => (
        <HomeTopicsRow key={topic.display_name} {...topic} />
      ))
    : null
}
