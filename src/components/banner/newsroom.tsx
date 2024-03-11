import { useEffect } from 'react'
import Link from 'next/link'
import { css } from '@emotion/css'

import { breakpointSmallDesktop } from 'common/constants'
import { breakpointSmallTablet } from 'common/constants'
import { breakpointTinyTablet } from 'common/constants'
import { breakpointLargeHandset } from 'common/constants'
import { AddIcon } from '@ui/icons/AddIcon'

const bannerBackground = css`
  --color-banner-primary: #db6900;
  --color-banner-secondary: #fff0e3;
  --color-banner-action: #db6900;
  --color-banner-action-hover: #c15e01;

  width: 100%;
  background: linear-gradient(
    90deg,
    var(--color-banner-primary) 50%,
    var(--color-banner-secondary) 50%
  );
  z-index: 1;
  .inner {
    position: relative;
    height: 80px;
    max-width: 1440px;
    margin: 0 auto;
    display: grid;
    align-items: center;
    background-color: var(--color-banner-secondary);
    grid-template-columns: auto minmax(0, 1fr) auto;
    .media {
      background-color: var(--color-banner-primary);
      display: flex;
      align-items: center;
      height: 100%;
      color: white;
      font-weight: 500;
      padding: 0 40px;
    }
    .ajp-banner-logo {
      height: 48px;
    }
    .pocket-banner-logo {
      height: 37px;
    }
    .plus {
      margin: 0 1rem;
    }
    h3 {
      margin-bottom: 0;
      padding: 0 2rem;
      color: var(--color-banner-primary);
      font-size: 1.875rem;
      font-weight: 500;
      line-height: 1.1;
      letter-spacing: -0.01em;
    }
    .call-to-action {
      padding: 0 1.25rem;
      a {
        display: block;
        padding: 8px 24px;
        background-color: var(--color-banner-action);
        color: #fff;
        font-size: 16px;
        font-weight: 500;
        border-radius: 4px;
        text-decoration: none;
        text-align: center;
        white-space: nowrap;
        &:hover {
          background-color: var(--color-banner-action-hover);
        }
      }
    }
    ${breakpointSmallDesktop} {
      .media {
        padding: 0 1.5625rem;
      }
      h3 {
        padding: 0 1rem;
        font-size: 1.5rem;
      }
    }
    ${breakpointSmallTablet} {
      .ajp-banner-logo {
        height: 50px;
      }
      .pocket-banner-logo {
        height: 30px;
      }
      .plus {
        margin: 0 0.25rem;
      }
      .call-to-action {
        padding: 0 1rem;
        a {
          display: inline-block;
          font-size: 0.875rem;
        }
      }
    }

    ${breakpointTinyTablet} {
      height: 108px;
      display: grid;
      grid-template-columns: 220px auto;
      .media {
        grid-row: span 2;
      }
      h3 {
        font-size: 1.125rem;
        max-width: 80%;
      }
    }

    ${breakpointLargeHandset} {
      height: 108px;
      display: grid;
      grid-template-columns: 118px auto;
      .media {
        flex-direction: column;
        justify-content: center;
      }
      .ajp-banner-logo {
        height: 44px;
      }
      .pocket-banner-logo {
        height: 21px;
      }
      .plus {
        height: 10px;
        margin: 0.25rem;
      }

      .call-to-action {
        padding: 0 1rem;
        a {
          display: inline-block;
          font-size: 0.875rem;
        }
      }
    }
  }
`

export const BannerNewsroom = ({ sendImpression = () => {}, handleClick = () => {} }) => {
  const bannerLink = '/collections/the-american-journalism-project' //prettier-ignore

  // Send initial impression
  useEffect(() => {
    sendImpression()
  }, [sendImpression])

  return (
    <div className={bannerBackground}>
      <div className="inner">
        <div className="media">
          <PocketLogo /> <AddIcon className="plus" /> <AJPLogo />
        </div>
        <h3>Local&nbsp;stories, national&nbsp;interest</h3>
        <div className="call-to-action">
          <Link href={bannerLink} onClick={handleClick}>
            Explore great articles
          </Link>
        </div>
      </div>
    </div>
  )
}

const AJPLogo = () => {
  return (
    <svg
      className="ajp-banner-logo"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 62 49">
      <path fill="#0C1BCD" d="M43.938 31.005H41.91v17.041h2.027v-17.04z"></path>
      <path
        fill="#fff"
        d="M5.62 12.49h1.952L5.15.598H3.197L.839 12.49h1.953l.285-1.704h2.239l.304 1.704zM4.063 5.029l.12-1.778.128 1.778.71 4.025H3.38l.682-4.025zM10.29 5.812c0-.866.203-1.391.848-1.391.617 0 .783.451.783 1.206v6.863h1.943V5.655c0-.728.203-1.243.83-1.243.616 0 .791.414.791 1.243v6.835h1.953V5.397c0-1.824-.645-2.69-2.026-2.69-.894 0-1.456.48-1.741 1.309-.23-.848-.783-1.308-1.778-1.308-.912 0-1.51.515-1.787 1.39l-.184-1.243H8.347v9.635h1.943V5.812zM24.3 9.709v-.645h-1.925v.663c0 .783-.203 1.225-.912 1.225-.746 0-1.032-.377-1.032-1.345v-1.39H24.3V5.71c0-1.787-.829-2.984-2.855-2.984-1.788 0-2.902 1.096-2.902 3.048v3.85c0 2.009.912 3.031 2.902 3.031 2.293-.018 2.855-1.262 2.855-2.947zm-3.86-3.934c0-.948.314-1.39 1.041-1.39.71 0 .95.433.95 1.326v1.124h-1.99v-1.06zM27.34 12.49V6.624c0-1.206.231-1.62 1.364-1.62h.516v-2.23h-.267c-1.244 0-1.695.396-1.787 1.695l-.314-1.612h-1.427v9.635h1.916zM30.148 12.49h1.99V2.874c-.12.101-.645.147-.977.147-.368 0-.893-.046-1.013-.147v9.616zm1.004-10.15c.792 0 1.142-.267 1.142-1.18 0-.911-.313-1.16-1.142-1.16s-1.124.249-1.124 1.16c0 .93.267 1.18 1.124 1.18zM36.165 12.656c1.888 0 2.864-.949 2.864-2.938v-1.53h-1.97v1.456c0 .875-.231 1.262-.876 1.262-.663 0-.912-.396-.912-1.308V5.785c0-.995.267-1.373.93-1.373.664 0 .867.35.867 1.308v1.198h1.97V5.674c0-1.953-.93-2.947-2.781-2.947-1.852 0-2.92.994-2.92 3.03v3.896c0 2.027.893 3.003 2.828 3.003zM44.16 12.49h1.529V5.342c0-1.74-.866-2.607-2.773-2.607-1.87 0-2.782.977-2.782 2.506v1.28h1.889V5.314c0-.663.294-1.013.911-1.013.6 0 .866.295.866.958v.498c0 .663-.285.847-1.28 1.197-.93.332-1.446.498-1.888.894-.452.396-.7.948-.7 1.759v.764c0 1.493.598 2.276 2.026 2.276.949 0 1.621-.46 1.953-1.327l.249 1.17zm-1.41-1.41c-.516 0-.81-.313-.81-.874v-.682c0-.516.083-.792.267-1.013.166-.212.433-.369.893-.534.369-.148.58-.25.7-.415v2.073c0 .884-.368 1.446-1.05 1.446zM48.893 5.859c0-.912.286-1.391.949-1.391.645 0 .829.433.829 1.243v6.78h1.953V5.462c0-1.823-.663-2.717-2.073-2.717-.949 0-1.556.498-1.824 1.41l-.211-1.29H46.94v9.626h1.953V5.859zM3.943 28.868c1.888 0 2.837-.912 2.837-3.068v-8.99H4.735v8.935c0 .958-.184 1.28-.792 1.28-.6 0-.793-.377-.793-1.059v-2.027H1.124v2.036c0 2.063.958 2.893 2.819 2.893zM10.795 27.127c-.645 0-.949-.414-.949-1.308v-3.832c0-.948.295-1.363.95-1.363.662 0 .93.433.93 1.363v3.832c0 .894-.304 1.308-.93 1.308zm0 1.741c1.842 0 2.883-.958 2.883-3.003V21.97c0-2.027-1.059-3.03-2.883-3.03-1.787 0-2.883.994-2.883 3.03v3.896c0 2.054.94 3.003 2.883 3.003zM18.81 28.703h1.575v-9.635H18.44v6.613c0 .912-.248 1.428-.875 1.428-.617 0-.792-.451-.792-1.243v-6.798h-1.971v7.065c0 1.842.644 2.717 2.072 2.717.93 0 1.492-.516 1.723-1.428l.212 1.28zM23.6 28.702v-5.867c0-1.207.23-1.621 1.364-1.621h.516v-2.22h-.268c-1.243 0-1.694.396-1.787 1.695l-.313-1.612h-1.427v9.625H23.6zM28.317 22.07c0-.912.286-1.39.949-1.39.645 0 .829.433.829 1.243v6.78h1.953v-7.029c0-1.823-.664-2.717-2.073-2.717-.949 0-1.557.497-1.824 1.41l-.212-1.29h-1.575v9.625h1.953V22.07zM37.279 28.702h1.529v-7.148c0-1.74-.866-2.607-2.773-2.607-1.87 0-2.782.977-2.782 2.506v1.28h1.889v-1.207c0-.663.294-1.013.912-1.013.598 0 .865.295.865.958v.497c0 .664-.285.848-1.28 1.198-.93.332-1.446.497-1.888.893-.451.397-.7.95-.7 1.76v.764c0 1.493.599 2.276 2.026 2.276.949 0 1.621-.461 1.953-1.327l.249 1.17zm-1.41-1.41c-.515 0-.81-.313-.81-.874v-.682c0-.516.083-.792.267-1.013.166-.212.433-.369.893-.534.369-.148.58-.25.7-.415v2.072c0 .885-.368 1.447-1.05 1.447zM41.993 16.286H40.05v12.417h1.943V16.286zM43.312 28.703h1.99v-9.617c-.12.102-.645.148-.977.148-.368 0-.893-.046-1.013-.148v9.617zm1.004-10.15c.792 0 1.142-.268 1.142-1.18 0-.912-.313-1.16-1.142-1.16s-1.124.248-1.124 1.16c0 .93.267 1.18 1.124 1.18zM49.134 28.868c1.87 0 2.82-1.014 2.82-2.607v-.617c0-1.64-1.162-2.202-2.175-2.616-.792-.332-1.51-.599-1.51-1.244v-.414c0-.535.248-.866.847-.866.617 0 .847.313.847.912v.875h1.861v-.977c0-1.455-.847-2.385-2.717-2.385-1.824 0-2.7 1.013-2.7 2.45v.516c0 1.593 1.079 2.11 2.055 2.505.829.332 1.575.58 1.575 1.373v.46c0 .599-.267.949-.866.949-.681 0-.912-.295-.912-.949V25.12h-1.97v1.225c-.01 1.676.819 2.524 2.845 2.524zM54.853 22.024c0-.866.202-1.391.847-1.391.617 0 .783.451.783 1.206v6.863h1.944v-6.835c0-.728.202-1.244.829-1.244.617 0 .792.415.792 1.244v6.835H62v-7.093c0-1.824-.645-2.69-2.027-2.69-.893 0-1.455.48-1.74 1.308-.231-.847-.784-1.308-1.779-1.308-.911 0-1.51.516-1.786 1.391l-.185-1.243H52.91v9.635h1.944v-6.678zM4.311 41.137c2.091 0 2.966-1.078 2.966-2.855v-2.533c0-1.87-.893-2.718-3.002-2.718H1.437v11.883h1.944v-3.777h.93zm-.12-6.438c.784 0 1.115.294 1.115 1.114v2.423c0 .792-.35 1.179-1.114 1.179h-.81v-4.707h.81v-.01zM10.335 44.914v-5.868c0-1.206.23-1.621 1.363-1.621h.516v-2.22h-.267c-1.244 0-1.695.396-1.787 1.695l-.313-1.612H8.419v9.626h1.916zM15.714 43.339c-.645 0-.949-.415-.949-1.308v-3.832c0-.949.295-1.363.95-1.363.662 0 .93.433.93 1.363v3.832c0 .893-.295 1.308-.93 1.308zm0 1.74c1.842 0 2.883-.957 2.883-3.002V38.18c0-2.026-1.059-3.03-2.883-3.03-1.787 0-2.883.995-2.883 3.03v3.897c0 2.054.949 3.003 2.883 3.003zM18.552 48.018h.893c1.787 0 2.34-.562 2.34-2.367V35.297c-.12.102-.627.166-.977.166s-.875-.046-.994-.166v10.05c0 .663-.12.81-.7.81h-.562v1.861zm2.256-13.255c.793 0 1.143-.267 1.143-1.179s-.314-1.16-1.143-1.16c-.828 0-1.123.248-1.123 1.16 0 .93.276 1.179 1.123 1.179zM28.693 42.132v-.645h-1.925v.663c0 .783-.203 1.226-.912 1.226-.746 0-1.032-.378-1.032-1.345V40.64h3.86v-2.506c0-1.787-.83-2.984-2.856-2.984-1.787 0-2.901 1.096-2.901 3.049v3.85c0 2.008.912 3.03 2.901 3.03 2.294-.018 2.865-1.261 2.865-2.947zm-3.869-3.933c0-.949.313-1.391 1.041-1.391.71 0 .949.433.949 1.326v1.124h-1.99v-1.06zM32.571 45.08c1.889 0 2.865-.95 2.865-2.939v-1.529h-1.971v1.456c0 .875-.23 1.262-.875 1.262-.663 0-.912-.397-.912-1.308v-3.814c0-.995.267-1.372.93-1.372.664 0 .866.35.866 1.308v1.197h1.971v-1.244c0-1.952-.93-2.947-2.782-2.947-1.85 0-2.929.995-2.929 3.03v3.897c0 2.026.903 3.003 2.837 3.003zM40.226 43.044h-.378c-.764 0-.976-.12-.976-1.207v-4.68h1.363v-1.87h-1.363v-1.722h-1.4c-.046.452-.083.71-.203 1.014-.12.313-.267.534-.516.663-.212.129-.433.166-.71.184v1.741h.977v5.103c0 2.11.544 2.653 2.368 2.653h.829v-1.88h.009z"></path>
    </svg>
  )
}

const PocketLogo = () => {
  return (
    <svg
      className="pocket-banner-logo"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 143 38">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M39.923 26.357c-3.927 0-7.206-3.354-7.206-7.44 0-4.125 3.28-7.556 7.206-7.556 4.003 0 7.206 3.431 7.206 7.556 0 4.086-3.203 7.44-7.206 7.44zm.135-17.18c-3.008 0-5.67 1.687-7.56 3.949l-.077-2.683c-.038-.959-.501-1.419-1.195-1.419-.733 0-1.235.575-1.235 1.38v26.14c0 .766.54 1.303 1.273 1.303.771 0 1.234-.575 1.234-1.342V25.084c1.89 2.223 4.552 3.756 7.56 3.756a9.739 9.739 0 009.797-9.774c0-5.404-4.32-9.888-9.797-9.888zM102.026 18.007l7.193-6.473c.657-.58.734-1.429.232-1.97-.541-.578-1.352-.424-1.932.117l-9.776 9.163V1.728c0-.888-.386-1.467-1.198-1.467-.889 0-1.314.579-1.314 1.467V27.4c0 .849.503 1.428 1.314 1.428.734 0 1.198-.579 1.198-1.428v-5.54l2.504-2.254 7.89 8.759c.503.54 1.353.733 1.894.232.618-.58.425-1.352-.039-1.892l-7.966-8.7zM61.832 26.357c-3.98 0-7.303-3.354-7.303-7.44 0-4.125 3.323-7.556 7.303-7.556 4.057 0 7.303 3.431 7.303 7.556 0 4.086-3.246 7.44-7.303 7.44zm.059-17.333c-5.692 0-10.088 4.53-10.088 9.99s4.396 9.875 10.088 9.875c5.339 0 9.97-4.415 9.97-9.874 0-5.46-4.67-9.99-9.97-9.99zM141.481 25.157c-.384 0-.767.231-.997.424-.537.461-1.189.923-2.109.923-1.572 0-2.454-.962-2.454-3.154V11.502l4.869.077c.691 0 1.151-.423 1.151-1.077 0-.692-.46-1.115-1.151-1.115l-4.869.038V5.464c0-.77-.537-1.308-1.188-1.308-.69 0-1.266.538-1.266 1.308v3.961l-2.07-.038c-.652 0-1.112.423-1.112 1.115 0 .616.499 1.116 1.112 1.077l2.07-.077v11.925c0 3.73 2.263 5.462 4.87 5.462 1.61 0 2.837-.616 3.68-1.5.269-.308.537-.654.537-1.116 0-.654-.422-1.116-1.073-1.116zM113.732 17.788c.562-4.216 3.524-6.427 6.858-6.427 3.554 0 6.037 3.133 6.19 6.427h-13.048zm6.893-8.764c-5.508 0-9.619 4.53-9.619 9.99s4.189 9.875 9.658 9.875c2.715 0 5.352-1.007 7.097-2.711.388-.387.699-.813.699-1.24 0-.619-.388-1.122-1.125-1.122-.388 0-.776.155-1.086.426-1.629 1.433-3.297 2.246-5.585 2.246-3.561 0-6.739-2.706-7.069-6.738h13.856c1.319 0 2.056-.697 2.056-1.82 0-4.336-3.801-8.906-8.882-8.906zM90.76 22.795c-.349 0-.736.27-.968.578-1.083 1.427-3.405 3.124-5.998 3.124-3.87 0-7.197-3.046-7.197-7.443 0-4.705 3.328-7.52 7.197-7.52 2.825 0 4.373 1.35 5.689 2.93.232.27.58.54 1.006.54.58 0 1.16-.424 1.16-1.002 0-.425-.27-.849-.502-1.196-1.587-2.275-4.257-3.587-7.353-3.587-5.379 0-9.79 4.397-9.79 9.835 0 5.36 4.411 9.835 9.79 9.835 3.328 0 6.192-1.929 7.7-3.934.272-.347.427-.694.427-1.003 0-.694-.504-1.157-1.161-1.157zM17.314 17.47l-5.286 4.956c-.272.31-.7.425-1.01.425-.389 0-.777-.116-1.088-.425L4.722 17.47c-.544-.581-.622-1.549 0-2.168.583-.542 1.555-.62 2.138 0l4.158 3.987 4.236-3.987c.544-.62 1.516-.542 2.06 0 .544.62.544 1.587 0 2.168zm2.47-8.25H2.104C.958 9.22 0 10.11 0 11.27v6.621C0 23.894 4.898 28.89 10.944 28.89c6.008 0 10.868-4.995 10.868-10.997v-6.62a2.029 2.029 0 00-2.029-2.053z"
        clipRule="evenodd"></path>
    </svg>
  )
}
