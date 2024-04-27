import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { requestSharedItem } from './sharedItem.state'

export default function Share() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { slug } = router.query

  useEffect(() => {
    dispatch(requestSharedItem(slug))
  }, [dispatch, slug])

  // We made our request and so we are on our way
  // this is wrapped in useEffect to force clientSide
  useEffect(() => {
    router.replace('/home')
  })
}
