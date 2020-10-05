import React from 'react'
import Lorem from 'react-lorem-component'
import { ProgressBar } from './progress-bar'
import { css } from 'linaria'
import { ScrollTracker } from 'components/scroll/scroll-tracker'

export default {
  title: 'Components/ProgressBar'
}

const navBar = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
`
const longPageStyles = css`
  box-sizing: border-box;
  display: block;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`

const ProgressBarStory = ({ scrollPercentage, noScroll, loremCount }) => (
  <React.Fragment>
    <div className={navBar}>
      <ProgressBar
        percentage={scrollPercentage}
        noScroll={noScroll}
      />
    </div>
    <div className={longPageStyles}>
      <Lorem
        count={loremCount}
        paragraphLowerBound={8}
        paragraphUpperBound={20}
      />
    </div>
  </React.Fragment>
)

const WrappedStory = ScrollTracker(ProgressBarStory)

export const noScroll = () => <WrappedStory loremCount={22} noScroll />

export const shortPage = () => <WrappedStory loremCount={7} />

export const longPage = () => <WrappedStory loremCount={22} />

