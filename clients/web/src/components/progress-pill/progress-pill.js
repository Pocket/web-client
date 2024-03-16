import { css } from '@emotion/css'
import PropTypes from 'prop-types'

const barWrapper = css`
  display: block;
  width: 100%;
  z-index: var(--zIndexHeader);
  padding: var(--spacing025) 0;
  color: var(--color-textPrimary);
  border: 1px solid var(--color-dividerTertiary);
  border-radius: calc(var(--fontSize085) / 2 + var(--spacing050));
  position: relative;
  overflow: hidden;
  &:after {
    border: 4px solid var(--color-canvas);
    border-radius: 16px;
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  & > div {
    box-sizing: content-box;
    border-radius: calc(var(--fontSize085) / 2 + var(--spacing050));
    background-color: var(--color-actionPrimary);
    height: 100%;
    width: 100%;
    transition: transform 1000ms linear;
    padding: var(--spacing050) var(--spacing100);
  }
`

export const ProgressPill = ({ total = 100, current = 0 }) => {
  const barTranslate = 100 - ((current + 1) / total) * 100

  return (
    <div className={barWrapper}>
      <div
        style={{
          transform: `translateX(-${barTranslate}%)`
        }}
      />
    </div>
  )
}

ProgressPill.propTypes = {
  // Progress Pill Props
  /**
   * total
   */
  total: PropTypes.number,
  /**
   * current value
   */
  current: PropTypes.number
}
