import { css } from '@emotion/css'

const animationWrapper = css`
  position: relative;

  .list-animation {
    max-width: 85px;

    g {
      position: relative;
    }
  }

  #article_1 {
    animation: smallSlideDown 2s infinite alternate ease-in-out;
  }

  @keyframes smallSlideDown {
    0% {
      -webkit-transform: translateY(-30%);
      transform: translateY(-30%);
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
  }

  #article_2 {
    animation: longSlideDown 2s infinite 150ms alternate ease-in-out;
  }

  @keyframes longSlideDown {
    0% {
      -webkit-transform: translateY(-60%);
      transform: translateY(-60%);
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
  }

  .cls-1 {
    fill: #fff;
    fill-rule: evenodd;
  }
  .cls-1,
  .cls-2,
  .cls-3,
  .cls-4,
  .cls-5,
  .cls-6,
  .cls-7 {
    stroke-width: 0px;
  }
  .cls-2 {
    fill: #f3f3f3;
  }
  .cls-3 {
    fill: #1a1a1a;
  }
  .cls-4 {
    fill: #cdcdcd;
  }
  .cls-5 {
    fill: #ef4056;
  }
  .cls-6 {
    fill: #fcb643;
  }
  .cls-7 {
    fill: #ffd777;
  }
`

export const ProcessingAnimation = () => (
  <span className={animationWrapper}>
    <svg className="list-animation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 39.74">
      <g id="article_1">
        <g id="article_2">
          <rect class="cls-2" x=".5" y="28.24" width="35" height="11" rx="1.5" ry="1.5" />
          <path
            class="cls-4"
            d="M34,28.74c.55,0,1,.45,1,1v8c0,.55-.45,1-1,1H2c-.55,0-1-.45-1-1v-8c0-.55.45-1,1-1h32M34,27.74H2C.9,27.74,0,28.64,0,29.74v8C0,38.85.9,39.74,2,39.74h32c1.1,0,2-.9,2-2v-8c0-1.1-.9-2-2-2h0Z"
          />
          <rect class="cls-6" x="3.04" y="30.74" width="6" height="6" rx=".7" ry=".7" />
          <path
            class="cls-3"
            d="M32.12,32.51h-10.3c-.47,0-.85-.38-.85-.85s.38-.85.85-.85h10.3c.47,0,.85.38.85.85s-.38.85-.85.85Z"
          />
          <path
            class="cls-3"
            d="M18.41,32.51h-6.45c-.47,0-.85-.38-.85-.85s.38-.85.85-.85h6.45c.47,0,.85.38.85.85s-.38.85-.85.85Z"
          />
          <path
            class="cls-3"
            d="M25.89,36.7h-13.9c-.47,0-.85-.38-.85-.85s.38-.85.85-.85h13.9c.47,0,.85.38.85.85s-.38.85-.85.85Z"
          />
        </g>
        <rect class="cls-2" x=".5" y="14.39" width="35" height="11" rx="1.5" ry="1.5" />
        <path
          class="cls-4"
          d="M34,14.89c.55,0,1,.45,1,1v8c0,.55-.45,1-1,1H2c-.55,0-1-.45-1-1v-8c0-.55.45-1,1-1h32M34,13.89H2C.9,13.89,0,14.79,0,15.89v8C0,25,.9,25.89,2,25.89h32c1.1,0,2-.9,2-2v-8c0-1.1-.9-2-2-2h0Z"
        />
        <rect class="cls-7" x="3.04" y="16.89" width="6" height="6" rx=".7" ry=".7" />
        <path
          class="cls-3"
          d="M32.12,18.66h-10.3c-.47,0-.85-.38-.85-.85s.38-.85.85-.85h10.3c.47,0,.85.38.85.85s-.38.85-.85.85Z"
        />
        <path
          class="cls-3"
          d="M18.41,18.66h-6.45c-.47,0-.85-.38-.85-.85s.38-.85.85-.85h6.45c.47,0,.85.38.85.85s-.38.85-.85.85Z"
        />
        <path
          class="cls-3"
          d="M25.89,22.85h-13.9c-.47,0-.85-.38-.85-.85s.38-.85.85-.85h13.9c.47,0,.85.38.85.85s-.38.85-.85.85Z"
        />
      </g>

      <g id="pocket_header">
        <rect class="cls-5" y="0" width="36" height="12" rx="2" ry="2" />
        <path
          class="cls-1"
          d="M20.3,5.95l-1.92,1.81c-.1.11-.26.16-.37.16-.14,0-.29-.05-.4-.16l-1.89-1.81c-.2-.21-.23-.56,0-.79.21-.2.56-.23.77,0l1.51,1.45,1.54-1.45c.2-.23.55-.2.74,0,.2.23.2.58,0,.79M21.27,2.96h-6.52c-.42,0-.77.32-.77.75v2.42c0,2.19,1.81,4.01,4.04,4.01s4.01-1.82,4.01-4.01v-2.42c0-.43-.35-.75-.75-.75"
        />
        <path
          class="cls-3"
          d="M1,2c0-.55.45-1,1-1h32c.55,0,1,.45,1,1v1.59c0,.72,1,.68,1,0v-1.59c0-1.1-.9-2-2-2H2C.9,0,0,.9,0,2v1.6C0,4.28,1,4.27,1,3.6v-1.6Z"
        />
      </g>
    </svg>
  </span>
)
