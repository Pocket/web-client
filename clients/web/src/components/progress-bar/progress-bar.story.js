import { ProgressBar as Component } from './progress-bar'
import { css } from '@emotion/css'

const lorem = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor arcu felis, vel pulvinar nibh luctus non. Pellentesque tempus, elit non mollis cursus, nibh odio tempus mauris, at ornare elit mi in neque. Aenean fermentum efficitur eleifend. Nulla velit libero, ultrices vel aliquet vitae, cursus in dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris a ornare neque, vel cursus quam. Etiam interdum risus et justo gravida ornare. Donec molestie dictum finibus. Proin id magna sed arcu cursus luctus. Nunc lobortis pharetra urna, vel pharetra diam ornare auctor. Duis ullamcorper sed odio nec rhoncus. In hac habitasse platea dictumst. Vivamus vitae consectetur sem, ut iaculis nunc.',
  'Vestibulum pharetra, nunc et volutpat maximus, augue mi varius elit, eu aliquam ante eros ut ex. Proin vel sodales purus, eget posuere turpis. Sed sodales orci velit, at tempor nibh aliquet sit amet. Vivamus vulputate, lacus eu mattis scelerisque, elit diam vestibulum orci, eu volutpat lectus justo eu nunc. Sed a leo elementum, posuere leo in, condimentum magna. Morbi in venenatis neque, in condimentum nibh. Nullam quis maximus est. Quisque hendrerit sed mauris gravida ullamcorper. Morbi sollicitudin dapibus nisl et fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla egestas commodo placerat. Quisque vitae mollis arcu. Etiam id sollicitudin sapien. Nunc quis odio at neque faucibus porttitor eu sed libero. Curabitur at justo nec dolor rutrum malesuada ac id nibh.',
  'Proin orci leo, volutpat id pulvinar sit amet, hendrerit nec risus. Vivamus rutrum, elit sed aliquam congue, quam mauris commodo ex, ac finibus urna metus nec mi. Curabitur molestie accumsan pharetra. Vivamus scelerisque urna odio, at vulputate lectus semper at. Donec lobortis odio ut justo aliquet aliquam. Aliquam sodales mi ac metus hendrerit rhoncus eu in ex. Pellentesque porttitor posuere cursus. Phasellus vitae turpis vitae est bibendum vestibulum. Integer tempor mauris sit amet orci venenatis viverra. Vivamus tempus sapien nec mauris ultrices, nec dignissim lacus tempor. Vestibulum in nisi tincidunt, commodo nulla quis, molestie nulla. Vestibulum egestas massa augue, vel feugiat eros elementum sed. Fusce sit amet turpis non dui suscipit dignissim.',
  'In hac habitasse platea dictumst. Cras viverra nulla eget felis egestas mollis. Quisque dui lorem, placerat eget velit a, suscipit interdum dolor. In cursus cursus diam, at rhoncus ex. Donec ornare scelerisque tellus vitae dignissim. Curabitur dui lectus, sollicitudin eu lacus ac, varius aliquam nulla. Praesent non sapien ac tortor egestas sollicitudin. Nam eget tempor sapien, vel tincidunt justo. Curabitur sit amet diam et orci viverra faucibus. Integer in pharetra massa.',
  'Etiam ut porta tellus, id iaculis magna. Phasellus id sagittis elit. Nulla varius semper porta. Etiam non accumsan est. Vivamus a volutpat metus. Quisque ultricies, velit sed pharetra maximus, justo lectus elementum ex, a laoreet quam ipsum ac augue. Cras et tincidunt est. Integer consequat ante tristique, imperdiet purus in, gravida lectus. Vestibulum non dolor magna.'
]

const generateLorem = (count) => {
  const content = []
  for (let i = 0; i < count; i++) {
    content.push(lorem[Math.floor(Math.random() * lorem.length)])
  }
  return content
}

export default {
  title: 'Components/ProgressBar',
  component: Component
}

const navBar = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
`

const longPageStyles = css`
  box-sizing: border-box;
  display: block;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`

const Template = (args) => {
  return (
    <>
      <div className={navBar}>
        <Component {...args} />
      </div>
      <div className={longPageStyles}>
        {generateLorem(args.loremCount).map((lorem, index) => (
          <p key={index}>{lorem}</p>
        ))}
      </div>
    </>
  )
}

export const ProgressBar = Template.bind({})
ProgressBar.args = {
  loremCount: 22,
  noSroll: true
}
