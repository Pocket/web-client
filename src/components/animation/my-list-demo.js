import React, { useRef, useEffect, useState } from 'react'
import { useCorrectEffect } from 'common/utilities/hooks/use-correct-effect'
import PropTypes from 'prop-types'
import { css } from 'linaria'
import classNames from 'classnames'
import { usePrefersReducedMotion } from 'common/utilities/hooks/prefers-reduced-motion'
import { addAmbientMotion } from 'common/utilities'
import gsap from 'gsap'
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

import firefoxBrowserLogo from 'static/images/firefox-browser-logo.svg'
import browserUI from 'static/images/my-list-demo/browser-ui.svg'
import saveButtonIcon from 'static/images/my-list-demo/save-button.svg'
import listImageA from 'static/images/my-list-demo/saving-browser-list-001.png'
import listImageB from 'static/images/my-list-demo/saving-browser-list-002.png'
import listImageC from 'static/images/my-list-demo/saving-browser-list-003.png'

// gsap requires each plugin be registered to use it.
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

const myListDemo = css`
  position: relative;
  animation: fadeIn ease-out 400ms;

  .heading,
  .save-button,
  .bg-shapes,
  ul,
  .article,
  .rectangle-a,
  .rectangle-b,
  .circle-a {
    position: absolute;
  }

  .browser-ui {
    position: relative;
    background-image: url(${browserUI});
    background-position: center;
    background-repeat: no-repeat;
    filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.12));
    /* set aspect ratio for proper size while loading: (width / height * 100%) */
    padding-top: calc(325 / 543 * 100%);
  }

  .firefox-browser-logo {
    position: absolute;
    top: 4.4%;
    left: 11.3%;
    width: 2.3%;
  }

  .save-button {
    transform: scale(0.4);
    top: 3.2%;
    right: 19%;
    width: 10%;
  }

  .heading {
    overflow: visible;
    z-index: 1;
    display: block;
    top: 22%;
    left: 15%;
    width: 25%;
    font-weight: 600;
    font-family: var(--fontSansSerif);
  }

  ul {
    top: 14.5%;
    left: 15%;
    padding: 0;
    margin: 0;
    overflow: hidden;
    width: 73%;
    height: 77.6%;

    .article {
      top: 20%;
      width: 30.33%;
      display: flex;
      flex-direction: column;
      height: 73%;
      background-color: var(--color-white100);
      list-style: none;

      img {
        max-height: 62.7%;
        object-fit: cover;
      }

      &:nth-of-type(2) {
        left: calc(33.33% + 1.5%);
      }

      &:nth-of-type(3) {
        left: calc(66.66% + 3%);
      }

      img {
        flex: 2;
        max-height: 62.7%;
      }

      .copy-wrapper {
        flex: 1;

        display: grid;
        grid-template-rows: repeat(24, 1fr);

        /* styles for the blank copy section */
        span {
          display: block;
          height: 100%;

          &:nth-of-type(1) {
            grid-row: 4 / span 3;
            background-color: var(--color-grey80);
            width: 100%;
          }

          &:nth-of-type(2) {
            grid-row: 9 / span 2;
            background-color: var(--color-grey80);
            max-width: 40%;
          }

          &:nth-of-type(3) {
            grid-row: 13 / span 12;
            background-color: var(--color-grey95);
            width: 100%;
          }
        }
      }
    }
  }

  .bg-shapes {
    padding-top: 60%;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;

    .rectangle-a {
      top: 59%;
      right: 0;
      padding: 5% 10%;
      background: var(--color-amber);
    }
    .rectangle-b {
      top: 26%;
      right: 4%;
      padding: 10% 5%;
      background: var(--color-coral);
    }
    .circle-a {
      border-radius: 50%;
      top: 33%;
      left: 0;
      padding: 11.34%;
      background: var(--color-teal70);
    }
  }

  .overflow-wrapper {
    opacity: 0;

    .article {
      width: 100%;
    }
  }

  /* simple CSS fade in to avoid unstyled flashes as assets load */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
  }

  @media screen and (prefers-reduced-motion: reduce) {
    .save-button {
      transform: scale(1);
    }
  }
`

/**
 * Builds a GSAP timeline to animate from the list view to the large article view
 * @param {object} heading  Ref of "My List" heading
 * @param {array} listArticles  Array of article ref objects in "My List"
 * @param {object} overflowArticle  Ref of individual article that breaks out of browser
 * @param {array} overflowCopy  Array of ref objects for the blank copy section
 */
function buildListToArticle(
  heading,
  listArticles,
  overflowArticle,
  overflowCopy
) {
  const LABEL = 'list-to-article'

  return gsap
    .timeline()
    .add(LABEL)
    .to(
      heading,
      { yPercent: 200, opacity: 0, ease: 'power2.in', duration: 0.6 },
      LABEL
    )
    .to(
      listArticles,
      {
        yPercent: 100,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.in',
        rotation: 0.01,
        force3D: true
      },
      LABEL + '+=0.1'
    )
    .fromTo(
      overflowArticle,
      { yPercent: -100 },
      {
        yPercent: -13,
        height: '83%',
        width: '100%',
        rotation: 0.01,
        force3D: true,
        ease: 'power2.out'
      },
      LABEL + '+=0.6'
    )
    .from(
      overflowCopy,
      {
        width: 0,
        stagger: 0.2,
        ease: 'power2.out',
        duration: 1.2,
        clearProps: 'width'
      },
      '<'
    )
}

/**
 * Builds a GSAP timeline to animate the save button
 * @param {object} saveButton  Ref of browser save button
 */
function buildButtonPop(saveButton) {
  return gsap
    .timeline()
    .to(saveButton, {
      scale: 1.25,
      rotation: 0.01,
      force3D: true,
      duration: 0.75,
      ease: 'back.out(1.4)'
    })
    .to(saveButton, {
      delay: 2,
      scale: 0.4,
      rotation: 0.01,
      force3D: true,
      duration: 1,
      ease: 'power3.inOut'
    })
}

/**
 * Builds a GSAP timeline to animate from the large article view to the list view
 * @param {array} listArticles  Array of article ref objects in "My List"
 * @param {object} heading  Ref of "My List" heading
 * @param {object} overflowWrapper  Ref of wrapper containing the article that breaks out of browser
 * @param {object} overflowArticle  Ref of individual article that breaks out of browser
 * @param {object} overflowCopyWrapper  Ref of the wrapper containing the blank copy
 */
function buildArticleToList(
  listArticles,
  heading,
  overflowWrapper,
  overflowArticle,
  overflowCopyWrapper
) {
  const LABEL = 'article-to-list'
  const ARTICLE_DURATION = 2

  return gsap
    .timeline()
    .add(LABEL)
    .set(overflowWrapper, { overflow: 'visible' })
    .set(listArticles, { yPercent: -100, opacity: 0 })
    .set(listArticles[0], { visibility: 'hidden' })
    .set(heading, { yPercent: -200, opacity: 0 })
    .to(
      overflowArticle,
      {
        boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.12)',
        rotation: 0.01,
        force3D: true,
        duration: 0.6,
        ease: 'power3.in'
      },
      LABEL
    )
    .to(
      overflowCopyWrapper,
      {
        padding: '0 3% 3% 3%',
        duration: 0.6,
        ease: 'power3.in'
      },
      LABEL
    )
    .to(
      overflowArticle,
      {
        width: '30.33%',
        height: '73%',
        ease: 'power3.inOut',
        duration: ARTICLE_DURATION - 0.65
      },
      LABEL
    )
    .to(
      overflowArticle,
      {
        motionPath: {
          alignOrigin: [0.5, 0.5],
          curviness: 2,
          path: [
            {
              yPercent: -13,
              xPercent: 0,
              rotation: 0.01,
              boxShadow: '0px 0px 4px rgba(0, 0, 0, 0)'
            },
            {
              yPercent: -95,
              xPercent: 30,
              rotation: -20,
              boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.12)'
            },
            {
              yPercent: 0,
              xPercent: 0,
              rotation: 0.01,
              boxShadow: '0px 0px 4px rgba(0, 0, 0, 0)'
            }
          ]
        },
        transformOrigin: '50% 50%',
        duration: ARTICLE_DURATION,
        force3D: true,
        ease: 'power3.inOut'
      },
      LABEL
    )
    .to(
      overflowArticle,
      {
        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0)',
        ease: 'power3.out',
        duration: 0.3
      },
      '>-0.6'
    )
    .to(
      overflowCopyWrapper,
      {
        padding: '0px 0px 0px 0px',
        ease: 'power3.out',
        duration: 0.3
      },
      '>-0.3'
    )
    .to(
      listArticles,
      {
        yPercent: 0,
        opacity: 1,
        stagger: 0.1,
        rotation: 0.01,
        force3D: true,
        ease: 'power3.out'
      },
      '>-0.4'
    )
    .to(
      heading,
      { yPercent: 0, opacity: 1, ease: 'back.out(1.4)', duration: 0.6 },
      '>'
    )
}

/**
 * Renders a simplified animated demonstration of saving an article into **My List**.
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
 *  const MyListDemo = dynamic(
 *    () => import('components/animation/my-list-demo')
 *  )
 * ```
 */
function MyListDemo({ className, showFirefoxLogo }) {
  const prefersReducedMotion = usePrefersReducedMotion()

  /* REFS */
  const saveButton = useRef()
  const heading = useRef()
  // My list refs
  const listWrapper = useRef()
  const listArticles = useRef([])
  // Overflow article
  const overflowWrapper = useRef()
  const overflowCopyWrapper = useRef()
  const overflowArticle = useRef()
  const overflowCopy = useRef([])
  // Shape refs
  const circleA = useRef()
  const rectangleA = useRef()
  const rectangleB = useRef()

  /* TIMELINES */
  const [parentTimeline, setParentTimeline] = useState()
  const [ambientTimelines, setShapeTimeline] = useState(null)

  /* EFFECTS */

  /**
   * Animate the floating shapes in the background
   */
  useCorrectEffect(() => {
    const sharedProps = {
      duration: { min: 6, max: 11 },
      trigger: listWrapper.current
    }
    const ambientCircle = {
      elements: [circleA.current],
      xPercent: { min: -10, max: 10 },
      yPercent: { min: -60, max: 60 },
      ...sharedProps
    }
    const ambientRectangleA = {
      elements: [rectangleA.current],
      xPercent: { min: -40, max: 5 },
      yPercent: { min: -5, max: 50 },
      ...sharedProps
    }
    const ambientRectangleB = {
      elements: [rectangleB.current],
      xPercent: { min: -15, max: 8 },
      yPercent: { min: -30, max: 40 },
      ...sharedProps
    }

    const ambientTimelines = [
      ...addAmbientMotion(ambientCircle),
      ...addAmbientMotion(ambientRectangleA),
      ...addAmbientMotion(ambientRectangleB)
    ]

    setShapeTimeline(ambientTimelines)

    return () => {
      ambientTimelines.forEach((timeline) => {
        timeline.kill()
      })
    }
  }, [])

  /**
   * Build the entire looping animation by adding all the different distinct
   * timelines into one Parent Timeline for looping.
   */
  useCorrectEffect(() => {
    const timeline = gsap
      .timeline({
        // Scroll behaviors are setup here.
        scrollTrigger: {
          trigger: listWrapper.current,
          toggleActions: 'play pause resume pause'
        },
        repeat: -1,
        repeatDelay: 2
      })
      .set(overflowWrapper.current, { opacity: 1 })
      .add(
        buildListToArticle(
          heading.current,
          listArticles.current,
          overflowArticle.current,
          overflowCopy.current
        ),
        '+=1'
      )
      .add(buildButtonPop(saveButton.current), '+=1.5')
      .add(
        buildArticleToList(
          listArticles.current,
          heading.current,
          overflowWrapper.current,
          overflowArticle.current,
          overflowCopyWrapper.current
        ),
        '>-2'
      )

    if (prefersReducedMotion) timeline.scrollTrigger.disable()

    setParentTimeline(timeline)

    return () => {
      timeline.kill()
    }
  }, [])

  /**
   * Pauses all GSAP animations when 'prefers-reduced-motion' is true
   */
  useEffect(() => {
    if (parentTimeline)
      prefersReducedMotion ? parentTimeline.pause() : parentTimeline.resume()

    if (ambientTimelines)
      ambientTimelines.forEach((shape) => {
        prefersReducedMotion ? shape.pause() : shape.resume()
      })

    ScrollTrigger.getAll().forEach((trigger) => {
      prefersReducedMotion ? trigger.disable() : trigger.enable()
    })
  }, [prefersReducedMotion])

  return (
    <div className={classNames(myListDemo, className)}>
      <div className="bg-shapes">
        <div className="circle-a" ref={circleA}></div>
        <div className="rectangle-a" ref={rectangleA}></div>
        <div className="rectangle-b" ref={rectangleB}></div>
      </div>
      <div className="browser-ui"></div>
      {showFirefoxLogo ? (
        <img src={firefoxBrowserLogo} alt="" className="firefox-browser-logo" />
      ) : null}

      {/* Using an svg wrapper to scale text with the parent container. */}
      <svg viewBox="0 0 200 20" className="heading" ref={heading}>
        <text x="0" y="15">
          {/* TODO: Add <Trans> when Storybook is setup */}
          My List
        </text>
      </svg>

      {/* Contains all articles that need to be contained within the browser. */}
      <ul ref={listWrapper}>
        {[listImageA, listImageB, listImageC].map((image, index) => (
          <li
            key={index}
            ref={(el) => (listArticles.current[index] = el)}
            className="article">
            <img src={image} alt="" />
            <div className="copy-wrapper">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </li>
        ))}
      </ul>

      {/* Contains the article that needs to break out of the browser ui. */}
      <ul className="overflow-wrapper" ref={overflowWrapper}>
        <li ref={overflowArticle} className="article">
          <img src={listImageA} alt="" />
          <div className="copy-wrapper" ref={overflowCopyWrapper}>
            <span ref={(el) => (overflowCopy.current[0] = el)}></span>
            <span ref={(el) => (overflowCopy.current[1] = el)}></span>
            <span ref={(el) => (overflowCopy.current[2] = el)}></span>
          </div>
        </li>
      </ul>

      <img
        src={saveButtonIcon}
        alt=""
        className="save-button"
        ref={saveButton}
      />
    </div>
  )
}

MyListDemo.propTypes = {
  /**
   * A custom CSS class to apply to carousel article to override styles.
   */
  className: PropTypes.string,

  /**
   * Set to true to show the Firefox Browser Logo in the top left corner of the browser.
   */
  showFirefoxLogo: PropTypes.bool
}

MyListDemo.defaultProps = {
  className: null,
  showFirefoxLogo: false
}

export default MyListDemo
