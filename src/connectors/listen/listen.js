import { css } from 'linaria'
import { useState, useEffect } from 'react'

const playerWrapper = css`
  margin-bottom: 1rem;
`

const signUpWrapper = css`
  font-family: var(--fontSansSerif);
  font-weight: 300;
  color: var(--color-textTertiary);

  a {
    color: var(--color-actionPrimary);
    &:hover {
      color: var(--color-actionPrimaryHover);
    }
  }
`

export const Listen = ({ isAuthenticated, pointer }) => {
  const [playState, setPlayState] = useState('off')

  const Speech = global.SpeechSynthesisUtterance
  if (!Speech) return null

  const synth = global.speechSynthesis
  const content = document.getElementById(pointer)
  const monologue = new Speech(content.innerText)

  useEffect(() => {
    monologue.onend = () => setPlayState('off')
    monologue.onerror = () => setPlayState('error')
  }, [monologue])

  const handleListen = () => {
    setPlayState('playing')
    synth.speak(monologue)
  }

  const handlePause = () => {
    setPlayState('paused')
    synth.pause()
  }

  const handleResume = () => {
    setPlayState('playing')
    synth.resume()
  }

  const ListenButton = {
    off: <button onClick={handleListen}>Play</button>,
    playing: <button onClick={handlePause}>Pause</button>,
    paused: <button onClick={handleResume}>Resume</button>,
    error: <p className={signUpWrapper}>Something went wrong! Sorry about that 😬</p>
  }

  return isAuthenticated ? (
    <div className={playerWrapper}>
      {ListenButton[playState]}
    </div>
  ) : (
    <p className={signUpWrapper}>
      Want to listen to this article? <a href="/signup?syndicated-listen">Sign Up</a> to
      listen and gain access to personalized recommendations and all sorts of other great
      features!
    </p>
  )
}
