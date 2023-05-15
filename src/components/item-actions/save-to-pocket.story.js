import { SaveToPocket } from './save-to-pocket'
import { useEffect, useState } from 'react'
import { css } from '@emotion/css'

const styles = css`
  font-family: sans-serif;
`

export default {
  title: 'Components/SaveToPocket',
  component: SaveToPocket
}

export const LoggedOut = () => {
  return (
    <div className={styles}>
      <SaveToPocket />
    </div>
  )
}

export const LoggedIn = () => {
  const [saveStatus, setSaveStatus] = useState('unsaved')
  let timer

  useEffect(() => {
    return () => clearTimeout(timer)
  }, [timer])

  const startTimer = () => {
    setSaveStatus('saving')

    timer = setTimeout(() => {
      setSaveStatus('saved')
    }, 1000)
  }

  return (
    <div className={styles}>
      <SaveToPocket saveStatus={saveStatus} isAuthenticated={true} saveAction={startTimer} />
    </div>
  )
}
