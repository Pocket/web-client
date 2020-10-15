import { PopupMenuGroup } from '@pocket/web-ui'
import { css } from 'linaria'
import { StepperWrapper, IconWrapper, StepperButton } from 'components/stepper/stepper'
import { StepperRange } from 'components/stepper/stepper-range'
import { AddIcon, RemoveIcon, LineHeightIcon } from '@pocket/web-ui'

export const LineHeightSettings = ({
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
        <IconWrapper data-tooltip={`${range[current]}em`}>
          <LineHeightIcon />
        </IconWrapper>
        <StepperButton
          active={minusActive()}
          onClick={handleDecrease}
          aria-label="Decrease Line Height"
          data-tooltip="Decrease Line Height">
          <RemoveIcon />
        </StepperButton>
        <StepperRange
          current={current}
          range={range}
          onChange={setCurrent}
        />
        <StepperButton
          active={plusActive()}
          onClick={handleIncrease}
          aria-label="Increase Line Height"
          data-tooltip="Increase Line Height">
          <AddIcon />
        </StepperButton>
      </StepperWrapper>
    </PopupMenuGroup>
  )
}
