import { useEffect } from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { css, cx } from 'linaria'
import { breakpointSmallDesktop } from 'common/constants'
import { breakpointSmallTablet } from 'common/constants'
import { breakpointTinyTablet } from 'common/constants'
import { breakpointSmallHandset } from 'common/constants'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

const spacerStyles = css`
  height: 80px;

  ${breakpointTinyTablet} {
    height: 107px;
  }
`

const bannerBackground = css`
  background-color: black;
  position: fixed;
  top: 0;
  width: 100%;  
  background-color: var(--color-lapisLightest);
  z-index: 1;
`

const bannerStyles = css`
  position: relative;
  height: 80px;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-lapisLightest);
  padding-left: 309px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 275px;
    height: 80px;
    background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjc2IiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMjc2IDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB4PSIxMzcuNTM3IiB3aWR0aD0iNjguNzY3OCIgaGVpZ2h0PSI4MCIgZmlsbD0iI0ZGRDI1RSIvPgo8cmVjdCB4PSIyMDYuMzA0IiB5PSI1Ny4zMDYyIiB3aWR0aD0iMjIuNjkzNCIgaGVpZ2h0PSI2OC43Njc4IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCAyMDYuMzA0IDU3LjMwNjIpIiBmaWxsPSIjMDBCMjY5Ii8+CjxwYXRoIGQ9Ik0xMzcuNTM3IDU3LjMwNjdMMTcwLjE0MSAzNC44NDI1TDIwNi4zMDUgMzQuODUxMUwxNzQuMTQyIDU3LjMwNjdIMTM3LjUzN1oiIGZpbGw9IiMwMDI1NkQiLz4KPHBhdGggZD0iTTIwNi4zMDQgMzQuODUxNEMyMDYuMzA1IDM0Ljc4NTcgMjA2LjMwNSAzNC41Mzk3IDIwNi4zMDUgMzQuNDc0QzIwNi4zMDUgMTUuNDM0NSAxOTAuODg1IDAgMTcxLjg2MyAwQzE1Mi44NDIgMCAxMzcuNTM3IDE1LjQzNDUgMTM3LjUzNyAzNC40NzRDMTM3LjUzNyAzNC41Mzk3IDEzNy41MzYgMzQuNzc2OCAxMzcuNTM3IDM0Ljg0MjRMMjA2LjMwNCAzNC44NTE0WiIgZmlsbD0iIzRBQkVGRiIvPgo8cmVjdCB4PSIyMDYuMzAzIiB3aWR0aD0iNjguNzY3OCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzFDQjBBOCIvPgo8cmVjdCB4PSIyNzUuMDcxIiB5PSI1Ny4zMDYyIiB3aWR0aD0iMjIuNjkzNCIgaGVpZ2h0PSI2OC43Njc4IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCAyNzUuMDcxIDU3LjMwNjIpIiBmaWxsPSIjREFCNUZGIi8+CjxwYXRoIGQ9Ik0yMDYuMzAzIDU3LjMwNjdMMjM4LjkwOCAzNC44NDI1TDI3NS4wNzEgMzQuODUxMUwyNDIuOTA5IDU3LjMwNjdIMjA2LjMwM1oiIGZpbGw9IiMwMDI1NkQiLz4KPHBhdGggZD0iTTI3NS4wNzEgMzQuODUxNEMyNzUuMDcxIDM0Ljc4NTcgMjc1LjA3MSAzNC41Mzk3IDI3NS4wNzEgMzQuNDc0QzI3NS4wNzEgMTUuNDM0NSAyNTkuNjUxIDAgMjQwLjYzIDBDMjIxLjYwOSAwIDIwNi4zMDMgMTUuNDM0NSAyMDYuMzAzIDM0LjQ3NEMyMDYuMzAzIDM0LjUzOTcgMjA2LjMwMyAzNC43NzY4IDIwNi4zMDMgMzQuODQyNEwyNzUuMDcxIDM0Ljg1MTRaIiBmaWxsPSIjOUFFMkRFIi8+CjxyZWN0IHg9IjAuMDAwOTc2NTYyIiB3aWR0aD0iNjguNzY3OCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzlBRTJERSIvPgo8cmVjdCB4PSI2OC43Njc2IiB5PSI1Ny4zMDYyIiB3aWR0aD0iMjIuNjkzNCIgaGVpZ2h0PSI2OC43Njc4IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2OC43Njc2IDU3LjMwNjIpIiBmaWxsPSIjODU0NkQwIi8+CjxwYXRoIGQ9Ik0wIDU3LjMwNjdMMzIuNjA0NSAzNC44NDI1TDY4Ljc2NzkgMzQuODUxMUwzNi42MDU4IDU3LjMwNjdIMFoiIGZpbGw9IiMwMDI1NkQiLz4KPHBhdGggZD0iTTY4Ljc2NzcgMzQuODUxNEM2OC43NjgxIDM0Ljc4NTcgNjguNzY4MSAzNC41Mzk3IDY4Ljc2ODEgMzQuNDc0QzY4Ljc2ODEgMTUuNDM0NSA1My4zNDgyIDAgMzQuMzI2OCAwQzE1LjMwNTQgMCAwLjAwMDE2MzAyMyAxNS40MzQ1IDAuMDAwMTYzMDIzIDM0LjQ3NEMwLjAwMDE2MzAyMyAzNC41Mzk3IC0wLjAwMDE5ODYzMiAzNC43NzY4IDAuMDAwMTY4MTcxIDM0Ljg0MjRMNjguNzY3NyAzNC44NTE0WiIgZmlsbD0iIzFDQjBBOCIvPgo8cGF0aCBkPSJNNjguNzY3NiAwSDEzNy41MzVWODBINjguNzY3NlYwWiIgZmlsbD0iI0RBQjVGRiIvPgo8cGF0aCBkPSJNNjguNzY3NiAzNC42OTgzQzY4Ljc2NzYgMTUuNTkwMyA4NC4xMzYxIDAgMTAzLjA5NCAwQzEyMi4wNTIgMCAxMzcuNTM1IDE1LjU5MDMgMTM3LjUzNSAzNC42OTgzVjQ0LjkyODRINjguNzY3NlYzNC42OTgzWiIgZmlsbD0iI0Y2N0Q2RCIvPgo8cGF0aCBkPSJNMTM3LjUzNSA0NS4yOTU0QzEzNy41MzUgNjQuMzkwNyAxMjIuMDUyIDgwLjAwMDEgMTAzLjA5NCA4MC4wMDAxQzg0LjEzNjEgODAuMDAwMSA2OC43Njc2IDY0LjM5MDcgNjguNzY3NiA0NS4yOTU0TDY4Ljc2NzYgMzQuODQyNUgxMzcuNTM1VjQ1LjI5NTRaIiBmaWxsPSIjMDA3MDY5Ii8+Cjwvc3ZnPgo=");
    background-size: cover;
  }  

  h3 {
    margin-bottom: 0;
    width: 100%;
    padding-right: 16px;
    color: #00266C;
    font-size: 30px;
    font-weight: 500;
    line-height: 1.1;
  }

  a {
    margin-right: 60px;
    padding: 8px 44px;
    width: 100%;
    max-width: 213px;
    background-color: #0060DF;
    color: #FFF;
    font-size: 16px;
    font-weight: 500;
    border-radius: 4px;
    text-decoration: none;
    text-align: center;
    &:hover {
      background-color: var(--color-lapisDark);
    }
  }  

  ${breakpointSmallDesktop} {
    padding-left: 299px;

    h3 {
      font-size: 24px;
    }

    a {
      margin-right: 30px;
    }
  }

  ${breakpointSmallTablet} {
    h3 {
      font-size: 18px;
    }

    a {
      padding: 6px 32px;
      max-width: 180px;
      font-size: 14px;
    }     
  }

  ${breakpointTinyTablet} {
    padding-left: 122px;
    height: 107px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    &:before {
      height: 107px;
      width: 92px;
      background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTIiIGhlaWdodD0iMTA3IiB2aWV3Qm94PSIwIDAgOTIgMTA3IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB5PSI1My40MzIxIiB3aWR0aD0iNDUuOTYzMyIgaGVpZ2h0PSI1My40NzA3IiBmaWxsPSIjRkZEMjVFIi8+CjxyZWN0IHg9IjQ1Ljk2MzQiIHk9IjkxLjczNDkiIHdpZHRoPSIxNS4xNjc5IiBoZWlnaHQ9IjQ1Ljk2MzMiIHRyYW5zZm9ybT0icm90YXRlKDkwIDQ1Ljk2MzQgOTEuNzM0OSkiIGZpbGw9IiMwMEIyNjkiLz4KPHBhdGggZD0iTTAgOTEuNzM0OUwyMS43OTIzIDc2LjcyMDJMNDUuOTYzNCA3Ni43MjU5TDI0LjQ2NjcgOTEuNzM0OUgwWiIgZmlsbD0iIzAwMjU2RCIvPgo8cGF0aCBkPSJNNDUuOTYzMiA3Ni43MjYyQzQ1Ljk2MzUgNzYuNjgyNCA0NS45NjM1IDc2LjUxNzkgNDUuOTYzNSA3Ni40NzRDNDUuOTYzNSA2My43NDgzIDM1LjY1NzEgNTMuNDMyMSAyMi45NDM1IDUzLjQzMjFDMTAuMjI5OSA1My40MzIxIDAuMDAwMTA4OTYyIDYzLjc0ODMgMC4wMDAxMDg5NjIgNzYuNDc0QzAuMDAwMTA4OTYyIDc2LjUxNzkgLTAuMDAwMTMyNzYyIDc2LjY3NjQgMC4wMDAxMTI0MDMgNzYuNzIwMkw0NS45NjMyIDc2LjcyNjJaIiBmaWxsPSIjNEFCRUZGIi8+CjxyZWN0IHg9IjQ1Ljk2MTkiIHk9IjUzLjQzMjEiIHdpZHRoPSI0NS45NjMzIiBoZWlnaHQ9IjUzLjQ3MDciIGZpbGw9IiMxQ0IwQTgiLz4KPHJlY3QgeD0iOTEuOTI1MyIgeT0iOTEuNzM0OSIgd2lkdGg9IjE1LjE2NzkiIGhlaWdodD0iNDUuOTYzMyIgdHJhbnNmb3JtPSJyb3RhdGUoOTAgOTEuOTI1MyA5MS43MzQ5KSIgZmlsbD0iI0RBQjVGRiIvPgo8cGF0aCBkPSJNNDUuOTYxOSA5MS43MzQ5TDY3Ljc1NDIgNzYuNzIwMkw5MS45MjUzIDc2LjcyNTlMNzAuNDI4NyA5MS43MzQ5SDQ1Ljk2MTlaIiBmaWxsPSIjMDAyNTZEIi8+CjxwYXRoIGQ9Ik05MS45MjUxIDc2LjcyNjJDOTEuOTI1NCA3Ni42ODI0IDkxLjkyNTQgNzYuNTE3OSA5MS45MjU0IDc2LjQ3NEM5MS45MjU0IDYzLjc0ODMgODEuNjE5IDUzLjQzMjEgNjguOTA1NCA1My40MzIxQzU2LjE5MTggNTMuNDMyMSA0NS45NjIgNjMuNzQ4MyA0NS45NjIgNzYuNDc0QzQ1Ljk2MiA3Ni41MTc5IDQ1Ljk2MTggNzYuNjc2NCA0NS45NjIgNzYuNzIwMkw5MS45MjUxIDc2LjcyNjJaIiBmaWxsPSIjOUFFMkRFIi8+CjxyZWN0IHg9IjAuMDAwNDg4MjgxIiB3aWR0aD0iNDUuOTYzMyIgaGVpZ2h0PSI1My40NzA3IiBmaWxsPSIjOUFFMkRFIi8+CjxyZWN0IHg9IjQ1Ljk2MzQiIHk9IjM4LjMwMjciIHdpZHRoPSIxNS4xNjc5IiBoZWlnaHQ9IjQ1Ljk2MzMiIHRyYW5zZm9ybT0icm90YXRlKDkwIDQ1Ljk2MzQgMzguMzAyNykiIGZpbGw9IiM4NTQ2RDAiLz4KPHBhdGggZD0iTTAgMzguMzAyOEwyMS43OTIzIDIzLjI4ODFMNDUuOTYzNCAyMy4yOTM4TDI0LjQ2NjcgMzguMzAyOEgwWiIgZmlsbD0iIzAwMjU2RCIvPgo8cGF0aCBkPSJNNDUuOTYzMiAyMy4yOTQxQzQ1Ljk2MzUgMjMuMjUwMiA0NS45NjM1IDIzLjA4NTggNDUuOTYzNSAyMy4wNDE4QzQ1Ljk2MzUgMTAuMzE2MiAzNS42NTcxIDAgMjIuOTQzNSAwQzEwLjIyOTkgMCAwLjAwMDEwODk2MiAxMC4zMTYyIDAuMDAwMTA4OTYyIDIzLjA0MThDMC4wMDAxMDg5NjIgMjMuMDg1OCAtMC4wMDAxMzI3NjIgMjMuMjQ0MiAwLjAwMDExMjQwMyAyMy4yODgxTDQ1Ljk2MzIgMjMuMjk0MVoiIGZpbGw9IiMxQ0IwQTgiLz4KPHBhdGggZD0iTTQ1Ljk2MzQgMEg5MS45MjY3VjUzLjQ3MDdINDUuOTYzNFYwWiIgZmlsbD0iI0RBQjVGRiIvPgo8cGF0aCBkPSJNNDUuOTYzNCAyMy4xOTE4QzQ1Ljk2MzQgMTAuNDIwMyA1Ni4yMzU0IDAgNjguOTA2NyAwQzgxLjU3NzkgMCA5MS45MjY3IDEwLjQyMDMgOTEuOTI2NyAyMy4xOTE4VjMwLjAyOTRINDUuOTYzNFYyMy4xOTE4WiIgZmlsbD0iI0Y2N0Q2RCIvPgo8cGF0aCBkPSJNOTEuOTI2NyAzMC4yNzQ2QzkxLjkyNjcgNDMuMDM3NiA4MS41Nzc5IDUzLjQ3MDcgNjguOTA2NyA1My40NzA3QzU2LjIzNTQgNTMuNDcwNyA0NS45NjM0IDQzLjAzNzYgNDUuOTYzNCAzMC4yNzQ2TDQ1Ljk2MzQgMjMuMjg4MUg5MS45MjY3VjMwLjI3NDZaIiBmaWxsPSIjMDA3MDY5Ii8+Cjwvc3ZnPgo=")
    }

    h3 {
      margin-bottom: 16px;
      font-size: 18px;
    }

    a {
      padding: 6px 32px;
      font-size: 14px;
    }    
  }
`

const germanStyles = css`
  a {
    padding: 8px 20px;
    max-width: 250px;
    font-size: 16px;
  }

  ${breakpointSmallTablet} {
    a {
      font-size: 14px;
    }     
  }  

  ${breakpointTinyTablet} {
    padding-left: 122px;

    a {
      padding: 6px 14px;
      max-width: 225px;
    }     
  }

  ${breakpointSmallHandset} {
    padding-left: 102px;

    a {
      max-width: 210px;
    }       
  } 
`

export const BestOf2022 = ({ locale = 'en' }) => {
  const dispatch = useDispatch()
  const isGerman = locale === 'de' || locale === 'de-DE'

  useEffect(() => {
    dispatch(sendSnowplowEvent('bestof2022.collection.impression'))
  }, [dispatch])  

  const handleClick = () => dispatch(sendSnowplowEvent('bestof2022.collection.click'))

  return (
    <>
      <div className={spacerStyles} />
      <div className={bannerBackground}>
        <div className={cx(bannerStyles, isGerman && germanStyles)}>
          <h3>
            {isGerman
              ? `Das sind die besten Artikel des Jahres`
              : `Don’t miss the best articles of 2022`
            }
          </h3>
          <Link href="/collections/">
            <a onClick={handleClick}>
              {isGerman
                ? `Entdecke das Best of 2022`
                : `See the winners`
              }
            </a>
          </Link>
        </div> 
      </div>   
    </>
  )
}
