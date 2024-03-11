import { css, cx } from '@emotion/css'
import {
  bottomTooltip,
  bottomTooltipDelayed,
  leftTooltip,
  leftTooltipDelayed,
  rightTooltip,
  rightTooltipDelayed,
  topTooltip,
  topTooltipDelayed
} from './tooltip'
import { ArrowDownIcon } from '@ui/icons/ArrowDownIcon'
import { ArrowUpIcon } from '@ui/icons/ArrowUpIcon'
import { ArrowLeftIcon } from '@ui/icons/ArrowLeftIcon'
import { ArrowRightIcon } from '@ui/icons/ArrowRightIcon'
import { buttonReset } from 'components/buttons/button-reset'

const container = css`
  .title {
    display: flex;
    align-items: center;

    h4,
    p {
      margin-bottom: 0;
    }

    h4 + p {
      margin-left: 2rem;
    }
  }

  .wrapper {
    padding: 3rem;
    display: flex;
    justify-content: space-around;
  }

  hr {
    margin-bottom: 3rem;
    border-color: var(--color-dividerTertiary);
  }
`

export default {
  title: 'Components/Tooltips'
}

export const Tooltip = () => {
  return (
    <div className={container}>
      <div className="title">
        <h4>Default tooltips</h4>
        <p>Hover over the icons to see the tooltips in action</p>
      </div>
      <div className="wrapper">
        <button
          data-tooltip="Top tooltip placement"
          className={cx(buttonReset, topTooltip)}
          aria-label="button">
          <ArrowUpIcon />
        </button>
        <button
          data-tooltip="Right tooltip with some additional text"
          className={cx(buttonReset, rightTooltip)}
          aria-label="button">
          <ArrowRightIcon />
        </button>
        <button
          data-tooltip="Bottom"
          className={cx(buttonReset, bottomTooltip)}
          aria-label="button">
          <ArrowDownIcon />
        </button>
        <button
          data-tooltip="I am a left tooltip and I am happy"
          className={cx(buttonReset, leftTooltip)}
          aria-label="button">
          <ArrowLeftIcon />
        </button>
      </div>
      <hr />
      <div className="title">
        <h4>Delayed tooltips</h4>
        <p>These tooltips show up after a short delay</p>
      </div>
      <div className="wrapper">
        <button
          data-tooltip="Top tooltip delayed"
          className={cx(buttonReset, topTooltipDelayed)}
          aria-label="button">
          <ArrowUpIcon />
        </button>
        <button
          data-tooltip="Right tooltip also delayed"
          className={cx(buttonReset, rightTooltipDelayed)}
          aria-label="button">
          <ArrowRightIcon />
        </button>
        <button
          data-tooltip="Delay bottom tooltip"
          className={cx(buttonReset, bottomTooltipDelayed)}
          aria-label="button">
          <ArrowDownIcon />
        </button>
        <button
          data-tooltip="Delayed left tooltip with a lot more text than is necessary"
          className={cx(buttonReset, leftTooltipDelayed)}
          aria-label="button">
          <ArrowLeftIcon />
        </button>
      </div>
    </div>
  )
}
