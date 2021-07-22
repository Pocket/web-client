import { PopupMenuGroup } from '@pocket/web-ui'
import { StepperWrapper, IconWrapper, StepperButton } from 'components/stepper/stepper'
import { StepperRange } from 'components/stepper/stepper-range'
import { AddIcon, RemoveIcon, TextSettingsIcon } from '@pocket/web-ui'
import { useTranslation } from 'next-i18next'

export const FontSizeSettings = ({ clickDecrease, clickIncrease, range, current, setCurrent }) => {
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
        <IconWrapper data-tooltip={`${range[current]}px`}>
          <TextSettingsIcon />
        </IconWrapper>
        <StepperButton
          active={minusActive()}
          onClick={handleDecrease}
          data-cy="display-text-size-decrease"
          aria-label={t('settings:decrease-text-size', 'Decrease Text Size')}
          data-tooltip={t('settings:decrease-text-size', 'Decrease Text Size')}>
          <RemoveIcon />
        </StepperButton>
        <StepperRange current={current} range={range} onChange={setCurrent} />
        <StepperButton
          active={plusActive()}
          onClick={handleIncrease}
          data-cy="display-text-size-increase"
          aria-label={t('settings:increase-text-size', 'Increase Text Size')}
          data-tooltip={t('settings:increase-text-size', 'Increase Text Size')}>
          <AddIcon />
        </StepperButton>
      </StepperWrapper>
    </PopupMenuGroup>
  )
}
