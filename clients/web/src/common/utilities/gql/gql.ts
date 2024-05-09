/** gql
 * ---
 * Interpolates variables into a GraphQL query/mutation string using a tagged template literal.
 * @remarks
 * This is a very basic implementation, there are more robust solutions out there that we
 * can explore at a later date should the need arise
 *
 */
export const gql = (chunks: TemplateStringsArray, ...variables: unknown[]): string => {
  const variableStrings = variables.map((variable) =>
    typeof variable === 'string' || typeof variable == 'number' ? variable.toString() : ''
  )

  return chunks
    .map((chunk, index) => `${chunk}${index in variableStrings ? variableStrings[index] : ''}`)
    .join('')
}
