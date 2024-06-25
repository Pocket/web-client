import style from './style.module.css'

// Types
import type { StoryFn } from '@storybook/react'

/**
 * inGrid
 * ---
 * Places the story in a grid
 * @see {@link https://storybook.js.org/docs/react/writing-stories/decorators}
 */
export function inGrid(Story: StoryFn, gridCount: GridCount) {
  return (
    <main className="page-container">
      <div data-columns={gridCount}>
        <div className="grid">
          <Story />
        </div>
      </div>
    </main>
  )
}

export type GridCount = 1 | 2 | 3 | 4 | 5 | 'lockup'
