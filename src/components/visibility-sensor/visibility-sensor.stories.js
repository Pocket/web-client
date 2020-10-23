import React, { Fragment, useState } from 'react'
import VisibilitySensor from './visibility-sensor'
import { ParsedContent } from 'components/article/parsed-content'
import { ScrollChyron } from 'components/chyron/chyron-scroll'
import { articleContent } from 'mock/article'
import { css } from 'linaria'

export default {
  title: 'Components/VisibilitySensor',
  component: VisibilitySensor
}

const ChildContainer = css`
  background-color: rgba(214, 80, 118, 0.5);
  border: solid 1px rgba(214, 80, 118, 1);
  padding: 2em;
`

const displayCase = css`
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 1rem;
  z-index: 1;
  font-size: 2em;
  background-color: white;
  border: 1px solid black;
`

export const Normal = () => {
  const [isVisible, setVisible] = useState(false)

  return (
    <Fragment>
      <div className={displayCase}>
        {isVisible ? 'You found it!' : 'hiding...'}
      </div>
      <ParsedContent content={articleContent.quotes} />
      <VisibilitySensor onVisible={() => setVisible(true)}>
        <h1 className={ChildContainer}>Surprise, a pink box!</h1>
      </VisibilitySensor>
    </Fragment>
  )
}

export const WithChyron = () => {
  const [isVisible, setVisible] = useState(false)

  return (
    <Fragment>
      <div className={displayCase}>
        {isVisible ? 'You found it!' : 'hiding...'}
      </div>
      <ParsedContent content={articleContent.photosAndCaptions} />
      <ScrollChyron instanceId={'test-visibility'}>
        <VisibilitySensor onVisible={() => setVisible(true)}>
          <h1 className={ChildContainer}>Surprise, a pink box!</h1>
        </VisibilitySensor>
      </ScrollChyron>
    </Fragment>
  )
}
