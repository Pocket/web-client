import { Popover, Trigger, Content, TooltipContent } from './popover-old'
import { css } from 'linaria'

export default {
  title: 'Components/Popover_old',
  component: Popover
}

const triggerElement = css`
  color: #222;
  cursor: pointer;
  &:hover {
    color: pink;
  }
`

export const onHover = () => (
  <div style={{ float: 'right' }}>
    <Popover>
      <Trigger>
        <div className={triggerElement}>Trigger</div>
      </Trigger>

      <Content>
        <h2>Surprise!</h2>
      </Content>
    </Popover>
  </div>
)

export const onHoverPersist = () => (
  <div style={{ float: 'right' }}>
    <Popover persist>
      <Trigger>
        <div className={triggerElement}>Trigger</div>
      </Trigger>

      <Content>
        <h2>Surprise!</h2>
      </Content>
    </Popover>
  </div>
)

export const onHoverTooltip = () => (
  <div>
    <Popover persist>
      <Trigger>
        <div className={triggerElement}>Trigger</div>
      </Trigger>

      <TooltipContent>Sneaky tooltip</TooltipContent>
    </Popover>
  </div>
)

export const onClick = () => (
  <div>
    <Popover persist activateOnClick>
      <Trigger>
        <div className={triggerElement}>Trigger</div>
      </Trigger>

      <Content>
        <h2>Surprise!</h2>
      </Content>
    </Popover>
  </div>
)
