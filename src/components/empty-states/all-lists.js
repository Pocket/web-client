import { css } from 'linaria'
import BorderSVG from 'static/images/sunken-treasure-chest.svg'

const emptyStyles = css`
  text-align: center;
  img {
    margin: 52px 0;
  }
`

export const EmptyAllLists = () => {
  return (
    <div className={emptyStyles}>
      <img src={BorderSVG.src} alt="" />
      <p>Create your first list.</p>
    </div>
  )
}
