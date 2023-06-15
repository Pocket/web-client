import { CallOutNewsroom as Component } from './newsroom'
import { css } from '@emotion/css'

export default {
  title: 'Components/CallOut',
  component: Component
}

const templateContainerStyle = css`
  box-sizing: content-box;
  margin: 0px auto;
  max-width: 1128px;
  padding: 2.5rem;

  .main {
    display: grid;
    align-items: start;
    justify-content: space-between;
    grid-column-gap: 1.5rem;
    grid-row-gap: 1.5rem;
    grid-template-columns: repeat(12, 1fr);
    grid-auto-flow: dense;
    position: unset;
  }
`
const Template = (args) => (
  <div className={templateContainerStyle}>
    <div className="main">
      <Component {...args} />
    </div>
  </div>
)
export const NewsroomCallOut = Template.bind({})
