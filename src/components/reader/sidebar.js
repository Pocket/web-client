import { css } from 'linaria'
import { Rail } from 'components/rail/rail'
import { ChevronLeftIcon, ChevronRightIcon } from '@pocket/web-ui'
import { buttonReset } from 'components/buttons/button-reset'
import { QuoteList } from 'components/annotations/annotations.list'
import { TicList } from 'components/annotations/annotations.tics'
import classNames from 'classnames'

const railWrapper = css`
  position: fixed;
  width: 80px;
  right: -80px;
  height: 100%;
  transition: opacity 150ms ease-in-out;
  opacity: 0;
  &:hover,
  &:hover button,
  &.visible,
  &.visible button {
    opacity: 1;
  }
`

const verticallyCentered = css`
  position: absolute;
  right: 0;
  top: 50%;
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
  opacity: 0;
  transition: opacity 200ms ease-in-out 0ms;

  &:hover {
    color: var(--color-textPrimary);
    background-color: var(--color-actionPrimarySubdued);
  }
`

export const Sidebar = ({
  toggleSidebar,
  sideBarOpen,
  highlightList,
  shareItem,
  shareData,
  deleteAnnotation
}) => {
  return (
    <>
      <Rail
        visible={sideBarOpen}
        clickAction={sideBarOpen ? null : toggleSidebar}>
        <QuoteList
          visible={sideBarOpen}
          shareItem={shareItem}
          annotations={highlightList}
          shareData={shareData}
          deleteAnnotation={deleteAnnotation}
        />

        <div className={classNames(railWrapper, { visible: sideBarOpen })}>
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
        visible={!sideBarOpen}
        shareItem={shareItem}
        annotations={highlightList}
        shareData={shareData}
        deleteAnnotation={deleteAnnotation}
      />
    </>
  )
}
