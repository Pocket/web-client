import { css } from 'linaria'
import { Rail } from 'components/rail/rail'
import { ChevronLeftIcon, ChevronRightIcon } from '@pocket/web-ui'
import { buttonReset } from 'components/buttons/button-reset'
import { QuoteList } from 'components/annotations/annotations.list'
import { TicList } from 'components/annotations/annotations.tics'
import classNames from 'classnames'

const sideBarWrapper = css`
  width: 110px;
  height: calc(100vh - 64px);
  position: fixed;
  z-index: 1;

  .rail-wrapper {
    opacity: 0;
    transform: translateX(-318px);
    transition: all 150ms ease-in-out;
    padding-top: var(--size400);
  }

  &.active {
    width: 350px;
    .rail-wrapper {
      opacity: 1;
      transform: translateX(0);
    }
    .button-rail  {
      opacity: 1;
    }
  }
  &:hover {
    .rail-wrapper {
      opacity: 1;
    }
    .button-rail  {
      opacity: 1;
    }
  }
`

const buttonRail = css`
  position: fixed;
  top: 0;
  width: 80px;
  right: -80px;
  height: 100%;
  transition: opacity 150ms ease-in-out;
  opacity: 0;
`

const verticallyCentered = css`
  position: absolute;
  right: 0;
  top: calc(50%);
  padding-top: 64px;
  transform: translateY(-50%);
`

const buttonStyles = css`
  background: var(--color-popoverCanvas);
  color: var(--color-textSecondary);
  font-size: var(--size150);
  border-radius: 50%;
  height: 32px;
  width: 32px;
  text-align: center;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.15);
  transform: translate(-24px, -24px);
  &:hover {
    color: var(--color-textPrimary);
    background-color: var(--color-actionPrimarySubdued);
  }
`

export const Sidebar = ({
  toggleSidebar,
  sideBarOpen,
  highlightList,
  annotationCount,
  shareItem,
  shareData,
  deleteAnnotation,
  isPremium
}) => {
  const handleAnnotationClick = (position) => {
    window.scrollTo({
      left: 0,
      top: position - 100, // scroll 100px above item to offset header
      behavior: 'smooth'
    })
  }

  return (
    <aside className={classNames(sideBarWrapper, { active: sideBarOpen })}>
      <Rail
        visible={sideBarOpen}
        clickAction={sideBarOpen ? null : toggleSidebar}>
        <QuoteList
          isPremium={isPremium}
          visible={sideBarOpen}
          shareItem={shareItem}
          annotations={highlightList}
          annotationCount={annotationCount}
          shareData={shareData}
          deleteAnnotation={deleteAnnotation}
          onClickEvent={handleAnnotationClick}
        />

        <div className={classNames(buttonRail, 'button-rail')}>
          <div className={verticallyCentered}>
            <button
              onClick={toggleSidebar}
              className={classNames(buttonReset, buttonStyles)}>
              {sideBarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </button>
          </div>
        </div>
      </Rail>
      <TicList
        isPremium={isPremium}
        visible={!sideBarOpen}
        shareItem={shareItem}
        annotations={highlightList}
        annotationCount={annotationCount}
        shareData={shareData}
        deleteAnnotation={deleteAnnotation}
        onClickEvent={handleAnnotationClick}
      />
    </aside>
  )
}
