'use client'

// Components
import { useRef } from 'react'

//State
import { useItemDisplay } from '.'

// Types
import type { ItemDisplayState } from '.'

/**
 * HydrateItemDisplay
 * ---
 * This is what we use to hydrate state on the client.
 * As it is marked `use client` it will only run once the
 * page is rendered on the client
 */
export function HydrateItemDisplay({ state }: { state: ItemDisplayState }) {
  // We only want to do this once so we set a ref to make sure of that
  const initialized = useRef(false)
  if (!initialized.current) {
    useItemDisplay.setState(state)
    initialized.current = true
  }
  // Since this is a component we want to make sure
  // we aren't rendering anything
  return null
}
