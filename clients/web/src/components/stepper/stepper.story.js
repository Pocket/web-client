import { StepperWrapper, IconWrapper, StepperButton } from './stepper'
import { StepperRange } from './stepper-range'
import { AddIcon } from '@ui/icons/AddIcon'
import { RemoveIcon } from '@ui/icons/RemoveIcon'
import { TextSettingsIcon } from '@ui/icons/TextSettingsIcon'
import { useState } from 'react'

export default {
  title: 'Components/Stepper'
}

export const Normal = () => {
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
        <IconWrapper data-tooltip={range[current]}>
          <TextSettingsIcon />
        </IconWrapper>
        <StepperButton
          active={minusActive()}
          onClick={clickDecrease}
          aria-label="aria-label"
          data-tooltip="size button">
          <RemoveIcon />
        </StepperButton>
        <StepperRange current={current} range={range} onChange={setCurrent} />
        <StepperButton
          active={plusActive()}
          onClick={clickIncrease}
          aria-label="aria-label"
          data-tooltip="another size button">
          <AddIcon />
        </StepperButton>
      </StepperWrapper>

      <p style={{ fontSize: range[current] }}>Whoaaaaa!!! Lookit me change when you step-it.</p>
    </>
  )
}
