import { sectionStyles } from './tool-styles'
import { LinkCopyIcon } from 'components/icons/LinkCopyIcon'

export default {
  title: 'Dev/Tools'
}

const features = {
  'getstarted-v2': {
    assigned: true,
    active: false,
    variant: 'control',
    test: 'temp.web.client.getstarted-v2',
    payload: null,
    name: 'getstarted-v2'
  },
  getstarted: {
    assigned: true,
    active: false,
    variant: 'control',
    test: 'temp.web.client.getstarted',
    payload: null,
    name: 'getstarted'
  },
  annotations: {
    assigned: false,
    active: false,
    variant: null,
    test: 'temp.web.client.annotations',
    payload: null,
    name: 'annotations'
  },
  'lab.annotations': {
    assigned: false,
    active: false,
    variant: null,
    test: 'temp.web.client.lab.annotations',
    payload: null,
    name: 'lab.annotations'
  },
  'lab.braze': {
    assigned: false,
    active: false,
    variant: null,
    test: 'temp.web.client.lab.braze',
    payload: null,
    name: 'lab.braze'
  },
  'lab.listen': {
    assigned: false,
    active: false,
    variant: null,
    test: 'temp.web.client.lab.listen',
    payload: null,
    name: 'lab.listen'
  },
  'api.next': {
    assigned: false,
    active: false,
    variant: null,
    test: 'temp.web.client.api.next',
    payload: null,
    name: 'api.next'
  },
  'home.interests': {
    assigned: false,
    active: true,
    variant: null,
    test: 'temp.web.client.home.interests',
    payload: null,
    name: 'home.interests'
  },
  'pocket-hits.disable': {
    assigned: true,
    active: true,
    variant: null,
    test: 'temp.web.client.pocket-hits.disable',
    payload: null,
    name: 'pocket-hits.disable'
  },
  profiletest: {
    assigned: false,
    active: false,
    variant: null,
    test: 'temp.web.client.profiletest',
    payload: null,
    name: 'profiletest'
  },
  'home.release': {
    assigned: true,
    active: true,
    variant: null,
    test: 'temp.web.client.home.release',
    payload: null,
    name: 'home.release'
  },
  'home.lineup': {
    assigned: false,
    active: false,
    variant: 'disabled',
    test: 'perm.web.client.home.lineup',
    payload: null,
    name: 'home.lineup'
  },
  lab: {
    assigned: false,
    active: false,
    variant: null,
    test: 'temp.web.client.lab',
    payload: null,
    name: 'lab'
  },
  'onboarding.rollout': {
    assigned: true,
    active: true,
    variant: null,
    test: 'perm.web.client.onboarding.rollout',
    payload: null,
    name: 'onboarding.rollout'
  },
  flagsReady: true
}
const featureList = Object.keys(features)

export const Tools = () => {
  const onboardingReset = () => {}
  const wipeBrazeData = () => {}
  const requestPush = () => {}
  const toggleDevMode = () => {}
  const links = [{ src: '#', title: 'superawesome', description: 'A superawesome feature' }]

  return (
    <>
      <div className={sectionStyles}>
        <h6>Account Resets</h6>
        <section onClick={onboardingReset}>
          <div className="title">Reset Onboarding</div>
          <div className="description">Start onboarding from the start</div>
        </section>
      </div>

      <div className={sectionStyles}>
        <section onClick={wipeBrazeData}>
          <div className="title">Reset Braze</div>
          <div className="description">Wipes data and starts new session</div>
        </section>

        <section>
          <div className="title">Push notifications</div>
          <div className="description">You’re subscribed! 🎉</div>
        </section>

        <section className="error">
          <div>
            Push notifications are currently blocked.
            <br />
            <a href="">Please update your settings</a>
          </div>
        </section>

        <section onClick={requestPush}>
          <div className="title">Push notifications</div>
          <div className="description">Allows push notifications from Braze</div>
        </section>
      </div>

      <div className={sectionStyles}>
        <h6>Links in progress</h6>
        {links.map((link) => (
          <a href={link.src} key={link.title} onClick={toggleDevMode} className="action-block">
            <div className="title">{link.title}</div>
            <div className="description">{link.description}</div>
          </a>
        ))}
      </div>

      <div className={sectionStyles}>
        <h6>Feature Flags</h6>
        <div className="flags">
          {featureList.length
            ? featureList.map((feature) => <Feature key={feature} feature={feature} />)
            : null}
        </div>
        <div className="link-block">
          <div className="link">
            <LinkCopyIcon /> from Home
          </div>
          <div className="link">
            <LinkCopyIcon /> from Saves
          </div>
        </div>
      </div>
    </>
  )
}

const Feature = ({ feature }) => {
  const handleChange = () => {}
  const featureAssigned = features[feature].assigned
  return (
    <div>
      <input type="checkbox" id={feature} checked={featureAssigned} onChange={handleChange} />
      <label htmlFor={feature}>{feature}</label>
    </div>
  )
}
