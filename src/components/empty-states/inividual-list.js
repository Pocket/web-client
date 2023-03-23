import Link from 'next/link'
import { css } from 'linaria'
import BorderSVG from 'static/images/sunken-treasure-chest.svg'

const emptyStyles = css`
  text-align: center;
  img {
    margin: 52px 0;
  }
`

export const EmptyIndividualLists = ({ handleClick }) => {
  return (
    <div className={emptyStyles}>
      <img src={BorderSVG.src} alt="" />
      <p>Add items to your list. Go to Saves to get started.</p>
      <Link href="/saves">
        <a className="button outline" onClick={handleClick}>
          Go to Saves
        </a>     
      </Link> 
    </div>
  )
}
