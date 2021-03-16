import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '@pocket/web-ui'
import { css } from 'linaria'
import { Trans, useTranslation } from 'next-i18next'

import { itemsRecommendConfirm } from 'connectors/items-by-id/my-list/items.share'

const recommendStyle = css`
  display: flex;
  width: 100%;
  align-items: center;
  align-content: center;
  textarea {
    height: 2.5rem;
  }

  button {
    margin-left: var(--spacing100);
  }
`

export function ShareRecommend() {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [commentValue, setCommentValue] = useState('')
  const confirmShare = (comment) => dispatch(itemsRecommendConfirm(comment))
  const onClick = () => confirmShare(commentValue)

  return (
    <div className={`${recommendStyle} content`}>
      <textarea
        placeholder={t('share:comment', 'Comment')}
        value={commentValue}
        onChange={(e) => setCommentValue(e?.target?.value)}
      />
      <Button type="submit" onClick={onClick}>
        <Trans i18nKey="share:recommend">Recommend</Trans>
      </Button>
    </div>
  )
}
