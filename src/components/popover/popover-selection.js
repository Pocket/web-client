import { useRef, useEffect } from 'react'
import { css, cx } from '@emotion/css'
import { buttonReset } from 'components/buttons/button-reset'
import { overlayBase } from 'components/overlay/overlay'
import { HighlightIcon } from '@ui/icons/HighlightIcon'
import { IosShareIcon } from '@ui/icons/IosShareIcon'
import { Trans } from 'next-i18next'

const popupContainer = css`
  position: absolute;
  left: 0;
  top: 0;
`

const popupWrapper = css`
  background-color: var(--color-popoverCanvas);
  position: relative;
  top: -60px;
  transform: translateX(-50%);
  font-family: 'Graphik Web';
  font-size: 16px;
  font-weight: 500;
  &:before {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    width: 0;
    height: 0;
    transform: translateX(-50%);
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid var(--color-popoverCanvas);
  }
`

const buttonWrapper = css`
  font-family: 'Graphik Web';
  padding: 13px 15px 15px !important;
  cursor: pointer;
  margin: 0;
  &:hover {
    color: var(--color-actionPrimaryHover);
    background-color: transparent;
  }
`

const iconWrapper = css`
  display: inline-block;
  margin-right: 6px;
`

export const SelectionPopover = ({ anchor, addAnnotation, disablePopup, shareItem }) => {
  const ref = useRef()

  useEffect(() => {
    const isClickOutside = (e) => {
      // only process left-click
      if (e.button !== 0) return () => {}
      if (!ref.current || !ref.current.contains(e.target)) {
        disablePopup()
      }
    }

    document.addEventListener('mousedown', isClickOutside)
    return () => {
      document.removeEventListener('mousedown', isClickOutside)
    }
  }, [disablePopup])

  const onHighlight = () => {
    addAnnotation()
    disablePopup()
  }

  const onShare = () => {
    shareItem({ quote: anchor?.toString() })
    disablePopup()
  }

  if (!anchor || anchor.rangeCount === 0) return null

  const position = anchor.getRangeAt(0).getBoundingClientRect()

  const { right, left, top } = position
  const center = (right - left) / 2 + left

  return (
    <div
      className={popupContainer}
      style={{
        transform: `translate(${Math.round(center)}px, ${Math.round(top + window.scrollY)}px)`
      }}>
      <div className={cx(overlayBase, popupWrapper)} ref={ref}>
        <button className={cx(buttonReset, buttonWrapper)} onClick={onHighlight}>
          <span className={iconWrapper}>
            <HighlightIcon />
          </span>
          <Trans i18nKey="annotations:highlight">Highlight</Trans>
        </button>
        <button className={cx(buttonReset, buttonWrapper)} onClick={onShare}>
          <span className={iconWrapper}>
            <IosShareIcon />
          </span>
          <Trans i18nKey="annotations:share">Share</Trans>
        </button>
      </div>
    </div>
  )
}
