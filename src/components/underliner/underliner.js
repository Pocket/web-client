/**
 * Underliner is a applied style that will provide a custom underline
 * relative to the size of the text.  The css creates a linear gradient
 * the color of the canvas with only the underline space as transparent.
 *
 * Color of the underline is determined by the background color of the
 * containing class. This allows us to create a transition on the underline
 * by applying transition to the background.  This is neccesary due to
 * the fact that linerar-gradient does not transition.
 *
 * @example
 * ```Javascript
 * const someCSSClassName = css`
 * .myClass {
 *   ${underliner};
 *   color: var(--textPrimary);
 *   &:hover{
 *      transition: background-color 300ms ease-in-out;
 *      background-color: var(--textPrimary);
 *   }
 * }`
 * ```
 */
export const underliner = {
  textShadow: `-0.126em 0.063em 0 var(--color-underliner),
    -0.063em 0.063em 0 var(--color-underliner),
    0 0.063em 0 var(--color-underliner),
    0.063em 0.063em 0 var(--color-underliner),
    0.126em 0.063em 0 var(--color-underliner),
    -0.126em 0 0 var(--color-underliner)`,
  backgroundColor: 'var(--color-underliner)',
  backgroundImage:
    'linear-gradient(to top, transparent 0%, transparent 8%, var(--color-underliner) 8%, var(--color-underliner) 100%)'
}
