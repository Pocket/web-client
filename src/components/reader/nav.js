import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { css, cx } from 'linaria'
import {
  ArrowLeftIcon,
  HighlightIcon,
  IosShareIcon,
  TagIcon,
  FavoriteIcon,
  FavoriteFilledIcon,
  ArchiveIcon,
  AddCircledIcon,
  DeleteIcon,
  breakpointLargeTablet,
  breakpointMediumHandset
} from '@pocket/web-ui'
import { DisplaySettings } from 'components/display-settings/display-settings'
import { buttonReset } from 'components/buttons/button-reset'
import { bottomTooltip } from 'components/tooltip/tooltip'
import {
  updateLineHeight,
  updateColumnWidth,
  updateFontSize,
  updateFontType
} from 'containers/read/read.state'
import { ProgressBar } from 'components/progress-bar/progress-bar'
import { useTranslation } from 'next-i18next'
import Mousetrap from 'mousetrap'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

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
  setColorMode
}) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const setFontFamily = (val) => dispatch(updateFontType(val))
  const setFontSize = (val) => dispatch(updateFontSize(val))
  const setLineHeight = (val) => dispatch(updateLineHeight(val))
  const setColumnWidth = (val) => dispatch(updateColumnWidth(val))
  const goBack = () => {
    if (window.history.length > 1) return window.history.go(-1)
    document.location.href = '/my-list'
  }
  const shortcutGoBack = () => {
    const analyticsData = { label: 'Back to List', value: 'b' }
    dispatch(sendSnowplowEvent('shortcut', analyticsData))
    goBack()
  }
  const buttonClass = cx(buttonReset, buttonStyles, bottomTooltip)

  useEffect(() => {
    Mousetrap.bind('b', shortcutGoBack)
    return () => Mousetrap.unbind('b')
  }, [])

  return (
    <header className={headerStyle} data-cy="reader-nav">
      <div className="global-nav-container">
        <nav className={navStyle}>
          <button
            onClick={goBack}
            aria-label={t('nav:back-to-my-list', 'Back to My List')}
            data-tooltip={t('nav:back-to-my-list', 'Back to My List')}
            data-cy="reader-nav-go-back"
            className={cx(buttonClass, 'go-back')}>
            <ArrowLeftIcon />
          </button>

          <div className="nav-actions">
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
              data-cy="reader-nav-highlights"
              className={buttonClass}>
              <HighlightIcon />
            </button>

            <button
              onClick={toggleTagging}
              aria-label={t('nav:tag-article', 'Tag Article')}
              data-tooltip={t('nav:tag-article', 'Tag Article')}
              data-cy="reader-nav-tag"
              className={buttonClass}>
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
              data-cy="reader-nav-favorite"
              className={cx(buttonClass, favorite && 'favorite')}>
              {favorite ? <FavoriteFilledIcon /> : <FavoriteIcon />}
            </button>

            <button
              onClick={archiveItem}
              aria-label={
                archive
                  ? t('nav:re-add-to-list', 'Re-add to List')
                  : t('nav:archive-article', 'Archive Article')
              }
              data-tooltip={
                archive
                  ? t('nav:re-add-to-list', 'Re-add to List')
                  : t('nav:archive-article', 'Archive Article')
              }
              data-cy="reader-nav-archive"
              className={buttonClass}>
              {archive ? <AddCircledIcon /> : <ArchiveIcon />}
            </button>

            <button
              onClick={toggleDelete}
              aria-label={t('nav:delete-from-library', 'Delete from Library')}
              data-tooltip={t('nav:delete-from-library', 'Delete from Library')}
              data-cy="reader-nav-delete"
              className={buttonClass}>
              <DeleteIcon />
            </button>

            <button
              onClick={toggleShare}
              aria-label={t('nav:share-article', 'Share Article')}
              data-tooltip={t('nav:share-article', 'Share Article')}
              data-cy="reader-nav-share"
              className={buttonClass}>
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
