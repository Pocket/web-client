//!! UPDATE HOOKS / REFACTOR TO TYPESCRIPT
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { css, cx } from '@emotion/css'
import { HomeIcon } from 'components/icons/HomeIcon'
import { ArrowLeftIcon } from 'components/icons/ArrowLeftIcon'
import { HighlightIcon } from 'components/icons/HighlightIcon'
import { IosShareIcon } from 'components/icons/IosShareIcon'
import { TagIcon } from 'components/icons/TagIcon'
import { FavoriteIcon } from 'components/icons/FavoriteIcon'
import { FavoriteFilledIcon } from 'components/icons/FavoriteFilledIcon'
import { ArchiveIcon } from 'components/icons/ArchiveIcon'
import { AddCircledIcon } from 'components/icons/AddCircledIcon'
import { DeleteIcon } from 'components/icons/DeleteIcon'
import { useRouter } from 'next/router'
import {
  breakpointLargeTablet,
  breakpointMediumHandset,
  breakpointLargeHandset
} from 'common/constants'
import { DisplaySettings } from 'components/display-settings/display-settings'
import { buttonReset } from 'components/buttons/button-reset'
import { bottomTooltip, rightTooltip } from 'components/tooltip/tooltip'
import { ProgressBar } from 'components/progress-bar/progress-bar'
import { useTranslation } from 'next-i18next'
import Mousetrap from 'mousetrap'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { useCallback } from 'react'

const headerStyle = css`
  position: fixed;
  z-index: var(--zIndexTooltip);
  width: 100%;
  background: var(--color-canvas);
  box-shadow: var(--raisedCanvas);
  /*bottom border custom color adds a subtle "shadow" effect */
  border-bottom: solid 1px var(--color-dividerTertiary);
  .global-nav-container {
    padding-top: 0;
    padding-bottom: 0;
    height: var(--size400);
  }

  @media print {
    display: none;
  }
`

const navStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 var(--spacing250);

  .nav-actions {
    width: 300px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;

    &.get-started {
      margin-left: -3rem;

      ${breakpointLargeHandset} {
        margin-left: 0;
      }
    }
  }

  .home-label {
    font-family: var(--fontSansSerif);
    padding-left: 0.5rem;

    ${breakpointLargeHandset} {
      display: none;
    }
  }

  ${breakpointLargeTablet} {
    padding: 0 var(--spacing150);
  }

  ${breakpointMediumHandset} {
    padding: 0 var(--spacing100);
  }
`

const buttonStyles = css`
  background-color: transparent;
  color: var(--color-textSecondary);
  font-size: var(--size100);
  height: var(--size150);
  cursor: pointer;

  &.go-back {
    margin-right: 24px;
  }

  &:hover {
    color: var(--color-textPrimary);
    background-color: transparent;
  }

  &:active,
  &:focus {
    transition: none;
    color: var(--color-navCurrentTabText);
    outline: 1px auto var(--color-navCurrentTab);
  }

  &.favorite .icon {
    color: var(--color-amber);
  }
  .icon {
    background-color: transparent;
    color: var(--color-textSecondary);
    height: 1.5rem;

    &:hover {
      color: var(--color-textPrimary);
      background-color: transparent;
    }

    ${breakpointMediumHandset} {
      height: 1.2rem;
    }
  }
`

export const ReaderNav = ({
  isPremium,
  toggleSidebar,
  toggleTagging,
  toggleShare,
  toggleDelete,
  toggleFavorite,
  archiveItem,
  favorite,
  archive,
  displaySettings,
  onVisible,
  sideBarOpen,
  colorMode,
  setColorMode,
  updateLineHeight,
  updateColumnWidth,
  updateFontSize,
  updateFontType
}) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { t } = useTranslation()

  const setFontFamily = (val) => dispatch(updateFontType(val))
  const setFontSize = (val) => dispatch(updateFontSize(val))
  const setLineHeight = (val) => dispatch(updateLineHeight(val))
  const setColumnWidth = (val) => dispatch(updateColumnWidth(val))
  const { getStarted } = router.query

  const goBack = useCallback(() => {
    if (getStarted) return router.push('/home')
    if (window.history.length > 1) return window.history.go(-1)
    document.location.href = '/saves'
  }, [getStarted, router])

  const clickGoBack = () => {
    const identifier = getStarted ? 'get-started.reader.gohome' : 'reader.goback'
    dispatch(sendSnowplowEvent(identifier))
    goBack()
  }

  const clickArchive = () => {
    archiveItem()
    goBack()
  }

  const buttonClass = cx(buttonReset, buttonStyles)

  useEffect(() => {
    const shortcutGoBack = () => {
      const analyticsData = { label: 'Back to Saves', value: 'b' }
      dispatch(sendSnowplowEvent('shortcut', analyticsData))
      goBack()
    }

    Mousetrap.bind('b', shortcutGoBack)
    return () => Mousetrap.unbind('b')
  }, [dispatch, goBack])

  const returnCopy = getStarted
    ? t('nav:back-to-home', 'Back to Home')
    : t('nav:back-to-saves', 'Back to Saves')
  return (
    <header className={headerStyle} data-testid="reader-nav">
      <div className="global-nav-container">
        <nav className={navStyle}>
          <button
            onClick={clickGoBack}
            aria-label={returnCopy}
            data-tooltip={returnCopy}
            data-testid="reader-nav-go-back"
            className={cx(buttonClass, rightTooltip, 'go-back')}>
            {getStarted ? (
              <>
                <HomeIcon />
                <span className="home-label">Home</span>
              </>
            ) : (
              <ArrowLeftIcon />
            )}
          </button>

          <div className={cx(getStarted && 'get-started', 'nav-actions')}>
            <button
              onClick={toggleSidebar}
              aria-label={
                sideBarOpen
                  ? t('nav:close-highlights-menu', 'Close Highlights Menu')
                  : t('nav:open-highlights-menu', 'Open Highlights Menu')
              }
              data-tooltip={
                sideBarOpen
                  ? t('nav:close-highlights-menu', 'Close Highlights Menu')
                  : t('nav:open-highlights-menu', 'Open Highlights Menu')
              }
              data-testid="reader-nav-highlights"
              className={cx(buttonClass, bottomTooltip)}>
              <HighlightIcon />
            </button>

            <button
              onClick={toggleTagging}
              aria-label={t('nav:tag-article', 'Tag Article')}
              data-tooltip={t('nav:tag-article', 'Tag Article')}
              data-testid="reader-nav-tag"
              className={cx(buttonClass, bottomTooltip)}>
              <TagIcon />
            </button>

            <button
              onClick={toggleFavorite}
              aria-label={
                favorite
                  ? t('nav:remove-from-favorites', 'Remove from Favorites')
                  : t('nav:favorite-article', 'Favorite Article')
              }
              data-tooltip={
                favorite
                  ? t('nav:remove-from-favorites', 'Remove from Favorites')
                  : t('nav:favorite-article', 'Favorite Article')
              }
              data-testid="reader-nav-favorite"
              className={cx(buttonClass, bottomTooltip, favorite && 'favorite')}>
              {favorite ? <FavoriteFilledIcon /> : <FavoriteIcon />}
            </button>

            <button
              onClick={clickArchive}
              aria-label={
                archive
                  ? t('nav:re-add-to-saves', 'Re-add to Saves')
                  : t('nav:archive-article', 'Archive Article')
              }
              data-tooltip={
                archive
                  ? t('nav:re-add-to-saves', 'Re-add to Saves')
                  : t('nav:archive-article', 'Archive Article')
              }
              data-testid="reader-nav-archive"
              className={cx(buttonClass, bottomTooltip)}>
              {archive ? <AddCircledIcon /> : <ArchiveIcon />}
            </button>

            <button
              onClick={toggleDelete}
              aria-label={t('nav:delete-from-saves', 'Delete from Saves')}
              data-tooltip={t('nav:delete-from-saves', 'Delete from Saves')}
              data-testid="reader-nav-delete"
              className={cx(buttonClass, bottomTooltip)}>
              <DeleteIcon />
            </button>

            <button
              onClick={toggleShare}
              aria-label={t('nav:share-article', 'Share Article')}
              data-tooltip={t('nav:share-article', 'Share Article')}
              data-testid="reader-nav-share"
              className={cx(buttonClass, bottomTooltip)}>
              <IosShareIcon />
            </button>
          </div>

          <DisplaySettings
            {...displaySettings}
            appRootSelector="#__next"
            setFontFamily={setFontFamily}
            setFontSize={setFontSize}
            setLineHeight={setLineHeight}
            setColumnWidth={setColumnWidth}
            isPremium={isPremium}
            onVisible={onVisible}
            colorMode={colorMode}
            setColorMode={setColorMode}
          />
        </nav>
      </div>
      <ProgressBar />
    </header>
  )
}
