import { css } from '@emotion/css'
import { breakpointLargeHandset, breakpointMediumHandset } from 'common/constants'

const publisherGrid = css`
  display: grid;
  grid-template-columns: repeat(4, 110px);
  grid-row-gap: var(--spacing250);
  justify-content: space-between;
  justify-items: center;
  margin: 0 0 var(--spacing400) 0;

  img {
    max-width: 110px;

    .colormode-dark & {
      filter: invert(1);
      mix-blend-mode: difference;
    }
    .colormode-sepia & {
      mix-blend-mode: multiply;
    }
  }

  ${breakpointLargeHandset} {
    grid-template-columns: repeat(3, 110px);
  }

  ${breakpointMediumHandset} {
    grid-template-columns: repeat(2, 110px);
    justify-content: space-around;
  }
`

/**
 * Renders a grid of Publisher logos with their names as the alt attribute
 */
function PublisherGrid() {
  const publishers = [
    {
      name: 'Popular Science',
      path: 'https://assets.getpocket.com/web-discover/_next/static/images/logo-popularScience.6e42c72d2b519374f8890658fe6017c8.png'
    },
    {
      name: 'Citylab',
      path: 'https://assets.getpocket.com/web-discover/_next/static/images/logo-cityLab.9e0bd36a41f15352795a0c3e7906a3c0.png'
    },
    {
      name: 'Nautilus',
      path: 'https://assets.getpocket.com/web-discover/_next/static/images/logo-nautilus.502dac97876417c33fa1fd816dbe1be7.png'
    },
    {
      name: 'Outside',
      path: 'https://assets.getpocket.com/web-discover/_next/static/images/logo-outside.caceae38dae39eb0fd97561adb9ec329.png'
    },
    {
      name: 'The Atlantic',
      path: 'https://assets.getpocket.com/web-discover/_next/static/images/logo-theAtlantic.e677bedd3e236707befe860fd6222307.png'
    },
    {
      name: 'Mental Floss',
      path: 'https://assets.getpocket.com/web-discover/_next/static/images/logo-mentalFloss.06006c57b9c4bbeb44c0e0b6950f1f05.png'
    },
    {
      name: 'Texas Monthly',
      path: 'https://assets.getpocket.com/web-discover/_next/static/images/logo-texasMonthly.3e6a266d1f86c6168b17c3f0ff5cc9e6.png'
    },
    {
      name: 'Saveur',
      path: 'https://assets.getpocket.com/web-discover/_next/static/images/logo-saveur.b8f157917ff7e05dc121a97178ce1d0a.png'
    },
    {
      name: 'Narratively',
      path: 'https://assets.getpocket.com/web-discover/_next/static/images/logo-narratively.2bad2936c51eb8ff8ee0373ce5d84cce.png'
    },
    {
      name: 'Atlas Obscura',
      path: 'https://assets.getpocket.com/web-discover/_next/static/images/logo-atlasObscura.fea07c0cee36b47a9a0cf376e595403d.png'
    },
    {
      name: 'Harvard Business Review',
      path: 'https://assets.getpocket.com/web-discover/_next/static/images/logo-harvardReview.360ae92253c542ffac123b7debd61870.png'
    },
    {
      name: 'Kiplinger',
      path: 'https://assets.getpocket.com/web-discover/_next/static/images/logo-kiplinger.bacab81b790801d10328fa384eecdd9e.png'
    },
    {
      name: 'Fast Company',
      path: 'https://assets.getpocket.com/web-discover/_next/static/images/logo-fastCompany.dc82b0f70987ae89c48b72e5afbe1e09.png'
    },
    {
      name: 'Inc.',
      path: 'https://assets.getpocket.com/web-discover/_next/static/images/logo-inc.7e05124dad0248f3dfed4d7993bb6f93.png'
    },
    {
      name: 'Quartz',
      path: 'https://assets.getpocket.com/web-discover/_next/static/images/logo-quartz.b647cb6b1cce5cfa2e766e524a2157cb.png'
    },
    {
      name: 'The Guardian',
      path: 'https://assets.getpocket.com/web-discover/_next/static/images/logo-guardian.74f039115fe9a5f6a326ee1f8c8c91cd.png'
    }
  ]

  return (
    <div className={publisherGrid}>
      {publishers.map((publisher) => (
        <img src={publisher.path} alt={publisher.name} key={`publisher-logo-${publisher.name}`} />
      ))}
    </div>
  )
}

export default PublisherGrid
