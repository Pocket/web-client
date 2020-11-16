import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '@pocket/web-ui'
import { css } from 'linaria'

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
  const [commentValue, setCommentValue] = useState('')
  const confirmShare = () => dispatch(itemsRecommendConfirm())
  const onClick = () => {
    confirmShare(commentValue)
  }
  return (
    <div className={`${recommendStyle} content`}>
      <textarea
        placeholder="Comment"
        value={commentValue}
        onChange={(e) => setCommentValue(e.target.value)}
      />
      <Button type="submit" onClick={onClick}>
        Recommend
      </Button>
    </div>
  )
}
