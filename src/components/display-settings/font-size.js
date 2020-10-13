import { PopupMenuGroup } from '@pocket/web-ui'
import { css } from 'linaria'
import { StepperWrapper, IconWrapper, StepperButton } from 'components/stepper/stepper'
import { StepperRange } from 'components/stepper/stepper-range'
import { AddIcon, RemoveIcon, TextSettingsIcon } from '@pocket/web-ui'

export const FontSizeSettings = ({
  clickDecrease,
  clickIncrease,
  range,
  current,
  setCurrent
}) => {
  const plusActive = () => current < range.length - 1
  const minusActive = () => current > 0

  const handleIncrease = () => {
    if (plusActive()) clickIncrease()
  }

  const handleDecrease = () => {
    if (minusActive()) clickDecrease()
  }

  return (
    <PopupMenuGroup>
      <StepperWrapper>
        <IconWrapper data-tooltip={`${range[current]}px`}>
          <TextSettingsIcon />
        </IconWrapper>
        <StepperButton
          active={minusActive()}
          onClick={clickDecrease}
          aria-label="Decrease Text Size"
          data-tooltip="Decrease Text Size">
          <RemoveIcon />
        </StepperButton>
        <StepperRange
          current={current}
          range={range}
          onChange={setCurrent}
        />
        <StepperButton
          active={plusActive()}
          onClick={clickIncrease}
          aria-label="Increase Text Size"
          data-tooltip="Increase Text Size">
          <AddIcon />
        </StepperButton>
      </StepperWrapper>
    </PopupMenuGroup>
  )
}
