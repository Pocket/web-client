import { PopupMenuGroup } from '@pocket/web-ui'
import { css } from 'linaria'
import {
  StepperWrapper,
  IconWrapper,
  StepperButton
} from 'components/stepper/stepper'
import { StepperRange } from 'components/stepper/stepper-range'
import { AddIcon, RemoveIcon, MarginsIcon } from '@pocket/web-ui'
import { useTranslation } from 'next-i18next'

export const ColumnWidthSettings = ({
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
        <IconWrapper data-tooltip={`${range[current]}px`}>
          <MarginsIcon />
        </IconWrapper>
        <StepperButton
          active={minusActive()}
          onClick={handleDecrease}
          aria-label={t(
            'settings:decrease-column-width',
            'Decrease column width'
          )}
          data-tooltip={t(
            'settings:decrease-column-width',
            'Decrease column width'
          )}>
          <RemoveIcon />
        </StepperButton>
        <StepperRange current={current} range={range} onChange={setCurrent} />
        <StepperButton
          active={plusActive()}
          onClick={handleIncrease}
          aria-label={t(
            'settings:increase-column-width',
            'Increase column width'
          )}
          data-tooltip={t(
            'settings:increase-column-width',
            'Increase column width'
          )}>
          <AddIcon />
        </StepperButton>
      </StepperWrapper>
    </PopupMenuGroup>
  )
}
