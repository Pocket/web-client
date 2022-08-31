import { useRef, useState } from 'react'
import { css } from 'linaria'
import { LISTEN_SPEEDS } from 'common/constants'
import { ListenIcon } from 'components/icons/ListenIcon'

const audioStyles = css`
  display: flex;
  margin-bottom: 1rem;

  .icon {
    margin-right: 14px;
    line-height: 2.8rem;
    height: 1.5rem;
    color: var(--color-textPrimary);
  }

  audio {
    display: inline-block;
    width: 100%;
    height: 42px;
    border-radius: 22px;
    border: 1px solid var(--color-textSecondary);
  }

  select {
    cursor: pointer;
    margin: 1px 0 1px 10px; // 1px margins make up for accent border on audio element
    width: 80px;
    min-width: 80px;
    height: 2.5rem;
    display: inline-block;
  }
`

export const Audio = ({
  url,
  playEvent,
  pauseEvent,
  rateChangeEvent,
  endEvent,
}) => {
  const ref = useRef()
  const [playbackSpeed, setPlaybackSpeed] = useState(1)

  const onPlay = () => playEvent()
  const onPause = () => pauseEvent()
  const onRateChange = (e) => rateChangeEvent(e.target.playbackRate)
  const onEnded = () => endEvent()

  const updatePlayback = (e) => {
    setPlaybackSpeed(e.target.value)
    ref.current.playbackRate = e.target.value
  }

  return (
    <div className={audioStyles}>
      <ListenIcon />
      <audio
        ref={ref}
        src={url}
        onPlay={onPlay}
        onPause={onPause}
        onRateChange={onRateChange}
        onEnded={onEnded}
        controls
      />
      <select value={playbackSpeed} onChange={updatePlayback}>
        {LISTEN_SPEEDS.map(val => (
          <option value={val} key={val}>{val}x</option>
        ))}
      </select>
    </div>
  )
}

Audio.defaultProps = {
  url: null,
  playEvent: () => { },
  pauseEvent: () => { },
  rateChangeEvent: () => { },
  endEvent: () => { }
}
