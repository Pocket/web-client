type Value = string | number | boolean | undefined | null

/**
 * Build a space-separated string of class names from an array of values.
 *
 * @param classNameArray - An array containing values to be included in the class names.
 *   Values can be strings, numbers, booleans, undefined, or null.
 * @returns A string containing class names with whitespace trimmed and empty class names removed.
 */
export function buildClassnames(classNameArray: Value[]) {
  return (
    classNameArray
      // Get rid of any falsy values
      .filter(Boolean)
      // Make sure things are now strings only
      // https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
      .filter((value): value is string => typeof value === 'string')
      // Trim all the whitespace so we don't end up with strange returns
      .map((value) => value && value.trim())
      // We might still have some empty string after the trim, let's filter them
      .filter((value) => value.length)
      // Join it all togther with a space
      .join(' ')
  )
}
