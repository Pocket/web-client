import { css } from '@emotion/css'
import copy from 'clipboard-copy'

/*ICONS_IMPORTS*/

export default {
  title: 'UI/Icons'
}

const Label = css`
  display: block;
  width: 100%;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 24px;
  padding: 0.5rem 1rem;
  margin: 0;
  border-radius: var(--borderRadius);
  cursor: pointer;
  &:hover {
    background-color: var(--color-actionPrimarySubdued);
  }
`

const Grid = css`
  display: grid;
  grid-template-columns: repeat(3, 4fr);
  grid-row-gap: 1em;
  grid-column-gap: 1em;
  justify-content: space-between;
  justify-items: center;
  margin: 0 0 2em 0;

  & > div {
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }
`

const iconStyle = css`
  font-size: 2em;
`
const iconsArray = [
  /*ICONS_ARRAY*/
]

export const Icons = () => {
  const iconComponents = iconsArray.map((Icon) => {
    const name = Icon.name
    const iconCopy = () => copy(name)
    return (
      <div key={name}>
        <div className={Label} onClick={iconCopy}>
          <Icon className={iconStyle} /> {name}
        </div>
      </div>
    )
  })

  return <div className={Grid}>{iconComponents}</div>
}
