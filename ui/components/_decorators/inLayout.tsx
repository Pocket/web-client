import type { StoryFn } from '@storybook/react'

/**
 * inLayout
 * ---
 * Places the story in a container that simulates how it would sit
 * on an actual page
 * @see {@link https://storybook.js.org/docs/react/writing-stories/decorators}
 */
export function inLayout(Story: StoryFn) {
  return (
    <main className="page-container">
      <Story />
    </main>
  )
}
