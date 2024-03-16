/**
 * Interpolates variables into a GraphQL query/mutation string using a tagged template literal.
 *
 * @param {TemplateStringsArray} chunks - The string literals of the template.
 * @param {...unknown[]} variables - The values of the template expressions.
 * @returns {string} The interpolated GraphQL query/mutation string.
 */
export const gql = (chunks: TemplateStringsArray, ...variables: unknown[]): string => {
  const variableStrings = variables.map((variable) =>
    typeof variable !== 'undefined' && variable !== null ? variable.toString() : ''
  )

  return chunks
    .map((chunk, index) => `${chunk}${index in variableStrings ? variableStrings[index] : ''}`)
    .join('')
}
