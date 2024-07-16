import style from './style.module.css'

import type { StoryFn } from '@storybook/react'

/**
 * inCenter
 * ---
 * Places the story in the center of the page. Useful for minor elements with overflows (like menus)
 * @see {@link https://storybook.js.org/docs/react/writing-stories/decorators}
 */
export function inCenter(Story: StoryFn) {
  return (
    <section className={style.center}>
      <Story />
    </section>
  )
}
