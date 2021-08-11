import { css, cx } from 'linaria'
import { CrossIcon } from '@pocket/web-ui'
import { screenReaderOnly } from '@pocket/web-ui'
import { useTranslation, Trans } from 'next-i18next'

const closeButtonStyles = css`
  cursor: pointer;
  span,
  span:hover {
    width: 20px;
    height: 20px;
    background-color: transparent;
  }
  color: var(--color-textPrimary);
  background-color: transparent;

  padding: var(--spacing150);
  position: sticky;
  float: right;
  top: 0;
  z-index: 2;

  &:hover,
  &:active {
    background-color: transparent;
    color: var(--color-textLinkHover);
  }
  &:focus {
    transition: none;
    color: var(--color-navCurrentTabText);
    outline: 1px auto var(--color-navCurrentTab);
  }

  .visually-hidden {
    ${screenReaderOnly}
  }
`

export const CloseButton = ({ handleClose, dataCy, closeButtonOverrides }) => {
  const { t } = useTranslation()

  return (
    <button
      data-cy={dataCy}
      className={cx('close', closeButtonStyles, closeButtonOverrides)}
      aria-label={t('common:close-label', 'Close')}
      onClick={handleClose}>
      <CrossIcon />
      <span className="visually-hidden">
        <Trans i18nKey="common:close">Close</Trans>
      </span>
    </button>
  )
}
