import { useEffect } from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { css } from 'linaria'
import { breakpointSmallDesktop } from 'common/constants'
import { breakpointLargeTablet } from 'common/constants'
import { breakpointSmallTablet } from 'common/constants'
import { breakpointLargeHandset } from 'common/constants'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

const bannerStyles = css`
  position: sticky;
  top: 65px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-amberLight);
  z-index: 1;

  aside {
    width: 322px;
    height: 80px;
    background-image: url("data:image/svg+xml,%3Csvg width='322' height='80' viewBox='0 0 322 80' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='160.996' y='-0.365112' width='80.4981' height='80.4981' fill='%2300256D'/%3E%3Crect y='-0.365112' width='160.996' height='80.4981' fill='%23F2DEFF'/%3E%3Crect x='241.494' y='-0.365112' width='80.4981' height='154.288' fill='%23FF8A00'/%3E%3Crect x='253.032' y='-0.365112' width='11.5381' height='181.121' fill='%239F2600'/%3E%3Crect x='276.108' y='-0.365112' width='11.5381' height='181.121' fill='%239F2600'/%3E%3Crect x='299.185' y='-0.365112' width='11.5381' height='181.121' fill='%239F2600'/%3E%3Cpath d='M160.996 -6C179.668 -6 194.805 9.07748 194.805 27.675C194.805 46.2726 179.668 61.3501 160.996 61.3501L160.996 -6Z' fill='%23FFD25E'/%3E%3Cpath d='M67.0818 39.8839L30.8577 39.8839L30.8577 -0.36511L30.9028 -0.36511L67.0818 39.8839Z' fill='%239F2600'/%3E%3Cpath d='M103.306 39.8839L67.0818 39.8839L67.0818 -0.36511L67.1269 -0.36511L103.306 39.8839Z' fill='%239F2600'/%3E%3Cpath d='M103.306 80.1328L67.0818 80.1328L67.0818 39.8838L67.1269 39.8838L103.306 80.1328Z' fill='%239F2600'/%3E%3Cpath d='M139.53 80.1328L103.306 80.1328L103.306 39.8838L103.351 39.8838L139.53 80.1328Z' fill='%239F2600'/%3E%3Crect y='-0.365112' width='30.8576' height='80.4981' fill='%23FFD25E'/%3E%3C/svg%3E%0A");
    background-repeat: repeat-y;
  }

  h3 {
    margin-bottom: 0;
    color: #00256C;
    font-size: 24px;
    font-weight: 500;
    line-height: 1.15;
    span {
      font-weight: 400;
    }
  }

  a {
    margin-right: 140px;
    padding: 8px;
    width: 100%;
    max-width: 230px;
    background-color: var(--color-lapisDarker);
    color: #FFF;
    font-size: 16px;
    border-radius: 4px;
    text-decoration: none;
    text-align: center;

    &:hover {
      background-color: var(--color-lapisDark);
    }
  }

  ${breakpointSmallDesktop} {
    aside {
      width: 161px;
      background-image: url("data:image/svg+xml,%3Csvg width='161' height='80' viewBox='0 0 161 80' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='-0.00390625' y='-0.36499' width='80.4981' height='80.4981' fill='%2300256D'/%3E%3Crect x='80.4944' y='-0.36499' width='80.4981' height='154.288' fill='%23FF8A00'/%3E%3Crect x='92.0322' y='-0.36499' width='11.5381' height='181.121' fill='%239F2600'/%3E%3Crect x='115.108' y='-0.36499' width='11.5381' height='181.121' fill='%239F2600'/%3E%3Crect x='138.185' y='-0.36499' width='11.5381' height='181.121' fill='%239F2600'/%3E%3Cpath d='M-0.00377655 -6C18.6679 -6 33.8054 9.07748 33.8054 27.675C33.8054 46.2726 18.6679 61.3501 -0.00377655 61.3501L-0.00377655 -6Z' fill='%23FFD25E'/%3E%3C/svg%3E ");
    }

    a {
      margin-right: 50px;
      max-width: 200px;
    }
  }

  ${breakpointLargeTablet} {
    aside {
      width: 112px;
      background-image: url("data:image/svg+xml,%3Csvg width='112' height='80' viewBox='0 0 112 80' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='-49.0039' y='-0.36499' width='80.4981' height='80.4981' fill='%2300256D'/%3E%3Crect x='31.4944' y='-0.36499' width='80.4981' height='154.288' fill='%23FF8A00'/%3E%3Crect x='43.0322' y='-0.36499' width='11.5381' height='181.121' fill='%239F2600'/%3E%3Crect x='66.1084' y='-0.36499' width='11.5381' height='181.121' fill='%239F2600'/%3E%3Crect x='89.1846' y='-0.36499' width='11.5381' height='181.121' fill='%239F2600'/%3E%3C/svg%3E%0A");
    }
    a {
      max-width: 170px;
    }
  }

  ${breakpointSmallTablet} {
    h3 {
      font-size: 18px;
    }

    a {
      margin-right: 24px;
      max-width: 130px;
      font-size: 14px;
    }
  }

  ${breakpointLargeHandset} {
    flex-direction: column;
    padding: 16px 0;
    height: auto;

    &:before,
    &:after {
      content: '';
      position: absolute;
      top: 0;
      width: 13px;
      height: 100%;
      background-size: cover;
    }

    &:before {
      left: 0;
      background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iMTA3IiB2aWV3Qm94PSIwIDAgMTMgMTA3IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfNDM0XzIwMDgpIj4KPHJlY3Qgd2lkdGg9IjEzIiBoZWlnaHQ9IjgzIiBmaWxsPSIjRjJERUZGIi8+CjxyZWN0IHk9IjgiIHdpZHRoPSIxMyIgaGVpZ2h0PSI4IiBmaWxsPSIjQTAyNjAxIi8+CjxyZWN0IHk9IjIzIiB3aWR0aD0iMTMiIGhlaWdodD0iOCIgZmlsbD0iI0EwMjYwMSIvPgo8cmVjdCB5PSIzOCIgd2lkdGg9IjEzIiBoZWlnaHQ9IjgiIGZpbGw9IiNBMDI2MDEiLz4KPHJlY3QgeT0iNTQiIHdpZHRoPSIxMyIgaGVpZ2h0PSI2MyIgZmlsbD0iI0ZGOEEwMCIvPgo8cGF0aCBkPSJNMTMgOTFDNC4xNjM3NSA5MSAtMyAxMDAuNjI2IC0zIDExMi41Qy0zIDEyNC4zNzQgNC4xNjM3NSAxMzQgMTMgMTM0TDEzIDkxWiIgZmlsbD0iI0EwMjYwMSIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzQzNF8yMDA4Ij4KPHJlY3Qgd2lkdGg9IjEzIiBoZWlnaHQ9IjEwNyIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K")
    }

    &:after {
      right: 0;
      background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iMTA3IiB2aWV3Qm94PSIwIDAgMTMgMTA3IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfNDM0XzIwMTApIj4KPHJlY3QgeT0iNDIiIHdpZHRoPSIxMyIgaGVpZ2h0PSI2MyIgZmlsbD0iIzAwMjU2QyIvPgo8cGF0aCBkPSJNMTkgNTFDMTAuMTYzOCA1MSAzIDYwLjYyNjMgMyA3Mi41QzMgODQuMzczNyAxMC4xNjM4IDk0IDE5IDk0TDE5IDUxWiIgZmlsbD0iI0ZGRDI1RSIvPgo8cmVjdCB5PSItMjEiIHdpZHRoPSIxMyIgaGVpZ2h0PSI2MyIgZmlsbD0iI0ZGOEEwMCIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzQzNF8yMDEwIj4KPHJlY3Qgd2lkdGg9IjEzIiBoZWlnaHQ9IjEwNyIgZmlsbD0iI0ZGRkZGRiIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=")
    }

    aside {
      display: none;
    }

    h3 {
      margin-bottom: 16px;
      font-size: 14px;
      text-align: center;
    }

    a {
      margin-right: 0;
      max-width: 130px;
      font-size: 11px;
    }
  }
`

export const GermanCollection = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(sendSnowplowEvent('german.collection.impression'))
  }, [dispatch])

  const handleClick = () => dispatch(sendSnowplowEvent('german.collection.click'))

  return (
    <div className={bannerStyles}>
      <aside />
      <h3>
        Nur wer sichtbar ist, findet auch statt<br />
        <span>– die Collection von Tijen Onaran</span>
      </h3>
      <Link href="/collections/nur-wer-sichtbar-ist-findet-auch-statt">
        <a onClick={handleClick}>
          Jetzt lesen
        </a>
      </Link>
    </div>
  )
}
