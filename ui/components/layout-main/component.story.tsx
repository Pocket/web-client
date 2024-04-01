/* eslint-disable react/no-unescaped-entities */

// Components
import { LayoutMain as Component } from '.'

// Types
import type { Meta, StoryObj } from '@storybook/react'

// Storybook Meta
const meta: Meta<typeof Component> = {
  title: 'Layout / Main',
  component: Component,
  parameters: {
    layout: 'fullscreen'
  }
}
export default meta

// Stories
export const Main: StoryObj<typeof Component> = {
  render: () => {
    return (
      <Component>
        <p>
          You need the dark in order to show the light. That is when you can experience true joy,
          when you have no fear. A tree cannot be straight if it has a crooked trunk. That's crazy.
          Son of a gun. We tell people sometimes: we're like drug dealers, come into town and get
          everybody absolutely addicted to painting. It doesn't take much to get you addicted. Look
          around, look at what we have. Beauty is everywhere, you only have to look to see it.
        </p>

        <p>
          And right there you got an almighty cloud. It's almost like something out of a fairytale
          book. You have to make those little noises or it won't work. There it is.
        </p>

        <p>
          When you buy that first tube of paint it gives you an artist license. We'll make some
          happy little bushes here. I want everybody to be happy. That's what it's all about. Let's
          put a touch more of the magic here. We'll play with clouds today. I'm going to mix up a
          little color. We’ll use Van Dyke Brown, Permanent Red, and a little bit of Prussian Blue.
          Now it's beginning to make a little sense. I guess I'm a little weird. I like to talk to
          trees and animals. That's okay though; I have more fun than most people.
        </p>

        <p>
          Now we'll take the almighty fan brush. Just think about these things in your mind and drop
          em' on canvas. Mountains are so simple, they're hard. Fluff that up. Let's put some happy
          little clouds in our world. It's hard to see things when you're too close. Take a step
          back and look. You've got to learn to fight the temptation to resist these things. Just
          let them happen.
        </p>

        <p>
          Isn't that fantastic? You gotta think like a tree. Think about a cloud. Just float around
          and be there. You better get your coat out, this is going to be a cold painting.
        </p>
      </Component>
    )
  },
  args: {}
}
