import { useState, useEffect } from 'react'

export const useScrollPercentage = () => {
  const [scrollPercentage, setPercentage] = useState(0)

  useEffect(() => {
    const calculateScrollPercentage = () => {
      const htmlContainer = document.documentElement
      const bodyContainer = document.body

      const scrollTop = htmlContainer.scrollTop || bodyContainer.scrollTop
      const scrollHeight = htmlContainer.scrollHeight || bodyContainer.scrollHeight
      const scrollDistance = scrollHeight - htmlContainer.clientHeight
      const scrollPercent = (scrollTop / scrollDistance) * 100

      setPercentage(scrollPercent)
    }

    window.addEventListener('scroll', calculateScrollPercentage)

    return () => window.removeEventListener('scroll', calculateScrollPercentage)
  })

  return scrollPercentage
}
