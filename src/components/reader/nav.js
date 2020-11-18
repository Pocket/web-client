import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { css } from 'linaria'
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
import classNames from 'classnames'
import {
  updateLineHeight,
  updateColumnWidth,
  updateFontSize,
  updateFontType
} from 'containers/read/read.state'

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
  cursor: pointer;
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
  displaySettings
}) => {
  const dispatch = useDispatch()

  const setFontFamily = (val) => dispatch(updateFontType(val))
  const setFontSize = (val) => dispatch(updateFontSize(val))
  const setLineHeight = (val) => dispatch(updateLineHeight(val))
  const setColumnWidth = (val) => dispatch(updateColumnWidth(val))
  const goBack = () => history.go(-1)

  return (
    <header className={headerStyle}>
      <div className="global-nav-container">
        <nav className={navStyle}>
          <WithTooltip label="Back to My List">
            {/*'reader.topNav.back'*/}
            <button
              onClick={goBack}
              className={classNames(buttonReset, buttonStyles)}>
              <ArrowLeftIcon />
            </button>
          </WithTooltip>

          <div>
            <WithTooltip label="Open Highlights Menu">
              <button
                onClick={toggleSidebar}
                className={classNames(buttonReset, buttonStyles)}>
                <HighlightIcon />
              </button>
            </WithTooltip>

            <WithTooltip label="Tag Article">
              <button
                onClick={toggleTagging}
                className={classNames(buttonReset, buttonStyles)}>
                <TagIcon />
              </button>
            </WithTooltip>

            <WithTooltip label="Favorite Article">
              <button
                onClick={toggleFavorite}
                className={classNames(buttonReset, buttonStyles, { favorite })}>
                {favorite ? <FavoriteFilledIcon /> : <FavoriteIcon />}
              </button>
            </WithTooltip>

            <WithTooltip label="Archive Article">
              <button
                onClick={archiveItem}
                className={classNames(buttonReset, buttonStyles)}>
                {archive ? <AddCircledIcon /> : <ArchiveIcon />}
              </button>
            </WithTooltip>

            <WithTooltip label="Delete from Library">
              <button
                onClick={toggleDelete}
                className={classNames(buttonReset, buttonStyles)}>
                <DeleteIcon />
              </button>
            </WithTooltip>

            <WithTooltip label="Share Article">
              <button
                onClick={toggleShare}
                className={classNames(buttonReset, buttonStyles)}>
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
          />
        </nav>
      </div>
    </header>
  )
}
