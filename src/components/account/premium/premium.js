import { css } from 'linaria'
import { Button } from '@pocket/web-ui'

const premiumStyle = css`
  h2 {
    font-family: var(--fontSansSerif);
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.25;
    color: var(--color-textPrimary);
  }
  .premiumBody {
    img {
      grid-column: span 5;
    }
    .premiumCopy {
      grid-column: span 5;
    }
  }
`

export const Premium = ({ isPremium }) => {
  return (
    <section className={premiumStyle}>
      <h2>Premium</h2>
      <div className="sectionBody premiumBody">
        <img
          src="https://assets.getpocket.com/web/premium/Modules/Hero/Images/tree.deff18f2551b30c90de43c46e8f147fb.svg"
          alt="Pocket Premium"
        />
        <div className="premiumCopy">
          <h3>Your path to ideas, inspiration, and focus.</h3>
          <p>
            It’s a wild internet out there. Pocket Premium gives you a beautiful, ad-free space to
            absorb stories at your own pace—and keep them for however long you’d like.
          </p>
          {isPremium ? (
            <a href="https://getpocket.com/premium/settings">
              <Button variant="brand">Manage Subscription</Button>
            </a>
          ) : (
            <a href="https://getpocket.com/premium">
              <Button variant="brand">Get Pocket Premium</Button>
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
