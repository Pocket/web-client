import React, { useRef, useEffect, useState } from 'react'
import { css } from 'linaria'
import { usePrefersReducedMotion } from './prefers-reduced-motion'
import gsap from 'gsap'

export default {
  title: 'Hooks/usePrefersReducedMotion'
}

const displayCase = css`
  display: inline-block;
  padding: 0 1rem;
  font-size: 2em;
  background-color: white;
  border: 1px solid black;
`

const rectangle = css`
  position: absolute;
  top: calc(50% - 1rem);
  left: calc(50% - 1rem);
  padding: 2rem;
  background: red;
`

export const GreensockAnimation = () => {
  const prefersReducedMotion = usePrefersReducedMotion()
  const ref = useRef()
  const [animation, setAnimation] = useState()

  useEffect(() => {
    setAnimation(
      gsap.to(ref.current, {
        rotation: 360,
        duration: 2,
        ease: 'power3.inOut',
        repeat: -1,
        yoyo: true,
        paused: prefersReducedMotion
      })
    )
  }, [])

  useEffect(() => {
    if (animation) prefersReducedMotion ? animation.pause() : animation.resume()
  }, [prefersReducedMotion])

  return (
    <>
      <div className={displayCase}>
        {prefersReducedMotion ? 'Stop moving!' : 'Keep moving ...'}
      </div>
      <div className={rectangle} ref={ref}></div>
    </>
  )
}
