import React from 'react'
import { useTranslation } from 'next-i18next'
import { css } from 'linaria'
import { HomeJourneyHeader } from 'components/headers/home-header'
import { useDispatch, useSelector } from 'react-redux'
import { TopicSelector } from 'connectors/topic-list/topic-selector'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { breakpointLargeHandset } from '@pocket/web-ui'

const selectionStyles = css`
  padding: 2rem 0;
`

export const pillboxStyle = css`
  padding: 0 3rem 1.5rem;

  ${breakpointLargeHandset} {
    padding: 0 0 1.5rem;
  }
`

export const HomeTopicSelector = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const pinnedTopics = useSelector((state) => state.settings.pinnedTopics)

  const title = t('home:discover-topics', 'Discover more topics')
  const description = t('home:select-topics', 'Select topics to see popular articles and our editors’ top picks.')

  const toggleCallback = (label) => {
    dispatch(sendSnowplowEvent('home.topic.toggle', { label }))
  }

  return (
    <div className={selectionStyles}>
      { (pinnedTopics?.length > 0) ? <HomeJourneyHeader sectionTitle={title} sectionDescription={description} /> : null }
      <div className={pillboxStyle}>
        <TopicSelector toggleCallback={toggleCallback}/>
      </div>
    </div>
  )
}
