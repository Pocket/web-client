/* eslint-disable no-unused-expressions */
import React, { useRef, useEffect, useState } from 'react'
import { useCorrectEffect } from 'common/utilities/hooks/use-correct-effect'
import PropTypes from 'prop-types'
import { css } from 'linaria'
import classNames from 'classnames'
import { breakpointMediumTablet, breakpointLargeHandset } from '@pocket/web-ui'
import { usePrefersReducedMotion } from 'common/utilities/hooks/prefers-reduced-motion'
import { addAmbientMotion } from 'common/utilities'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

import articleFrame from 'static/images/article-carousel/article-carousel-frame.svg'
import carouselBottom from 'static/images/article-carousel/carousel-bottom.svg'

const STAGGER = 0.5

// gsap requires each plugin be registered to use it.
gsap.registerPlugin(ScrollTrigger)

const articleCarousel = css`
  position: relative;

  ${breakpointLargeHandset} {
    height: 68.6vw;
    max-height: 22.4rem;
  }

  ul,
  .shapes {
    margin: 0 auto;
    max-width: 520px;

    ${breakpointMediumTablet} {
      max-width: 425px;
    }

    ${breakpointLargeHandset} {
      max-width: 450px;
    }
  }
  li,
  .frame-image,
  .shapes,
  .bottom-frame,
  .rectangle,
  .circle-a,
  .circle-b {
    position: absolute;
  }

  ul {
    padding: 0;
    position: relative;
    display: flex;
    justify-content: center;
    list-style-type: none;
    height: 25rem;
    overflow: hidden;
    z-index: 1;

    ${breakpointMediumTablet} {
      height: 21rem;
    }

    ${breakpointLargeHandset} {
      height: 100%;
    }

    li {
      top: 0.2rem;
      z-index: 1;
      width: 84%;
      opacity: 0;
      > img {
        width: 100%;
      }
      .frame-image {
        left: 2.2%;
        top: 9.4%;
        width: 22.6%;
      }
    }
  }

  .shapes {
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    animation: fadeIn ease-out 500ms;

    .rectangle {
      top: 14%;
      left: 9%;
      width: 14.5%;
      height: 42.5%;
      max-width: 75px;
      max-height: 170px;
      background: var(--color-apricotLight);
    }
    .circle-a,
    .circle-b {
      border-radius: 50%;
    }
    .circle-a {
      top: 24%;
      left: 0;
      max-width: 125px;
      max-height: 125px;
      width: 25%;
      height: 31.25%;
      background: var(--color-amberLight);
    }
    .circle-b {
      top: 48%;
      right: 0;
      max-width: 125px;
      max-height: 125px;
      width: 25%;
      height: 31.25%;
      background: var(--color-lapisLightest);
    }
  }

  .bottom-frame {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -0.35rem;
    width: 100%;
    max-width: 450px;
    margin: 0 auto;
    z-index: 2;
    animation: fadeIn ease-out 400ms;

    ${breakpointMediumTablet} {
      max-width: 370px;
    }

    ${breakpointLargeHandset} {
      max-width: 75vw;
    }
  }

  /* simple CSS fade in to avoid unstyled flashes as assets load */
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

/**
 * This is the actual animation used to cycle each article in the carousel.
 * It has five distinct phases used to create the effect. Each inividual
 * animation is offset in the parent timeline using delays to stagger each article.
 * @param {object} ref  Ref of article list item to be animated
 */
function buildArticleTimeline(ref) {
  return gsap
    .timeline()
    .set(ref, { zIndex: 0 })
    .fromTo(
      ref,
      {
        yPercent: -10,
        scale: 0.45,
        opacity: 0,
        boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)'
      },
      {
        yPercent: 0,
        scale: 0.85,
        opacity: 1,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        // the properties of rotation and force3D
        // are used here to fix jank in Firefox
        rotation: 0.01,
        force3D: true,
        ease: 'none'
      }
    )
    .set(ref, { zIndex: 2 })
    .to(ref, {
      scale: 1,
      yPercent: 100,
      boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.12)',
      ease: 'none'
    })
    .to(ref, {
      scale: 0.85,
      yPercent: 200,
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      ease: 'none'
    })
    .to(ref, {
      yPercent: 350,
      ease: 'none',
      opacity: 0,
      clearProps: 'all'
    })
}

/**
 * Renders an animated carousel of images with controllable duration and delay between each cycle.
 *
 * This component only plays when it's within the viewport and will not play if the media query
 * `prefers-reduced-motion` is detected to be anything except `no-preference`. Read more about
 * this CSS media feature [here](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).
 *
 * **This component should be imported dynamically:**
 *
 * ```
 *  import dynamic from 'next/dynamic'
 *
 *  const ArticleCarousel = dynamic(
 *    () => import('components/animation/article-carousel'),
 *  )
 * ```
 */
function ArticleCarousel({ images, className, delay, duration, useIntro }) {
  const prefersReducedMotion = usePrefersReducedMotion()

  /* REFS */
  const articleRefs = useRef([])
  const carouselRef = useRef()
  // Shape refs
  const circleARef = useRef()
  const circleBRef = useRef()
  const rectangleRef = useRef()

  /* STATE */
  const [isParentInView, setIsParentInView] = useState(false)
  const [currentParentTween, setCurrentParentTween] = useState(null)
  const [currentIndex, setCurrentIndex] = useState('0')
  const [isFirstPlay, setIsFirstPlay] = useState(true)
  // Intro
  const [isIntroDisabled, setIsIntroDisabled] = useState(!useIntro)
  const [isIntroReady, setIsIntroReady] = useState(false)
  const [isIntroComplete, setIsIntroComplete] = useState(null)
  // Timelines
  const [parentTimeline, setParentTimeline] = useState(null)
  const [shapeTimeline, setShapeTimeline] = useState(null)

  /**
   * Disables intro and immediatly moves timeline playhead to end of intro animation
   * @param {object} timeline  GreenSock timeline
   */
  function disableIntro(timeline) {
    if (!carouselRef.current) return
    setIsIntroDisabled(true)
    setIsIntroComplete(true)
    timeline.seek('0-=' + STAGGER).pause()
    if (images.length < 4) timeline.scrollTrigger.disable()
  }

  /* EFECTS */

  /**
   * Creates a parent timeline with all indiviual article animations
   */
  useCorrectEffect(() => {
    // Create a timeline to add individual animations to.
    const timeline = gsap.timeline({
      autoRemoveChildren: true,
      smoothChildTiming: true,
      // Scroll behaviors are setup here.
      scrollTrigger: {
        trigger: carouselRef.current,
        toggleActions: 'none none none none',
        onToggle: ({ isActive }) => {
          if (!carouselRef.current) return
          setIsParentInView(isActive)
        }
      }
    })

    // Now we create unique timelines for each image using the same animation.
    // Once the article animation is created, we add it back into to the parent
    // timeline at the end of the last timeline added staggered by a certain amount
    // to keep all the animations from playing at the same time.
    articleRefs.current.forEach((ref, index) => {
      timeline.add(buildArticleTimeline(ref), '<' + STAGGER).addLabel(index)
    })

    // If there are fewer than four images, we need to freeze the animation at a certain spot.
    if (images.length < 4 || prefersReducedMotion || isIntroDisabled) {
      disableIntro(timeline)
    } else {
      setIsIntroReady(true)
    }

    // set the parent timeline state to this timeline
    setParentTimeline(timeline)

    return () => {
      timeline.kill()
    }
  }, [])

  /**
   * Animate to next label in timeline and set current tween to allow pausing later
   */
  useEffect(() => {
    if (!isIntroComplete || !isParentInView || prefersReducedMotion || images.length < 4) return // prettier-ignore

    // Adds a new GreenSock article timeline into another timeline and updates the currentIndex
    function buildNextArticle() {
      if (!articleRefs.current[currentIndex]) return

      setCurrentIndex(parentTimeline.nextLabel())
      // prettier-ignore
      parentTimeline
        .add(buildArticleTimeline(articleRefs.current[currentIndex]), '<' + STAGGER)
        .addLabel(currentIndex)
    }

    // Animates timeline playhead to the next label and builds a new article timeline
    // when current timeline completes. The parent timeline is set to remove all completed
    // timelines/tweens via the 'autoRemoveChildren' property. This allows the Parent timeline
    // to infinitely loop since each loop is created on the fly.
    function tweenToNextLabel() {
      return parentTimeline?.tweenTo(parentTimeline.nextLabel(), {
        delay: isFirstPlay ? 0 : delay,
        ease: delay === 0 ? 'none' : 'power3.inOut',
        duration: duration,
        onComplete: buildNextArticle
      })
    }

    setIsFirstPlay(false)

    setCurrentParentTween(tweenToNextLabel())

    return () => {
      gsap.killTweensOf(parentTimeline)
    }
  }, [isParentInView, isIntroComplete, currentIndex, prefersReducedMotion])

  /**
   * Plays intro when timeline is ready and carousel is in view
   */
  useEffect(() => {
    if (isIntroComplete || isIntroDisabled) return

    function animateToIntro() {
      return parentTimeline?.tweenTo('0-=' + STAGGER, {
        ease: delay === 0 ? 'none' : 'power2.out',
        duration: delay === 0 ? duration * 2 : 2,
        onComplete: disableIntro,
        onCompleteParams: [parentTimeline]
      })
    }

    if (isIntroReady && isParentInView && !prefersReducedMotion) {
      setCurrentParentTween(animateToIntro())
    }
  }, [isIntroReady, isParentInView, prefersReducedMotion])

  /**
   * Animate the floating shapes in the background
   */
  useEffect(() => {
    const shapes = [circleARef.current, circleBRef.current, rectangleRef.current] // prettier-ignore
    const ambientElements = {
      elements: shapes,
      xPercent: { min: -17, max: 17 },
      yPercent: { min: -17, max: 17 },
      trigger: carouselRef.current
    }
    const ambientTimelines = addAmbientMotion(ambientElements)
    setShapeTimeline(ambientTimelines)

    return () => {
      ambientTimelines.forEach((timeline) => {
        timeline.kill()
      })
    }
  }, [])

  /**
   * Pauses all GSAP animations when 'prefers-reduced-motion' is true
   */
  useEffect(() => {
    shapeTimeline?.forEach((shape) => {
      prefersReducedMotion ? shape.pause() : shape.resume()
    })

    if (images.length < 4) return

    ScrollTrigger?.getAll().forEach((trigger) => {
      prefersReducedMotion ? trigger.disable() : trigger.enable()
    })

    currentParentTween?.pause()
  }, [prefersReducedMotion])

  return (
    <div className={classNames(articleCarousel, className)}>
      <ul ref={carouselRef}>
        {images.map((image, index) => (
          <li key={index} ref={(el) => (articleRefs.current[index] = el)}>
            <img src={articleFrame} alt="" />
            <img src={image} alt="" className="frame-image" />
          </li>
        ))}
      </ul>
      <div className="shapes">
        <div className="circle-a" ref={circleARef}></div>
        <div className="circle-b" ref={circleBRef}></div>
        <div className="rectangle" ref={rectangleRef}></div>
      </div>
      <img src={carouselBottom} alt="" className="bottom-frame" />
    </div>
  )
}

ArticleCarousel.propTypes = {
  /**
   * Array of objects with path to images that will be animated, if less than
   * four images are supplied, then there will be no animation applied.
   */
  images: PropTypes.array.isRequired,

  /**
   * A custom CSS class to apply to carousel article to override styles.
   */
  className: PropTypes.string,

  /**
   * Number of seconds that each article should pause for before the next cycle starts.
   * Setting delay to `0` will disable any easing between cycles and create a waterfall effect.
   */
  delay: PropTypes.number,

  /**
   * Number of seconds that each article should take to complete one animation cycle
   */
  duration: PropTypes.number,

  /**
   * Boolean to disable the animated intro when carousel is in view
   */
  useIntro: PropTypes.bool
}

ArticleCarousel.defaultProps = {
  className: null,
  delay: 2,
  duration: 1,
  useIntro: true
}

export default ArticleCarousel
