import { useEffect, useLayoutEffect } from 'react'

/**
 * UseLayout effect is required for SSR and useEffect is used client side
 * This function just picks the correct function based on existence of
 * `window` since that is not present in node
 */
export const useCorrectEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect
