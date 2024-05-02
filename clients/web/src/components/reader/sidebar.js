import { css, cx } from '@emotion/css'
import { Rail } from 'components/rail/rail'
import { ChevronLeftIcon } from '@ui/icons/ChevronLeftIcon'
import { ChevronRightIcon } from '@ui/icons/ChevronRightIcon'
import { buttonReset } from 'components/buttons/button-reset'
import { QuoteList } from 'components/annotations/annotations.list'
import { TicList } from 'components/annotations/annotations.tics'
import { useTranslation } from 'next-i18next'
import { breakpointSmallTablet } from 'common/constants'

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

  ${breakpointSmallTablet} {
    pointer-events: none;
  }

  &.active {
    pointer-events: auto;
    width: 350px;
    .rail-wrapper {
      opacity: 1;
      transform: translateX(0);
    }
    .button-rail {
      opacity: 1;
    }
  }
  &:hover {
    .rail-wrapper {
      opacity: 1;
    }
    .button-rail {
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

export const Sidebar = ({
  toggleSidebar,
  sideBarOpen,
  highlightList,
  annotationCount,
  shareItem,
  deleteAnnotation,
  isPremium,
  handleImpression
}) => {
  const { t } = useTranslation()

  const handleAnnotationClick = (position) => {
    window.scrollTo({
      left: 0,
      top: position - 100, // scroll 100px above item to offset header
      behavior: 'smooth'
    })
  }

  return (
    <aside className={cx(sideBarWrapper, sideBarOpen && 'active')}>
      <Rail visible={sideBarOpen} clickAction={sideBarOpen ? null : toggleSidebar}>
        <QuoteList
          isPremium={isPremium}
          visible={sideBarOpen}
          shareItem={shareItem}
          annotations={highlightList}
          annotationCount={annotationCount}
          deleteAnnotation={deleteAnnotation}
          onClickEvent={handleAnnotationClick}
          handleImpression={handleImpression}
        />

        <div className={cx(buttonRail, 'button-rail')}>
          <div className={verticallyCentered}>
            <button
              onClick={sideBarOpen ? toggleSidebar : null}
              aria-label={
                sideBarOpen
                  ? t('nav:close-highlights-menu', 'Close Highlights Menu')
                  : t('nav:open-highlights-menu', 'Open Highlights Menu')
              }
              className="pagination"
              data-testid="reader-sidebar-toggle">
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
        deleteAnnotation={deleteAnnotation}
        onClickEvent={handleAnnotationClick}
      />
    </aside>
  )
}
