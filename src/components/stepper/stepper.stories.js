import { StepperWrapper, IconWrapper, SizeChangeButton } from './stepper'
import { StepperRange } from './stepper-range'
import { AddIcon, RemoveIcon, LineHeightIcon } from '@pocket/web-ui'

export default {
  title: 'Elements/StepperButtons'
}

export const normal = () => (
  <StepperWrapper>
    <IconWrapper data-tooltip="increase!">
      <LineHeightIcon />
    </IconWrapper>
    <SizeChangeButton
      active
      aria-label="aria-label"
      data-tooltip="size button">
      <RemoveIcon />
    </SizeChangeButton>
    <StepperRange current={4} range={[1,2,3,4,5,6,7]} />
    <SizeChangeButton
      aria-label="aria-label"
      data-tooltip="another size button">
      <AddIcon />
    </SizeChangeButton>
  </StepperWrapper>
)
