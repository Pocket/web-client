import { css, cx } from '@emotion/css'
import { buttonReset } from 'components/buttons/button-reset'
import { useTranslation } from 'next-i18next'
import { SimilarIcon } from '@ui/icons/SimilarIcon'
import { topTooltipDelayed } from 'components/tooltip/tooltip'
const similarContainer = css`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
  font-size: var(--fontSize150);
  min-width: 24px;
  color: var(--color-textTertiary);
  cursor: pointer;
  padding: 4px;
  text-decoration: none;

  .icon {
    margin-top: 0;
  }

  svg {
    transition: transform 200ms ease-out;
    display: block;
    margin-right: var(--size050);
    height: 24px;
  }

  .actionCopy {
    font-size: 1rem;
    height: var(--size150);
    line-height: var(--size150);
    white-space: nowrap;
  }

  a {
    text-decoration: none;
  }

  &:hover,
  &:focus {
    text-decoration: none;
    color: var(--color-textTertiary);
    svg {
      color: var(--color-amber);
    }
  }

  &:active {
    svg {
      transform: scale(0.95);
      color: var(--color-amberDark);
    }
  }
`

/**
 * Pocket logomark with click interaction to save a story to Pocket.
 */
export const ShowSimilar = function ({ id, similarAction, className, hideCopy = false }) {
  const { t } = useTranslation()

  const handleClick = (event) => {
    event.preventDefault()
    event.stopPropagation()

    similarAction()
  }

  const saveClasses = cx(
    buttonReset,
    'card-actions',
    similarContainer,
    topTooltipDelayed,
    className
  )

  return (
    <button
      className={saveClasses}
      onClick={handleClick}
      data-testid={`article-similar-btn-${id}`}
      data-tooltip={t('item-action:show-similar', 'Show Similar Items')}>
      <SimilarIcon />
      {hideCopy ? null : (
        <span className="actionCopy">{t('item-action:show-similar-copy', 'Show Similar')}</span>
      )}
    </button>
  )
}
