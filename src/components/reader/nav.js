import { useDispatch } from 'react-redux'
import Link from 'next/link'
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
  WithTooltip,
  breakpointLargeTablet,
  breakpointMediumHandset
} from '@pocket/web-ui'
import { DisplaySettings } from 'components/display-settings/display-settings'
import { buttonReset } from 'components/buttons/button-reset'
import {
  updateLineHeight,
  updateColumnWidth,
  updateFontSize,
  updateFontType
} from 'containers/read/read.state'
import { useTranslation } from 'react-i18next'

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

  span[tooltip] {
    background: transparent;
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
  font-size: var(--size150);
  height: var(--size150);
  cursor: pointer;

  &.go-back {
    padding-right: 24px;
  }

  &:hover {
    color: var(--color-textPrimary);
    background-color: transparent;
  }

  &.favorite .icon {
    color: var(--color-amber);
  }
  .icon {
    background-color: transparent;
    color: var(--color-textSecondary);
    font-size: var(--size150);
    &:hover {
      color: var(--color-textPrimary);
      background-color: transparent;
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
  sideBarOpen
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
  const buttonClass = cx(buttonReset, buttonStyles)

  return (
    <header className={headerStyle}>
      <div className="global-nav-container">
        <nav className={navStyle}>
          <WithTooltip label={t("Back to My List")}>
            <button
              onClick={goBack}
              aria-label={t("Back to My List")}
              className={cx(buttonClass, 'go-back')}>
              <ArrowLeftIcon />
            </button>
          </WithTooltip>

          <div className="nav-actions">
            <WithTooltip label={sideBarOpen ? t("Close Highlights Menu") : t("Open Highlights Menu")}>
              <button
                onClick={toggleSidebar}
                aria-label={sideBarOpen ? t("Close Highlights Menu") : t("Open Highlights Menu")}
                className={buttonClass}>
                <HighlightIcon />
              </button>
            </WithTooltip>

            <WithTooltip label={t("Tag Article")}>
              <button
                onClick={toggleTagging}
                aria-label={t("Tag Article")}
                className={buttonClass}>
                <TagIcon />
              </button>
            </WithTooltip>

            <WithTooltip
              label={(favorite) ? t("Remove from Favorites") : t("Favorite Article")}>
              <button
                onClick={toggleFavorite}
                aria-label={(favorite) ? t("Remove from Favorites") : t("Favorite Article")}
                className={cx(buttonClass, favorite && 'favorite')}>
                {favorite ? <FavoriteFilledIcon /> : <FavoriteIcon />}
              </button>
            </WithTooltip>

            <WithTooltip label={archive ? t("Re-add to List") : t("Archive Article")}>
              <button
                onClick={archiveItem}
                aria-label={archive ? t("Re-add to List") : t("Archive Article")}
                className={buttonClass}>
                {archive ? <AddCircledIcon /> : <ArchiveIcon />}
              </button>
            </WithTooltip>

            <WithTooltip label={t("Delete from Library")}>
              <button
                onClick={toggleDelete}
                aria-label={t("Delete from Library")}
                className={buttonClass}>
                <DeleteIcon />
              </button>
            </WithTooltip>

            <WithTooltip label={t("Share Article")}>
              <button
                onClick={toggleShare}
                aria-label={t("Share Article")}
                className={buttonClass}>
                <IosShareIcon />
              </button>
            </WithTooltip>
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
          />
        </nav>
      </div>
    </header>
  )
}
