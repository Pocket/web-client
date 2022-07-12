import { css } from 'linaria'
// import { useTranslation } from 'next-i18next'

const brazeStyle = css`
  padding-bottom: 3rem;
  border-bottom: var(--dividerStyle);
`

export const Braze = ({
  subscribed = false,
  onBrazeToggle
}) => {
  // const { t } = useTranslation()

  return (
    <section className={brazeStyle}>
      <h2 id="braze">Brazeeee placeholder</h2>
      <div className="sectionBody">
        <label htmlFor="brazeSubscription" className="flush">
          Yo, you want Braze?? 😎 👉👉
        </label>
        <input
          type="checkbox"
          name="brazeSubscription"
          id="brazeSubscription"
          className="toggle"
          checked={subscribed}
          onChange={onBrazeToggle}
        />
      </div>
    </section>
  )
}
