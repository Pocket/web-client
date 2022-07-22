import { useTranslation } from 'next-i18next'
import { css } from 'linaria'
import Layout from 'layouts/main'

const feedbackStyles = css`
  font-family: var(--fontSansSerif);
  margin-bottom: 8rem;

  h1, h4 {
    font-weight: 600;
  }
`

export const Feedback = ({ query }) => {
  const { t } = useTranslation()

  return (
    <Layout title={`Pocket - ${t('feedback:title', 'Feedback')}`}>
      <main className={feedbackStyles}>
        <h1>{t('feedback:thanks', 'Thanks for your feedback!')} 🎉</h1>
        <h4>{t('feedback:collected', 'We have collected your response.')}</h4>
      </main>
    </Layout>
  )
}
