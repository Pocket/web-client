import * as React from 'react'

/**
 * Creates a Storybook decorator function that will create knobs for every story
 * that the decorator is called on. Pass a function as an argument that maps props
 * to nobs: e.g.:
 *
 * // this says "create a radio knob with label 'size' that corresponds to prop
 * // 'size' on the component in the story
 * defineKnobs((props) => {
 *  return {
 *    size: radio(
 *      'size',
 *      { small: 'small', medium: 'medium', large: 'large' },
 *      props.size
 *    )
 *  }
 * })
 *
 * The passed function will also receive current component props when called so
 * that component props can be used as default knob values.
 *
 * The knobs will only be created on stories in the Canvas view, rather than stories
 * the Docs view, because Docs addon currently isn't compatible with knobs.
 *
 *
 * @param   {Function}  mapKnobsToProps  A function that will return an object where
 *                      the key is a prop name and the value is an invoked knob function.
 *                      Receives current component props object as its arg.
 *                      See: https://github.com/storybookjs/storybook/tree/master/addons/knobs
 *
 * @return  {Function}  A standard Storybook decorator function that receives a
 *                      story component function and expects a component to be returned.
 */
export default function defineKnobs(mapKnobsToProps) {
  const WithKnobs = props => {
    const childProps = props.children ? props.children.props : {}
    // here we retrieve knobs and their resulting values for our props
    const knobProps = mapKnobsToProps(childProps)

    // component is cloned in order to inject modified knob props
    return React.cloneElement(props.children, {
      ...knobProps,
    })
  }

  return storyFn => {
    // only employ WithKnobs if we're looking at the canvas story view, not Docs
    if (window.location.href.includes('viewMode=story')) {
      return <WithKnobs>{storyFn()}</WithKnobs>

      // otherwise just pass through the story/component without decoration
    } else {
      return storyFn()
    }
  }
}
