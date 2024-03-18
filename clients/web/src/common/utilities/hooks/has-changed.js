import { useRef, useEffect } from 'react'

export const useHasChanged = (val) => {
  const prevVal = usePrevious(val)
  if (!prevVal) return false
  return prevVal !== val
}

export const usePrevious = (value) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
