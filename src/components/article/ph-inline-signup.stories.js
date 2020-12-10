import React from 'react'
import { css } from 'linaria'
import { PocketHitsInlineSignup } from './ph-inline-signup'

export default {
  title: 'Article/Pocket Hits Inline Signup',
  component: PocketHitsInlineSignup
}

const MockArticleWidth = css`
  max-width: 650px;
`

export const normal = () => (
  <div className={MockArticleWidth}>
    <PocketHitsInlineSignup />
  </div>
)

export const isProcessing = () => (
  <div className={MockArticleWidth}>
    <PocketHitsInlineSignup isProcessing />
  </div>
)

export const success = () => (
  <div className={MockArticleWidth}>
    <PocketHitsInlineSignup isSuccessful />
  </div>
)
