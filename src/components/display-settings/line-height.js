import { PopupMenuGroup } from 'components/popup-menu/popup-menu'
import { StepperWrapper, IconWrapper, StepperButton } from 'components/stepper/stepper'
import { StepperRange } from 'components/stepper/stepper-range'
import { AddIcon } from 'components/icons/AddIcon'
import { RemoveIcon } from 'components/icons/RemoveIcon'
import { LineHeightIcon } from 'components/icons/LineHeightIcon'
import { useTranslation } from 'next-i18next'

export const LineHeightSettings = ({
  clickDecrease,
  clickIncrease,
  range,
  current,
  setCurrent
}) => {
  const { t } = useTranslation()

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
        <IconWrapper data-tooltip={`${range[current] * 100}%`}>
          <LineHeightIcon />
        </IconWrapper>
        <StepperButton
          active={minusActive()}
          onClick={handleDecrease}
          data-testid="display-line-height-decrease"
          aria-label={t('settings:decrease-line-height', 'Decrease Line Height')}
          data-tooltip={t('settings:decrease-line-height', 'Decrease Line Height')}>
          <RemoveIcon />
        </StepperButton>
        <StepperRange current={current} range={range} onChange={setCurrent} />
        <StepperButton
          active={plusActive()}
          onClick={handleIncrease}
          data-testid="display-line-height-increase"
          aria-label={t('settings:increase-line-height', 'Increase Line Height')}
          data-tooltip={t('settings:increase-line-height', 'Increase Line Height')}>
          <AddIcon />
        </StepperButton>
      </StepperWrapper>
    </PopupMenuGroup>
  )
}
