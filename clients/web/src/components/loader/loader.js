import { css } from '@emotion/css'

const loaderCentered = css`
  height: calc(100vh - 63px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
`
export const LoaderCentered = ({ children }) => <div className={loaderCentered}>{children}</div>

const loadMore = css`
  height: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
`
export const LoadMore = ({ children }) => <div className={loadMore}>{children}</div>

const loadWrapper = css`
  display: inline-flex;
  justify-content: center;

  svg {
    display: block;
    width: 12px;
    height: 12px;
    margin: 0 3px;
    fill: currentColor;
  }
  .spin {
    display: inline-block;
    animation: bounce 1.6s infinite cubic-bezier(0.44, 0.15, 0.59, 0.89) both;
  }
  .circle {
    svg {
      fill: var(--color-actionBrand);
    }
    animation-delay: -0.84s;
  }
  .triangle {
    svg {
      transform-origin: 7px 9px;
      width: 14px;
      height: 14px;
      fill: var(--color-amber);
      animation: spinTriangle 1.6s infinite ease-in-out forwards;
    }
    animation-delay: -0.42s;
  }
  .square {
    svg {
      margin-bottom: 1px;
      width: 11px;
      height: 11px;
      animation: spinSquare 1.6s infinite ease-in-out forwards;
      fill: #116a65;
    }
  }

  @keyframes bounce {
    0%,
    70%,
    100% {
      transform: translateY(0);
    }
    35% {
      transform: translateY(-20px);
    }
  }

  @keyframes spinTriangle {
    0% {
      transform: rotate(0deg);
    }
    40% {
      transform: rotate(120deg);
    }
    100% {
      transform: rotate(120deg);
    }
  }

  @keyframes spinSquare {
    0% {
      transform: rotate(0deg);
    }
    60% {
      transform: rotate(90deg);
    }
    100% {
      transform: rotate(90deg);
    }
  }
`

export const Loader = () => {
  return (
    <div className={loadWrapper}>
      <div className="spin circle">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 6">
          <circle cx="3" cy="3" r="3" />
        </svg>
      </div>
      <div className="spin triangle">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M24 22H0L12 2z" />
        </svg>
      </div>
      <div className="spin square">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 6">
          <path d="M0 0h6v6H0z" />
        </svg>
      </div>
    </div>
  )
}
