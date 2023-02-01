import { useEffect } from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { css } from 'linaria'
import { breakpointLargeTablet } from 'common/constants'
import { breakpointSmallTablet } from 'common/constants'
import { breakpointTinyTablet } from 'common/constants'
import { breakpointMediumHandset } from 'common/constants'
import { breakpointSmallHandset } from 'common/constants'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

import bannerCard from 'static/images/banner/german-home/cards.png'

const bannerBackground = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(90deg, var(--color-lapisDarker) 50%, var(--color-lapisLightest) 50%);
  z-index: 1;
`

const bannerStyles = css`
  position: relative;
  height: 80px;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  background-color: var(--color-lapisLightest);

  .media {
    background-repeat: no-repeat;
    background-color: var(--color-lapisDarker);
    background-position: right 100px top 0;
    display: flex;
    align-items: center;
    height: 100%;
    padding-left: 235px;
    .media-copy {
      color: white;
      display: inline-block;
      margin: 0 1rem;
      max-width: 80px;
      font-weight: 500;
    }
  }

  h3 {
    margin-bottom: 0;
    padding: 0 2rem;
    color: #00266c;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.1;
  }

  .call-to-action {
    padding: 0 1rem;
    a {
      display: block;
      padding: 8px 24px;
      background-color: #0060df;
      color: #fff;
      font-size: 16px;
      font-weight: 500;
      border-radius: 4px;
      text-decoration: none;
      text-align: center;
      white-space: nowrap;
      &:hover {
        background-color: var(--color-lapisDark);
      }
    }
  }

  ${breakpointLargeTablet} {
    .media {
      padding-left: 170px;
    }
  }

  ${breakpointSmallTablet} {
    .media {
      padding-left: 0;
      background-image: none;
    }
    h3 {
      padding: 0 1rem;
    }
    .call-to-action a {
      padding: 6px 18px;
      font-size: 12px;
    }
  }
  ${breakpointTinyTablet} {
    h3 {
      font-size: 16px;
    }
  }

  ${breakpointMediumHandset} {
    height: 100px;
    display: grid;
    grid-template-columns: 104px auto;

    .media {
      grid-row: span 2;
    }

    h3 {
      font-size: 14px;
      text-align: center;
    }

    .call-to-action {
      justify-content: center;
      display: flex;
      margin-bottom: 6px;
      a {
        display: inline-block;
      }
    }
  }

  ${breakpointSmallHandset} {
    height: 120px;
  }
`

export const GermanHomeBanner = () => {
  const dispatch = useDispatch()
  const bannerLink =
    'https://getpocket.com/de/collections/eine-partnerschaft-fuer-mehr-sichtbarkeit-bipoc-im-spotlight'

  useEffect(() => {
    dispatch(sendSnowplowEvent('bestof2022.collection.impression'))
  }, [dispatch])

  const handleClick = () => dispatch(sendSnowplowEvent('bestof2022.collection.click'))

  return (
    <div className={bannerBackground}>
      <div className={bannerStyles}>
        <div className="media" style={{ backgroundImage: `url("${bannerCard}")` }}>
          <div className="media-copy">BIPoC im Spotlight</div>
        </div>
        <h3>Entdecke Content, der die Autor*innen von „People of Deutschland“ inspiriert.</h3>
        <div className="call-to-action">
          <Link href={bannerLink}>
            <a onClick={handleClick}>Entdecke Pocket Collections</a>
          </Link>
        </div>
      </div>
    </div>
  )
}
