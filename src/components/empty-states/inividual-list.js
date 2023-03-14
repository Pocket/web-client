import { css } from 'linaria'
import BorderSVG from 'static/images/sunken-treasure-chest.svg'

const emptyStyles = css`
  text-align: center;
  img {
    margin: 52px 0;
  }
`

export const EmptyIndividualLists = () => {
  return (
    <div className={emptyStyles}>
      <img src={BorderSVG.src} alt="" />
      <p>Add items to your list to quickly find them later.</p>
    </div>
  )
}
