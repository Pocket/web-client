import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '@pocket/web-ui'
import { css } from 'linaria'
import { Trans, useTranslation } from 'next-i18next'

import { itemsRecommendConfirm } from 'connectors/items-by-id/my-list/items.share'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

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

export function ShareRecommend({ item, position }) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [commentValue, setCommentValue] = useState('')
  const { open_url, item_id } = item

  const confirmShare = (comment) => {
    const data = { id: item_id, url: open_url, position }
    dispatch(itemsRecommendConfirm(comment))
    dispatch(sendSnowplowEvent('share.recommend', data))
  }
  const onClick = () => confirmShare(commentValue)

  return (
    <div className={`${recommendStyle} content`}>
      <textarea
        placeholder={t('share:comment', 'Comment')}
        value={commentValue}
        onChange={(e) => setCommentValue(e?.target?.value)}
        data-cy="share-recommend-input"
      />
      <Button type="submit" onClick={onClick} data-cy="share-recommend-submit">
        <Trans i18nKey="share:recommend">Recommend</Trans>
      </Button>
    </div>
  )
}
