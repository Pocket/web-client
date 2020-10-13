import { css } from 'linaria'
import { Rail } from 'components/rail/rail'

const railWrapper = css`

`

export const Sidebar = ({
  clickAction,
  sideBarOpen
}) => {

  return (
    <Rail visible={sideBarOpen} clickAction={sideBarOpen ? null : clickAction}>
      👀 Peek!
    </Rail>
  )
}
