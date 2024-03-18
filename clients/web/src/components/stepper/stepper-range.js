import { css, cx } from '@emotion/css'

const rangeStepperWrapper = css`
  display: grid;
  padding: 0 6px;
  justify-items: center;
  button {
    position: relative;
    background: transparent;
    border-radius: 50%;
    width: 15px;
    border: none;
    padding: 0px;
    height: 15px;
    overflow: hidden;
    &:focus {
      outline: none;
    }
    &:before {
      content: ' ';
      position: absolute;
      height: 6px;
      width: 6px;
      background: var(--color-textSecondary);
      border-radius: 50%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    &:after {
      content: ' ';
      position: absolute;
      height: 12px;
      width: 12px;
      background-color: var(--color-actionPrimary);
      border-radius: 50%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: none;
    }
    &:hover,
    &.current {
      &:after {
        display: block;
      }
    }
  }
`

export const StepperRange = ({ range = [], current = 0, onChange }) => {
  const onStepClick = ({ target }) => {
    const dataIndex = target.getAttribute('data-index-number')
    onChange(parseInt(dataIndex))
  }

  return (
    <div
      className={rangeStepperWrapper}
      style={{ gridTemplateColumns: `repeat(${range.length}, 18px)` }}
      current={current}
      lastindex={range.length - 1}>
      {range.map((step, index) => (
        <button
          tabIndex="-1"
          key={index}
          data-index-number={index}
          aria-hidden={true}
          onClick={onStepClick}
          className={cx(index === current && 'current')}
        />
      ))}
    </div>
  )
}
