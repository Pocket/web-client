import style from '../item/style.module.css'

import type { StoryFn } from '@storybook/react'

/**
 * inLayout
 * ---
 * Places the story in a container that simulates how it would sit
 * on an actual page
 * @see {@link https://storybook.js.org/docs/react/writing-stories/decorators}
 */
export function inCard(Story: StoryFn) {
  return (
    <div className={style.base}>
      <Story />
    </div>
  )
}
