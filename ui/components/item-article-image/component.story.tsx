// Decorators
import { inArticleLayout } from '../_decorators/inArticleLayout'
import { inCard } from '../_decorators/inCard'

// Components
import { ItemArticleImage as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Item - Article /  Image',
  component: Component,
  decorators: [(Story) => inArticleLayout(Story, 2)]
}
export default meta

// Stories
type ComponentPropsAndCustomArgs = {
  idToUse: number
} & React.ComponentProps<typeof Component>
// prettier-ignore
const images = {
  missing: null,
  perfect: 'https://pocket-image-cache.com/640x360/filters:format(jpg):extract_focal()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-collectionapi-prod-images%2Ff9ec4814-8d77-4bfe-a759-0e6cba7453ab.jpeg',
  tall: 'https://pocket-image-cache.com/1200x/filters:format(jpg):extract_focal()/https%3A%2F%2Fs3.amazonaws.com%2Fpocket-collectionapi-prod-images%2F229247af-f201-4a68-914b-5fdb92bef7bd.png',
  wide: 'https://img-cdn.inc.com/image/upload/w_1024,h_576,c_fill/images/panoramic/GettyImages-1303793807_509111_xefuh5.jpg',
  small: 'https://pocket-image-cache.com/200x/filters:format(jpg):extract_focal()/https%3A%2F%2Fimages-assets.nasa.gov%2Fimage%2Fcarina_nebula%2Fcarina_nebula~medium.jpg',
  broken: 'https://www.baltimoresun.com/resizer/S386uMJ7GqScn6h_15U_J5YOYgI=/1200x0/top/cloudfront-us-east-1.images.arcpublishing.com/tronc/GQFD7ILH6FHHBEIT4LF3XDARJA.JPG'
}

export const Image: StoryObj<ComponentPropsAndCustomArgs> = {
  render: (args) => {
    return (
      <figure>
        <Component id={args.idToUse.toString()} imageUrl={args.imageUrl} />
      </figure>
    )
  },
  decorators: [inCard],
  argTypes: {
    id: {
      table: {
        disable: true
      }
    },
    idToUse: {
      control: { type: 'range', min: 1, max: 30, step: 1 }
    },
    imageUrl: {
      options: Object.keys(images),
      mapping: images,
      control: {
        type: 'select'
      }
    }
  },
  args: {
    idToUse: 1,
    imageUrl: 'missing'
  }
}
