import { css } from 'linaria'
import {
  ArrowLeftIcon, HighlightIcon, IosShareIcon,
  TagIcon, FavoriteIcon, ArchiveIcon, DeleteIcon,
  WithTooltip
} from '@pocket/web-ui'
import { DisplaySettings } from 'components/display-settings/display-settings'
import { ShareArticle } from './share'
import { buttonReset } from 'components/buttons/button-reset'
import classNames from 'classnames'

const headerStyle = css`
  position: fixed;
  z-index: var(--zIndexHeader);
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
`

const buttonStyles = css`
  background-color: transparent;
  color: var(--color-textSecondary);
  font-size: var(--size150);
  &:hover {
    color: var(--color-textPrimary);
    background-color: transparent;
  }
`

const articleActions = css`
  & < .icon {
    background-color: transparent;
    color: var(--color-textSecondary);
    font-size: var(--size150);
    &:hover {
      color: var(--color-textPrimary);
      background-color: transparent;
    }
  }
`

export const ReaderNav = ({ toggleSidebar }) => {
  return (
    <header className={headerStyle}>
      <div className="global-nav-container">
        <nav className={navStyle}>
          <WithTooltip label="Back to My List">{/*'reader.topNav.back'*/}
            <button className={classNames(buttonReset, buttonStyles)}>
              <ArrowLeftIcon />
            </button>
          </WithTooltip>

          <div className={articleActions}>
            <WithTooltip label="Open Highlights Menu">
              <button
                onClick={toggleSidebar}
                className={classNames(buttonReset, buttonStyles)}>
                <HighlightIcon />
              </button>
            </WithTooltip>

            <WithTooltip label="Tag Article">
              <button className={classNames(buttonReset, buttonStyles)}>
                <TagIcon />
              </button>
            </WithTooltip>

            <WithTooltip label="Favorite Article"> {/*Unfavorite Article*/}
              <button className={classNames(buttonReset, buttonStyles)}>
                <FavoriteIcon />
              </button>
            </WithTooltip>

            <WithTooltip label="Archive Article">
              <button className={classNames(buttonReset, buttonStyles)}>
                <ArchiveIcon />
              </button>
            </WithTooltip>

            <WithTooltip label="Delete from Library">
              <button className={classNames(buttonReset, buttonStyles)}>
                <DeleteIcon />
              </button>
            </WithTooltip>

            <ShareArticle appRootSelector="#root" />
          </div>

          <DisplaySettings appRootSelector="#root" isPremium/>
        </nav>
      </div>
    </header>
  )
}
// appRootSelector="#__next"
