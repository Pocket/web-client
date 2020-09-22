import gsap from 'gsap'

/**
 * ADD AMBIENT MOTION TO ELEMENTS
 * Builds a new GreenSock timeline with timelines for every element that needs have ambient motion.
 *
 * ambientElements:
 * @param {object}
 *  - @property {array} elements  Array of element refs to be animated @required
 *  - @property {object} yPercent: {min:value, max:value} @optional
 *  - @property {object} xPercent: {min:value, max:value} @optional
 *  - @property {object} duration: {min:value, max:value} @optional
 *  - @property {object} trigger  Ref of element that will trigger animations when in viewport @optional
 * @returns {array}  Array of gsap timelines
 */
export function addAmbientMotion({
  elements,
  yPercent = { min: 30, max: 30 },
  xPercent = { min: 30, max: 30 },
  duration = { min: 5, max: 8 },
  trigger
}) {
  if (!elements) return null

  return elements.map((element) => {
    return gsap
      .timeline({
        yoyo: true,
        repeat: -1,
        scrollTrigger: {
          trigger: trigger ? trigger : element,
          toggleActions: 'play pause resume pause'
        }
      })
      .to(element, {
        yPercent: gsap.utils.random(yPercent.min, yPercent.max),
        xPercent: gsap.utils.random(xPercent.min, xPercent.max),
        duration: gsap.utils.random(duration.min, duration.max),
        rotation: 0.01,
        force3D: true,
        ease: 'power3.inOut'
      })
  })
}
