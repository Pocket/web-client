import { usePopover, popoverBase } from 'components/popover/popover'
import { css } from '@emotion/css'
import { createPortal } from 'react-dom'

const Portal = ({ children }) => {
  return createPortal(children, document.body)
}
const popoverContainer = css`
  ${popoverBase};
  padding: 16px;
  font-size: 16px;
  line-height: 24px;
  max-width: 180px;
  .popoverLink {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

const wrapperLink = css`
  text-decoration: none;
  font-size: 1.5em;
  &:hover {
    text-decoration: none;
  }
  .trigger {
    font-size: 0.75em;
    &:hover {
      text-decoration: underline;
    }
  }
`

const PopoverBlock = function ({ popoverRef }) {
  return (
    <Portal>
      <div className={popoverContainer} ref={popoverRef}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam animi minima explicabo
        tenetur expedita nobis asperiores sapiente distinctio reiciendis ipsa ad temporibus
        consequuntur rem necessitatibus accusamus fuga minus, voluptatibus soluta.
      </div>
    </Portal>
  )
}

const PopoverAction = function ({ popoverOptions, copy }) {
  const handleClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }

  // Popover Effect
  const { popTrigger, popBody, shown } = usePopover(popoverOptions)

  {
    /*eslint-disable*/
  }
  return (
    <a className={wrapperLink} href="https://www.merriam-webster.com/dictionary/oops">
      <div> {copy}</div>
      <div className="trigger" onClick={handleClick} ref={popTrigger}>
        Click me
      </div>
      {shown ? <PopoverBlock popoverRef={popBody} /> : null}
    </a>
  )
}

export default {
  title: 'Components/Popover',
  component: usePopover
}

export const standard = () => {
  const copy = 'Standard function popup'
  const popoverOptions = {
    placement: 'top-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 0]
        }
      }
    ]
  }
  return <PopoverAction popoverOptions={popoverOptions} copy={copy} />
}

export const persistent = () => {
  const copy = 'Persistent function popup'
  const popoverOptions = {
    persistOnClick: true,
    placement: 'top-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 0]
        }
      }
    ]
  }
  return <PopoverAction popoverOptions={popoverOptions} copy={copy} />
}
