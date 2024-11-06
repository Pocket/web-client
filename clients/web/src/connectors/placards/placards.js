import { useEffect, useState, useRef } from 'react'
import style from './style.module.css'
import { useSelector } from 'react-redux'

export function Placard({ placement, position, shouldDisplay }) {
  // Get data from the state
  const placements = useSelector((state) => state.placards.placements)
  const placementForThisPlacard = placements ? placements[placement] : null

  const data = placementForThisPlacard ? placementForThisPlacard[position] : {}
  const { format, url, callbacks, image_url, alt_text, block_key } = data
  const { click, impression } = callbacks ?? {}

  // Set up the state to manage impressions
  const [hasTracked, setHasTracked] = useState(false)
  const elementRef = useRef(null)

  // Set up the intersection observer through a useEffect
  useEffect(() => {
    if (hasTracked || !impression || !shouldDisplay) return

    const trackImpression = async () => {
      try {
        // await fetch(impression)
        console.info(`Impression Tracked: ${block_key}`)
        setHasTracked(true)
      } catch (error) {
        console.error('Error tracking impression:', error)
      }
    }

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting) {
          await trackImpression()
          observer.disconnect() // Stop observing once tracked
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    )

    if (elementRef.current) observer.observe(elementRef.current)

    return () => observer.disconnect() // Cleanup observer on component unmount
  }, [hasTracked, impression, block_key, shouldDisplay])

  if (!data) return null

  const handleClick = () => {
    try {
      if (click) fetch(click)
    } catch {
      console.warn('Click action failed', block_key)
    }
  }

  return shouldDisplay ? (
    <div className={`${style.wrapper} ${style[format]}`} ref={elementRef}>
      <a href={url} onClick={handleClick}>
        <img src={image_url} alt={alt_text} />
      </a>
      <p className="label">{alt_text}</p>
    </div>
  ) : null
}

/**
 * EXAMPLE
 * ---
  format: 'billboard',
  url: 'https://www.mozilla.org/en-US/advertising/',
  callbacks: {
    click:
      'http://localhost:8080/v1/t?data=CksqC2NyYXp5X2VkZGllMiQwMzI2N2FkMS0wMDc0LTRhYTYtOGUwYy1lYzE4ZTA5MDZiZmVyEHBvY2tldF9iaWxsYm9hcmSYAQKoAQQSIIRi0fSX7ChYnwOh8yODK3Qw-MfbNQZ-R3EOhTOD2wXA',
    impression:
      'http://localhost:8080/v1/t?data=CksqC2NyYXp5X2VkZGllMiQwMzI2N2FkMS0wMDc0LTRhYTYtOGUwYy1lYzE4ZTA5MDZiZmVyEHBvY2tldF9iaWxsYm9hcmSYAQGoAQQSIFoCwqf5lL2L6uM7lFVRh12I2E_FgPQtTgjYhlDvGK1K'
  },
  image_url: 'https://picsum.photos/seed/0/970/250',
  alt_text: 'Ad 1 for mozilla_ads',
  block_key: 'CAQSC2NyYXp5X2VkZGll'
 */
