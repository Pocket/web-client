/* eslint-disable -- legacy behavior -- needs update */

/**
 * When you want to ensure a function only runs once, useful for init code
 * @param  {Function} function to ensure runs once
 * @return {Function}     the wrapped function to invoke
 */
export function once(fn, context) {
  var result

  return function () {
    if (fn) {
      result = fn.apply(context || this, arguments)
      fn = null
    }

    return result
  }
}
