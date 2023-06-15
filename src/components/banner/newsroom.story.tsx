import { BannerNewsroom as Component } from './newsroom'
import { css } from '@emotion/css'

export default {
  title: 'Components/Banner',
  component: Component
}

const templateContainerStyle = css`
  display: grid;
  align-items: start;
  justify-content: space-between;
  grid-column-gap: 1.5rem;
  grid-row-gap: 1.5rem;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-flow: dense;
  position: unset;
`
const Template = (args) => (
  <div className={templateContainerStyle}>
    <Component {...args} />
  </div>
)
export const NewsroomBanner = Template.bind({})
