import { css, cx } from 'linaria'
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
import { ArrowDownIcon } from 'components/icons/ArrowDownIcon'
import { ArrowUpIcon } from 'components/icons/ArrowUpIcon'
import { ArrowLeftIcon } from 'components/icons/ArrowLeftIcon'
import { ArrowRightIcon } from 'components/icons/ArrowRightIcon'
import { buttonReset } from 'components/buttons/button-reset'

const wrapper = css`
  padding: 5rem;
  display: flex;
  justify-content: space-around;
`

export default {
  title: 'Components/Tooltips'
}

export const Tooltip = () => {
  return (
    <>
      <div className={wrapper}>
        <button
          data-tooltip="Top tooltip placement"
          className={cx(buttonReset, topTooltip)}
          aria-label="button">
          <ArrowUpIcon />
        </button>
        <button
          data-tooltip="I am tooltip text"
          className={cx(buttonReset, rightTooltip)}
          aria-label="button">
          <ArrowRightIcon />
        </button>
        <button
          data-tooltip="I am tooltip text"
          className={cx(buttonReset, bottomTooltip)}
          aria-label="button">
          <ArrowDownIcon />
        </button>
        <button
          data-tooltip="I am tooltip text test test itestst"
          className={cx(buttonReset, leftTooltip)}
          aria-label="button">
          <ArrowLeftIcon />
        </button>
      </div>
      <h3>Delayed Tooltips</h3>
      <div className={wrapper}>
        <button
          data-tooltip="I am tooltip text"
          className={cx(buttonReset, topTooltipDelayed)}
          aria-label="button">
          <ArrowUpIcon />
        </button>
        <button
          data-tooltip="I am tooltip text"
          className={cx(buttonReset, rightTooltipDelayed)}
          aria-label="button">
          <ArrowRightIcon />
        </button>
        <button
          data-tooltip="I am tooltip text"
          className={cx(buttonReset, bottomTooltipDelayed)}
          aria-label="button">
          <ArrowDownIcon />
        </button>
        <button
          data-tooltip="I am tooltip text"
          className={cx(buttonReset, leftTooltipDelayed)}
          aria-label="button">
          <ArrowLeftIcon />
        </button>
      </div>
    </>
  )
}
