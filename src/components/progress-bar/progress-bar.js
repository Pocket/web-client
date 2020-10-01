import { css } from 'linaria'

const barWrapper = css`
  display: block;
  width: 100%;
  height: 2px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: var(--zIndexHeader);
  & > div {
    background-color: var(--color-actionPrimary);
    height: 2px;
    width: 100%;
    transition: transform 100ms linear;
  }
`

export const ProgressBar = ({ percentage = 0, noScroll = false }) => {
  const barTranslate = noScroll ? 0 : percentage
  return (
    <div className={barWrapper}>
      <div
        style={{
          transform: `translateX(${barTranslate - 100}%)`
        }}
      />
    </div>
  )
}
