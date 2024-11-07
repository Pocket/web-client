// Decorators
import { inCard } from '../_decorators/inCard'
import { inGrid } from '../_decorators/inGrid'

// Components
import { ItemArticleMedia as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Item - Article / Media',
  component: Component,
  decorators: [(Story) => inGrid(Story, 2)]
}
export default meta

// Stories
type ComponentPropsAndCustomArgs = {
  idToUse: number
  imageType: string
} & React.ComponentProps<typeof Component>
// prettier-ignore
const images = {
  missing: null,
  perfect: 'https://pocket-image-cache.com/640x320/filters:format(WEBP):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fc9d67046-1886-4384-806d-f0c7b83e5d5a.jpeg',
  tall: 'https://pocket-image-cache.com/320x640/filters:format(WEBP):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fc9d67046-1886-4384-806d-f0c7b83e5d5a.jpeg',
  wide: 'https://pocket-image-cache.com/640x120/filters:format(WEBP):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fc9d67046-1886-4384-806d-f0c7b83e5d5a.jpeg',
  small: 'https://pocket-image-cache.com/120x80/filters:format(WEBP):quality(100):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fc9d67046-1886-4384-806d-f0c7b83e5d5a.jpeg',
  broken: 'https://www.baltimoresun.com/resizer/S386uMJ7GqScn6h_15U_J5YOYgI=/1200x0/top/cloudfront-us-east-1.images.arcpublishing.com/tronc/GQFD7ILH6FHHBEIT4LF3XDARJA.JPG'
}

export const Media: StoryObj<ComponentPropsAndCustomArgs> = {
  render: (args) => {
    const id = args.idToUse.toString()
    const image = {
      cachedImages: [
        {
          url: images[args.imageType as keyof typeof images],
          id: 'WebP640'
        }
      ]
    }

    return (
      <figure>
        <Component id={id} image={image} />
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
    imageType: {
      options: Object.keys(images),
      mapping: images,
      control: {
        type: 'select'
      }
    }
  },
  args: {
    idToUse: 1,
    imageType: 'missing'
  }
}
