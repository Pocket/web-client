import { Trans } from 'common/utilities/i18n'
/**
 * This file is being used as a temporary way to assist `i18next-parser` in
 * parsing strings used in the `my-list-demo` animation. Storybook is currently
 * not working with `next-i18next` and will break if <Trans> is imported..
 *
 * NOTE: This can be removed when:
 *   1. Storybook can be run successfully after importing <Trans>
 *   2. `my-list-demo` is refactored to include the <Trans> component listed below.
 */
export default function i18nextParserHelper() {
  return (
    <>
      <Trans i18nKey="common:my-list">My List</Trans>
    </>
  )
}
