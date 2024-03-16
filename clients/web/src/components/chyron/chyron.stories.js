import React, { Fragment } from 'react'
import { Chyron } from './chyron'
import { ScrollChyron } from './chyron-scroll'
import { ContentParsed } from 'components/content-parsed/content-parsed'
import { articleContent } from 'mock/article'
import { css } from '@emotion/css'

export default {
  title: 'Article/Chyron',
  component: Chyron
}

const ChildContainer = css`
  background-color: rgba(214, 80, 118, 0.5);
  border: solid 1px rgba(214, 80, 118, 1);
  padding: 2em;
`

const SimpleChild = ({ dismissChyron, completeChyron }) => (
  <div className={ChildContainer}>
    <button onClick={dismissChyron}>Dismiss Chyron</button>
    <p>CTA</p>
    <button onClick={completeChyron}>Complete Chyron</button>
  </div>
)

const resetLocalStorage = (instanceId) => {
  const chyronId = `chyron-${instanceId}`
  const chyronDismissalDate = `chyron-dismissed-${instanceId}`

  localStorage.removeItem(chyronId)
  localStorage.removeItem(chyronDismissalDate)

  // reload page
  document.location.reload()
  return false
}

const DevReset = css`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`

const INSTANCE_ID = 'storybook-dev'

export const normal = () => (
  <Fragment>
    <button className={DevReset} onClick={() => resetLocalStorage(INSTANCE_ID)}>
      Reset localStorage
    </button>
    <ContentParsed content={articleContent.photosAndCaptions} />
    <Chyron instanceId={INSTANCE_ID}>
      <SimpleChild />
    </Chyron>
  </Fragment>
)

export const dismissed = () => (
  <Fragment>
    <button className={DevReset} onClick={() => resetLocalStorage(INSTANCE_ID)}>
      Reset localStorage
    </button>
    <ContentParsed content={articleContent.photosAndCaptions} />
    <Chyron instanceId={INSTANCE_ID} initialDismissed={true}>
      <SimpleChild />
    </Chyron>
  </Fragment>
)

export const succeeded = () => (
  <Fragment>
    <button className={DevReset} onClick={() => resetLocalStorage(INSTANCE_ID)}>
      Reset localStorage
    </button>
    <ContentParsed content={articleContent.photosAndCaptions} />
    <Chyron instanceId={INSTANCE_ID} initialSuccess={true}>
      <SimpleChild />
    </Chyron>
  </Fragment>
)

export const scrollChryron = () => (
  <Fragment>
    <button className={DevReset} onClick={() => resetLocalStorage(INSTANCE_ID)}>
      Reset localStorage
    </button>
    <ContentParsed content={articleContent.photosAndCaptions} />
    <ScrollChyron instanceId={INSTANCE_ID}>
      <SimpleChild />
    </ScrollChyron>
  </Fragment>
)

export const scrollChryronSuppressed = () => (
  <Fragment>
    <button className={DevReset} onClick={() => resetLocalStorage(INSTANCE_ID)}>
      Reset localStorage
    </button>
    <ContentParsed content={articleContent.photosAndCaptions} />
    <ScrollChyron instanceId={INSTANCE_ID} shouldHide>
      <SimpleChild />
    </ScrollChyron>
  </Fragment>
)
