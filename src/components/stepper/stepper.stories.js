import { StepperWrapper, IconWrapper, SizeChangeButton } from './stepper'
import { StepperRange } from './stepper-range'
import { AddIcon, RemoveIcon, TextSettingsIcon } from '@pocket/web-ui'
import { useState } from 'react'

export default {
  title: 'Components/Stepper'
}

export const normal = () => {
  const [current, setCurrent] = useState(4)

  const range = ['12px', '16px', '22px', '28px', '34px', '38px', '42px']

  const clickDecrease = () => {
    if (minusActive()) setCurrent(current - 1)
  }
  const clickIncrease = () => {
    if (plusActive()) setCurrent(current + 1)
  }

  const plusActive = () => current < range.length - 1
  const minusActive = () => current > 0

  return (
    <>
      <StepperWrapper>
        <IconWrapper data-tooltip="increase!">
          <TextSettingsIcon />
        </IconWrapper>
        <SizeChangeButton
          active={minusActive()}
          onClick={clickDecrease}
          aria-label="aria-label"
          data-tooltip="size button">
          <RemoveIcon />
        </SizeChangeButton>
        <StepperRange
          current={current}
          range={range}
          onChange={setCurrent}
        />
        <SizeChangeButton
          active={plusActive()}
          onClick={clickIncrease}
          aria-label="aria-label"
          data-tooltip="another size button">
          <AddIcon />
        </SizeChangeButton>
      </StepperWrapper>

      <p style={{ fontSize: range[current] }}>
        Whoaaaaa!!! Lookit me change when you step-it.
      </p>
    </>
  )
}
