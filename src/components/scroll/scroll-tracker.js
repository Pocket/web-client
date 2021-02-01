import { useState, useEffect } from 'react'

export const ScrollTracker = (ComponentToWrap) => {
  return ((props) => {
    let checking = false
    const [scrollPercentage, setPercentage] = useState(0)

    const getScrollPercent = () => {
      // https://stackoverflow.com/a/8028584
      const h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight'

      var val = ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100
      return isFinite(val) ? val : 0
    }

    const update = () => {
      checking = false
      const percent = getScrollPercent()
      setPercentage(percent)
    }

    useEffect(() => {
      update()

      const handleScroll = () => {
        if (!checking) requestAnimationFrame(update)
        checking = true
      }

      document.addEventListener('scroll', handleScroll)
      return window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
      <ComponentToWrap
        {...props}
        scrollPercentage={scrollPercentage}
      />
    )
  })
}
