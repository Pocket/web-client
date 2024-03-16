import { useState, useRef } from 'react'
import { sectionStyles } from 'components/dev-tools/tool-styles'
import { useSelector, useDispatch } from 'react-redux'
import { featuresToggle } from 'connectors/feature-flags/feature-flags.state'
import { LinkCopyIcon } from '@ui/icons/LinkCopyIcon'
import { CheckCircledIcon } from '@ui/icons/CheckCircledIcon'

import queryString from 'query-string'
import copy from 'clipboard-copy'
import { BASE_URL } from 'common/constants'

export function Features() {
  const features = useSelector((state) => state.features)
  const featureList = Object.keys(features)

  const [copiedHomeLink, setCopiedHomeLink] = useState(false)
  const [copiedSavesLink, setCopiedSavesLink] = useState(false)
  const [currentLink, setCurrentLink] = useState(false)

  const timerHomeLink = useRef()
  const timerSavesLink = useRef()

  const buildAssignmentParameters = (url) => {
    const assign = Object.values(features)
      .filter((feature) => feature.active)
      .map((feature) => feature.name)

    const link = queryString.stringifyUrl({ url, query: { assign } })
    copy(link)
    setCurrentLink(link)
  }

  const copyHomeLink = () => {
    buildAssignmentParameters(`${BASE_URL}/home`)
    setCopiedHomeLink(true)
    setCopiedSavesLink(false)
    clearTimeout(timerHomeLink.current)
    timerHomeLink.current = setTimeout(() => {
      setCopiedHomeLink(false)
      setCurrentLink(false)
    }, 6000)
  }
  const copySavesLink = () => {
    buildAssignmentParameters(`${BASE_URL}/saves`)
    setCopiedSavesLink(true)
    setCopiedHomeLink(false)
    clearTimeout(timerSavesLink.current)
    timerSavesLink.current = setTimeout(() => {
      setCopiedSavesLink(false)
      setCurrentLink(false)
    }, 6000)
  }

  return (
    <div className={sectionStyles}>
      <h6>Feature Flags</h6>
      <div className="flags">
        {featureList.length
          ? featureList.map((feature) => <FeatureToggle feature={feature} key={feature} />)
          : null}
      </div>
      <div className="link-block">
        <div className="link" onClick={copyHomeLink}>
          {copiedHomeLink ? <CheckCircledIcon /> : <LinkCopyIcon />} from Home
        </div>
        <div className="link" onClick={copySavesLink}>
          {copiedSavesLink ? <CheckCircledIcon /> : <LinkCopyIcon />} from Saves
        </div>
      </div>
      {currentLink ? (
        <section className="stacked">
          <div className="title">Copied to your clipboard!</div>
          <div className="description">{currentLink}</div>
        </section>
      ) : null}
    </div>
  )
}

function FeatureToggle({ feature }) {
  const dispatch = useDispatch()

  const featureAssigned = useSelector((state) => state.features[feature].active)
  const handleChange = () => dispatch(featuresToggle(feature))

  return (
    <div>
      <input type="checkbox" id={feature} checked={featureAssigned} onChange={handleChange} />
      <label htmlFor={feature}>{feature}</label>
    </div>
  )
}
