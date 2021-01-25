import { PopupMenuGroup } from '@pocket/web-ui'
import { css } from 'linaria'
import {
  StepperWrapper,
  IconWrapper,
  StepperButton
} from 'components/stepper/stepper'
import { StepperRange } from 'components/stepper/stepper-range'
import { AddIcon, RemoveIcon, MarginsIcon } from '@pocket/web-ui'
import { useTranslation } from 'react-i18next'

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
          aria-label={t("Decrease Column Width")}
          data-tooltip={t("Decrease Column Width")}>
          <RemoveIcon />
        </StepperButton>
        <StepperRange current={current} range={range} onChange={setCurrent} />
        <StepperButton
          active={plusActive()}
          onClick={handleIncrease}
          aria-label={t("Increase Column Width")}
          data-tooltip={t("Increase Column Width")}>
          <AddIcon />
        </StepperButton>
      </StepperWrapper>
    </PopupMenuGroup>
  )
}
