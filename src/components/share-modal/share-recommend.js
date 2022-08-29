import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'components/buttons/button'
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
    margin-left: 16px;
  }
`

export function ShareRecommend({ recommendEvent }) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [commentValue, setCommentValue] = useState('')

  const onClick = () => recommendEvent(commentValue)

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
